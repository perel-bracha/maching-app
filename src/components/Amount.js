import { useEffect, useState } from "react";
import { SliderMy } from "./Slider";
import { getPercent } from "../destinations";

export default function Amount() {
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/donations/amount`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].amount);

        setAmount(data[0].amount);
      })
      .catch((error) => console.log(error));
  });
  return (
    <div className="totalAmount">
      <h1 className="pin2">:השגנו עד כה</h1>
      <h1>₪{Number(amount).toLocaleString()}</h1>
      <h2>היעד: ₪200,000</h2>
      <SliderMy percents={getPercent("total", amount).percent} />
    </div>
  );
}
