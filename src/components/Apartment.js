import { useEffect } from "react";

export function GirlsApartment() {
  const { apartmentId } = useParams();
  const [apartment, setApartment] = useState({});
  const [girls, setGirls] = useState([]);
  useEffect(() => {
    fetch(`https://localhost:8080/users/?apartmentId=${apartmentId}`)
      .then((response) => response.json())
      .then((data) => {
        setGirls(data);
      })
      .catch((error) => console.log(error));
  });
  useEffect(() => {
    fetch(`https://localhost:8080/apartments/${apartmentId}`)
      .then((response) => response.json())
      .then((data) => {
        setApartment(data);
      })
      .catch((error) => console.log(error));
  });
  return (
    <div>
      <h1>{apartment.name}</h1>
        
    </div>
  );
}
