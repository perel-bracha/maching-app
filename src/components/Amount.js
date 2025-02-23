import { useEffect, useState } from "react";
import { SliderMy } from "./Slider";

export default function Amount() {
  const destination = 200000;
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetch("http://localhost:8080/donations/amount")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].amount);
        
        setAmount(data[0].amount);
      })
      .catch((error) => console.log(error));
  });
  const percentCompletion = Math.floor((amount / destination) * 100);
  return (
    <div className="totalAmount">
      <h2 className="pin2">השגנו עד כה: ₪{amount} </h2>
      <h3>היעד: ₪80,000</h3>
      <SliderMy percents={percentCompletion} />
    </div>
  );
}
