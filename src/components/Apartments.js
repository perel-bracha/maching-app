import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SliderMy } from "./Slider";
import ApartmentAmount from "./ApartmentAmount";

export default function Apartments() {
  const [adpartmentsDonations, setAdpartmentsDonations] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/apartments/donations")
      .then((response) => response.json())
      .then((data) => setAdpartmentsDonations(data))
      .catch((error) => console.log(error));
  });
  const showApartments = adpartmentsDonations.map((apartment, index) => (
    <ApartmentAmount key={index} apartment={apartment} />
  ));
  return <div className="box">{showApartments}</div>;
}


