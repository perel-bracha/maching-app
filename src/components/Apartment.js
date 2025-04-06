import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GirlAmount from "./GirlAmount";
import { SliderMy } from "./Slider";
import { getPercent } from "../destinations";

export default function Apartment() {
  const { apartmentId } = useParams();
  const [apartment, setApartment] = useState({});
  const [girls, setGirls] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/apartments/${apartmentId}/donations`)
      .then((response) => response.json())
      .then((data) => {
        setGirls(data);
      })
      .catch((error) => console.log(error));
  });
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/apartments/${apartmentId}/totalDonations`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        setApartment(data.apartTotalDonations);
      })
      .catch((error) => console.log(error));
  });
  const showGirls = girls.map((girl, index) => (
    <GirlAmount key={index} girl={girl}/>
  ));
  // const target = 8000;
  const {percent} = getPercent("apart", apartment.totalDonations);
  return (
    <div className="apartmentTotal">
      <h1>{apartment.apart_name}</h1>
      <h2>סכום כולל: ₪{Number(apartment.totalDonations).toLocaleString()}</h2>
      <SliderMy percents={percent} apartmentId={apartment.apartment_id}/>
      <div className="box">{showGirls}</div>
    </div>
  );
}
