import { useEffect, useState } from "react";
import GirlAmount from "./GirlAmount";

export default function TopGirls() {
  const [topGirls, setTopGirls] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/users/top/${3}`)
      .then((response) => response.json())
      .then((data) => {
        setTopGirls(data);
      })
      .catch((error) => console.log(error));
  });

  const tg = topGirls.map(
    (topGirl, index) =>
      index !== 0 && (
        <GirlAmount key={index} girl={topGirl} clnTop={`top${index}`} />
      )
  );
  const firstTg = topGirls.map(
    (topGirl, index) =>
      index === 0 && (
        <GirlAmount key={index} girl={topGirl} clnTop={`top${index}`} />
      )
  );

  return (
    <>
      <h1>הבנות המובילות</h1>
      <div className="boxTop">
        {firstTg}
        <div className="boxTop2">{tg}</div>
      </div>
    </>
  );
}
