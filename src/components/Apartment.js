import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GirlAmount from "./GirlAmount";
import { SliderMy } from "./Slider";

export default function Apartment() {
  const { apartmentId } = useParams();
  const [apartment, setApartment] = useState({});
  const [girls, setGirls] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/apartments/${apartmentId}/donations`)
      .then((response) => response.json())
      .then((data) => {
        setGirls(data);
      })
      .catch((error) => console.log(error));
  });
  useEffect(() => {
    fetch(`http://localhost:8080/apartments/${apartmentId}/totalDonations`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        setApartment(data.apartTotalDonations);
      })
      .catch((error) => console.log(error));
  });
  const showGirls = girls.map((girl, index) => (
    <GirlAmount key={index} girl={girl} />
  ));
  return (
    <div>
      <h1>{apartment.apart_name}</h1>
      <h1>סכום כולל: ₪{apartment.totalDonations}</h1>
      {/* <SliderMy /> */}
      {showGirls}
    </div>
  );
}
