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
    // <div key={index}>
    //   {/* <h1>{index + 1}</h1> */}
    //   <h1>{topGirl.name}</h1>
    //   <h1>{topGirl.totalDonations}</h1>
    // </div>
    <GirlAmount key={index} girl={topGirl} />
  ));

  return (
    <>
      <h1>הבנות המובילות</h1>
      {tg}
    </>
  );
}
