import { useEffect } from "react";
import { SliderMy } from "./Slider";

export function Amount() {
  const destination = 200000;
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetch("https://localhost:8080/donations/all")
      .then((response) => response.json())
      .then((data) => {
        setAmount(amount);
      })
      .catch((error) => console.log(error));
  });
  const percentCompletion = Math.floor((amount / destination) * 100);
  return (
    <div>
      <h1 className="pin2">השגנו עד כה: ₪{allAmount} </h1>
      <h1>היעד: ₪80,000</h1>
      <SliderMy percents={percentCompletion} />
    </div>
  );
}
