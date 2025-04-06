import { useEffect, useState } from "react"
import { OneDonate } from "./Girl";

export function NotVerified(){
    const[nvDonations, setNvDonations]=useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/donations/notVerified`)
          .then((response) => response.json())
          .then((data) => setNvDonations(data))
          .catch((error) => console.log(error));
      },[]);
      const showNvDonations = nvDonations.map((donation, index) => (
        <OneDonate key={index} donation={donation} apartmentId={donation.apartment_id}/>
      ));
    return(<><h2>תרומות לא מאושרות</h2><div className="box">{showNvDonations}</div></>)
}