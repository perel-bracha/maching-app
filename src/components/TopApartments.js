import { useEffect, useState } from "react";
import ApartmentAmount from "./ApartmentAmount";

export default function TopApartments() {
  const [topApartments, setTopApartments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/apartments/top/${5}`)
      .then((response) => response.json())
      .then((data) => {
        setTopApartments(data);
      })
      .catch((error) => console.log(error));
  });

  const showTopApartments = topApartments.map((topApartment, index) => (
    <ApartmentAmount key={index} apartment={topApartment} />
  ));

  return (
    <>
      <h1>הדירות המובילות</h1>
      {showTopApartments}
    </>
  );
}
