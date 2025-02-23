import { useNavigate } from "react-router";
import { SliderMy } from "./Slider";

export default function ApartmentAmount({ apartment, cln }) {
    const navigate = useNavigate();
    const target = 8000;
    const percentCompletion = Math.floor((apartment.totalDonations / target) * 100);
    return (
      <div className={`apartmentAmount ${cln? cln:``}`} onClick={() => navigate(`/apartment/${apartment.apartment_id}`)}>
        <h3>{apartment.apart_name}</h3>
        <h4>סכום: ₪{apartment.totalDonations}</h4>
        <SliderMy percents={percentCompletion} />
      </div>
    );
  }