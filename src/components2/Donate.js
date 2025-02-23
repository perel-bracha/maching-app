import { donate, apartments } from "../db/data";
import { useState, useEffect } from "react";
// import Combobox from "react-widgets/Combobox";
import { ApartDonate } from "./Details";
export default function Donate({ set, setAll, setPerAll }) {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [nameDon, setNameDon] = useState("");
  const [apartment, setApartment] = useState("בחר דירה");
  const [showCircle, setShowCircle] = useState(false);
  const [myDonate, setMyDonate] = useState({});

  const handleDonate = () => {
    if (
      amount != "" &&
      name != "" &&
      nameDon != "" &&
      apartment != "" &&
      apartment != "בחר דירה" &&
      amount > 0
    ) {
      const newDonate = { amount, name, apartment, nameDon };
      let donates = JSON.parse(localStorage.getItem("donates")) || [];
      donates.push(newDonate);
      localStorage.setItem("donates", JSON.stringify(donates));
      setAmount("");
      setName("");
      setApartment("בחר דירה");
      setNameDon("");
      // const listApartments = apartments.map((apart, index) => (
      //   <ApartDonate
      //     key={index}
      //     apart={apart}
      //     // setState={setStateApartments}
      //     // setThis={setThisApart}
      //   />
      // ));
      // set(listApartments);
      let amount1 = 0;
      donates.forEach((d) => {
        amount1 += parseInt(d.amount);
      });
      setAll(amount1);
      setPerAll(Math.floor((amount1 / 80000) * 100));
      setMyDonate({ amount, name, apartment, nameDon }); // שליחת הערכים לקומפוננטה CircleComponent
      setShowCircle(true);

      setTimeout(() => {
        setShowCircle(false);
      }, 4000);
    }
  };

  return (
    <>
      <div className="DonateBox">
        <h3>הוספת תרומה</h3>
        <input
          id="amount"
          type="number"
          placeholder="סכום התרומה"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          id="name"
          type="text"
          placeholder="שם המתרימה"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="nameDon"
          type="text"
          placeholder="שם התורם"
          value={nameDon}
          onChange={(e) => setNameDon(e.target.value)}
        />
        {/* <Combobox
          id="apartment"
          data={apartments}
          placeholder="בחר דירה"
          value={apartment}
          filter="contains" // סגירת רשימת הפריטים לאחר בחירת פריט
          open={false}
          onChange={(value) => setApartment(value)}
          messages={{ open: "", filterPlaceholder: "", placeholder: "" }}
        /> */}
        <div>
          <div style={{}}>
            <input
              type="text"
              placeholder={apartment}
              value={apartment}
              readOnly
            />

            <ul>
              {apartments.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setApartment(item)}
                  style={{ color: apartment === item ? "#ee83ac" : "#000" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <input type="button" value="עדכון תרומה" onClick={handleDonate} />
      </div>{" "}
      {showCircle && <CircleComponent myDonate={myDonate} />}
      
    </>
  );
}

const CircleComponent = ({ myDonate }) => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className="circle">
      <p>{myDonate.name}</p>
      <p>₪{myDonate.amount}</p>
    </div>
  ) : null;
};
