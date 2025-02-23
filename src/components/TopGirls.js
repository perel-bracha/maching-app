import { useEffect, useState } from "react";
import GirlAmount from "./GirlAmount";

export default function TopGirls() {
  const [topGirls, setTopGirls] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/users/top/${5}`)
      .then((response) => response.json())
      .then((data) => {
        setTopGirls(data);
      })
      .catch((error) => console.log(error));
  });

  const tg = topGirls.map((topGirl, index) => (
    <GirlAmount key={index} girl={topGirl} cln={`top${index}`}/>
  ));

  return (
    <>
      <h1>הבנות המובילות</h1>
      {tg}
    </>
  );
}
