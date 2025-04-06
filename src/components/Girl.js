import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Girl() {
  const { girlId } = useParams();
  const [girl, setGirl] = useState({});
  const [amount, setAmount] = useState(0);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/donations/?userId=${girlId}`)
      .then((response) => response.json())
      .then((data) => {
        setDonations(data);
      })
      .catch((error) => console.log(error));
  });
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/users/${girlId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setGirl(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/users/${girlId}/amount`)
      .then((response) => response.json())
      .then((data) => {
        setAmount(data.amount);
      })
      .catch((error) => console.log(error));
  });
  const showDonations = donations.map((donation, index) => (
    <OneDonate key={index} donation={donation} setAmount={setAmount} apartmentId={girl.apartment_id}/>
  ));
  return (
    <>
      <h1>{girl.name}</h1>
      <h2>סכום כולל: ₪{amount}</h2>
      <div className="box">{showDonations}</div>
    </>
  );
}

export function OneDonate({ donation, apartmentId }) {
  const navigate = useNavigate();
  return (
    <div className="oneDonate">
      <div className={`donateButtons`}>
        <input
          type="button"
          value="x"
          className={`x apart${apartmentId ? apartmentId : ``}`}
          title="מחק"
          onClick={() => {
            //   fetch("http://localhost:8080/donations/amount")
            //     .then((response) => response.json())
            //     .then((data) => {setAmount(data.amount);})
            //     .catch((error) => console.log(error));
            fetch(`${process.env.REACT_APP_URL}/donations/${donation.id}`, {
              method: "DELETE",
            });
          }}
        />
        <input
          type="button"
          className={`edit apart${apartmentId ? apartmentId : ``}`}
          title="ערוך"
          onClick={() => navigate(`/donate/${donation.id}`)}
        ></input>
      </div>
      <h3>{donation.donor_name}</h3>
      <h4>סכום: ₪{Number(donation.amount).toLocaleString()}</h4>
    </div>
  );
}
