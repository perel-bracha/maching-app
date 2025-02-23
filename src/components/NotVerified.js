import { useEffect, useState } from "react"
import { OneDonate } from "./Girl";

export function NotVerified(){
    const[nvDonations, setNvDonations]=useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/donations/notVerified")
          .then((response) => response.json())
          .then((data) => setNvDonations(data))
          .catch((error) => console.log(error));
      });
      const showNvDonations = nvDonations.map((donation, index) => (
        <OneDonate key={index} donation={donation} />
      ));
    return(<div className="box">{showNvDonations}</div>)
}