import { useNavigate } from "react-router";
import { SliderMy } from "./Slider";
import { getPercent } from "../destinations";
import { useEffect, useState } from "react";

export default function GirlAmount({ girl, clnTop }) {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const { percent, target, have } = getPercent("girl", girl.totalDonations);

    // אפקט ליצירת אנימציה של שינוי גודל
    useEffect(() => {
      if (target) {
        const interval = setInterval(() => {
          setScale((prev) => (prev === 1 ? 1.2 : 1));
        }, 500);
        return () => clearInterval(interval);
      }
    }, [ target]);
  return (
    <div className="girl-card">
      <div
        className={`girlAmount ${clnTop ? clnTop : ``} apart${
          girl.apartment_id
        }`}
        onClick={() => navigate(`/girl/${girl.user_id}`)}
      >
        <h3>{girl.name}</h3>
        <h4>סכום: ₪{Number(girl.totalDonations).toLocaleString()}</h4>
        <div className="apartment-images">
          {/* תמונות מרובות בצד ימין */}
          <div className="image-list">
            {have.map((path, index) => (
              <img
                key={index}
                src={path}
                alt={`פרס ${index + 1}`}
                className="small-image"
              />
            ))}
          </div>
          {/* תמונה בודדת בצד שמאל */}
          {target && (
            <img
              src={target}
              alt="היעד"
              className="single-image"
              style={{ transform: `scale(${scale})` }}
            />
          )}
        </div>
      </div>{" "}
      <SliderMy percents={percent} apartmentId={girl.apartment_id} />
    </div>
  );
}
