import { useNavigate } from "react-router";
import { SliderMy } from "./Slider";

export default function GirlAmount({ girl, cln }) {
  const navigate = useNavigate();
  return (
    <div
      className={`girlAmount ${cln ? cln : ``}`}
      onClick={() => navigate(`/girl/${girl.user_id}`)}
    >
      <h3>{girl.name}</h3>
      <h4>סכום: ₪{girl.totalDonations}</h4>
    </div>
  );
}
