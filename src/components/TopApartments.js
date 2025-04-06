import { useEffect, useState } from "react";
import ApartmentAmount from "./ApartmentAmount";

export default function TopApartments() {
  const [topApartments, setTopApartments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/apartments/top/${3}`)
      .then((response) => response.json())
      .then((data) => {
        setTopApartments(data);
      })
      .catch((error) => console.log(error));
  });
console.log(topApartments);


const showFirstApartments = topApartments.map(
  (topApartment, index) =>
    index === 0 && (
      <ApartmentAmount
        key={index}
        apartment={topApartment}
        clnTop={`top${index}`}
      />
    )
);
  const showTopApartments = topApartments.map(
    (topApartment, index) =>
      index !== 0 && (
        <ApartmentAmount
          key={index}
          apartment={topApartment}
          clnTop={`top${index}`}
        />
      )
  );

  return (
    <>
      <h1>הדירות המובילות</h1>
      <div className="boxTop">
        {showFirstApartments}
        <div className="boxTop2">{showTopApartments}</div>
      </div>
    </>
  );
}
