import { use, useEffect } from "react";
import { Navigate } from "react-router";
import { SliderMy } from "./Slider";

export function Apartments() {
  const [adpartmentsDonations, setAdpartmentsDonations] = useState([]);
  useEffect(() => {
    fetch("https://localhost:8080/apartments/donations")
      .then((response) => response.json())
      .then((data) => setAdpartmentsDonations(data))
      .catch((error) => console.log(error));
  });
  const showApartments = adpartmentsDonations.map((apartment, index) => (
    <ApartmentAmount key={index} apartment={apartment} />
  ));
  return <div>{showApartments}</div>;
}

export function ApartmentAmount({ apartment }) {
  const target = 8000;
  const percentCompletion = Math.floor((apartment.totalDonations / target) * 100);
  return (
    <div onClick={()=>Navigate(`${apartment.id}`)}>
      <h3>{apartment.name}</h3>
      <h4>סכום: ₪{apartment.amount}</h4>
      <SliderMy percents={percentCompletion} />
    </div>
  );
}


