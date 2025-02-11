import { use, useEffect } from "react";
import { useState } from "react";

export function Donate() {
  const [apartments, setApartments] = useState([]);
  const [girls, setGirls] = useState([]);
  const [apartment, setApartment] = useState({});
  const [girl, setGirl] = useState({});
  const [donate, setDonate] = useState({
    user_id: null,
    donor_name: "",
    amount: 0.0,
    donation_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    remark: "",
    verified: false,
  });

  const handleAddDonation = () => {};

  const handleApartmentChange = (e) => {
    const value = e.target.value;
    setDonate({ ...donate, apartment: value });
    setFilteredApartments(
      apartments.filter((apartment) =>
        apartment.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleGirlChange = (e) => {
    const value = e.target.value;
    se;
  };

  useEffect(() => {
    fetch("https://localhost:8080/apartments")
      .then((response) => response.json())
      .then((data) => setApartments(data))
      .catch((error) => console.log(error));
  });
  useEffect(() => {
    const query =
      `https://localhost:8080/apartments` + apartment.id
        ? `/${apartment.id}`
        : ``;
    fetch(query)
      .then((response) => response.json())
      .then((data) => setGirls(data))
      .catch((error) => console.log(error));
  }, [apartment]);
  return (
    <form onSubmit={handleAddDonation}>
      <h3>הוספת תרומה</h3>
      <input
        id="amount"
        type="number"
        placeholder="סכום התרומה"
        value={donate.amount}
        onChange={(e) => setDonate({ ...donate, amount: e.target.value })}
      />
      <input
        id="name"
        type="text"
        placeholder="שם התורם"
        value={donate.donor_name}
        onChange={(e) => setDonate({ ...donate, donor_name: e.target.value })}
      />
      <input
        id="apartment"
        type="text"
        placeholder="דירה"
        value={donate.apartment}
        onChange={handleApartmentChange}
        onFocus={() => setFilteredApartments(apartments)}
      />
      {filteredApartments.length > 0 && (
        <ul>
          {filteredApartments.map((apartment, index) => (
            <li key={index} onClick={() => setApartment(apartment)}>
              {apartment}
            </li>
          ))}
        </ul>
      )}
      <input
        id="girl"
        type="text"
        placeholder="מתרימה"
        value={girl.name}
        onChange={handleGirlChange}
      />
      {filteredGirls.length > 0 && <ul>{filteredGirls.map((girl, index)=>{
        <li key={index} onClick={() => setDonate({ })}></li>
      })}</ul>}
    </form>
  );
}

