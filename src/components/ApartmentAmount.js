import { useNavigate } from "react-router";
import { SliderMy } from "./Slider";
import { getPercent } from "../destinations";
import { useEffect, useState } from "react";

export default function ApartmentAmount({ apartment, clnTop }) {
  const navigate = useNavigate();
  const { percent, target, have } = getPercent(
    "apart",
    apartment.totalDonations
  );
  const [scale, setScale] = useState(1);

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
    <div className={`${clnTop ? clnTop : ``} apartment-card`}>
      <div
        className={`apart${apartment.apartment_id} apartmentAmount`}
        onClick={() => navigate(`/apartment/${apartment.apartment_id}`)}
      >
        <h2>{apartment.apart_name}</h2>
        <h3>סכום: ₪{Number(apartment.totalDonations).toLocaleString()}</h3>
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
      </div>
      <SliderMy percents={percent} apartmentId={apartment.apartment_id} />
    </div>
  );
}
