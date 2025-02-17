import { useNavigate } from "react-router";
import { SliderMy } from "./Slider";

export default function GirlAmount({girl}){
    const navigate = useNavigate();
    return (
      <div onClick={() => navigate(`/girl/${girl.user_id}`)}>
        <h3>{girl.name}</h3>
        <h4>סכום: ₪{girl.totalDonations}</h4>
      </div>
    );
}
