import { useState, useEffect } from "react";
import ApartmentAmount from "./ApartmentAmount";
import '../App.css';  



export default function Apartments() {
  const [apartmentsDonations, setApartmentsDonations] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/apartments/donations`)
      .then((response) => response.json())
      .then((data) => setApartmentsDonations(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="apartments-container">
      {apartmentsDonations.map((apartment, index) => (
        
            <ApartmentAmount key={index} apartment={apartment} />
          
      ))}
    </div>
  );
}
