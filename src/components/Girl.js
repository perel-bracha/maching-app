import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Girl() {
  const { girlId } = useParams();
  const [girl, setGirl] = useState({});
  const [amount, setAmount] = useState(0);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/donations/?userId=${girlId}`)
      .then((response) => response.json())
      .then((data) => {
        setDonations(data);
      })
      .catch((error) => console.log(error));
  });
  useEffect(() => {
    fetch(`http://localhost:8080/users/${girlId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setGirl(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8080/users/${girlId}/amount`)
      .then((response) => response.json())
      .then((data) => {
        setAmount(data.amount);
      })
      .catch((error) => console.log(error));
  });
  const showDonations = donations.map((donation, index) => (
    <OneDonate key={index} donation={donation} setAmount={setAmount} />
  ));
  return (
    <div>
      <h1>{girl.name}</h1>
      <h1>סכום כולל: ₪{amount}</h1>
      {showDonations}
    </div>
  );
}

function OneDonate({ donation, setAmount }) {
  const navigate=useNavigate();
  return (
    <div>
      <h3>{donation.donor_name}</h3>
      <h4>{donation.amount}</h4>
      <input
        type="button"
        value="x"
        className="x"
        title="מחק"
        onClick={() => {
          //   fetch("http://localhost:8080/donations/amount")
          //     .then((response) => response.json())
          //     .then((data) => {setAmount(data.amount);})
          //     .catch((error) => console.log(error));
          fetch(`http://localhost:8080/donations/${donation.id}`, {
            method: "DELETE",
          });
        }}
      />
      <input type="button" className="edit" title="ערוך" onClick={()=>navigate(`/donate/${donation.id}`)}>
      
      </input>
    </div>
  );
}
