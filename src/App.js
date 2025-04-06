import "./App.css";
import Home from "./components/Home";
import Apartments from "./components/Apartments";
import Apartment from "./components/Apartment";
import Girl from "./components/Girl";
import { Donate } from "./components/Donate";
import { NotVerified } from "./components/NotVerified";
import Hellow from "./components/Hellow";
import TopApartments from "./components/TopApartments";
import TopGirls from "./components/TopGirls";
import Amount from "./components/Amount";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import DonationAnimation from "./components/DonationAnimation";
import { Route, Routes, useNavigate } from "react-router";

const socket = io(`${process.env.REACT_APP_URL}`, {
  transports: ["websocket"], // מבטיח שימוש ב-WebSocket בלבד
});

function App() {
  const [donations, setDonations] = useState([]);
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    // הודעה כאשר הלקוח מחובר בהצלחה
    socket.on("connect", () => {
      console.log("התחברנו לשרת WebSocket");
    });

    // הודעה על אירוע חדש של תרומה
    socket.on("newDonation", (donation) => {
      console.log("התקבלו תרומות:", donation);

      setDonations((prev) => [
        ...prev,
        ...(Array.isArray(donation) ? donation : [donation]),
      ]);
    });

    socket.on("achievment", () => {
      console.log("הגענו ליעד");
      setShowGif(true);

      // הסתרת ה-GIF אחרי 5 שניות
      setTimeout(() => {
        setShowGif(false);
      }, 60000);
    });

    return () => {
      socket.off("achievment");
    };

    // טיפולים במקרים של שגיאות חיבור
    socket.on("connect_error", (error) => {
      console.error("שגיאה בחיבור לשרת WebSocket:", error);
    });

    // התנתקות מהשרת כאשר הקומפוננטה מתפרקת
    // return () => {
    //   socket.disconnect(); // התנתקות מהשרת
    // };
    return () => socket.off("newDonation");
  }, []);
  const removeDonation = (id) => {
    setDonations((prev) => prev.filter((donation) => donation.id !== id));
  };
  const navigate = useNavigate();
  return (
    <>
      {showGif && (
        <div className="achievement-overlay">
          <img
            src={'/dest.gif'}
            alt="Achievement Unlocked"
            className="achievement-gif"
          />
        </div>
      )}
      <DonationAnimation
        donations={donations}
        removeDonation={removeDonation}
      />
      <button className="homeButton" onClick={() => navigate(`/`)}>
        🏠
      </button>

      <Routes>
        <Route path="/" element={<Hellow />} />
        <Route path="/home" element={<Home />} />
        <Route path="/topApartments" element={<TopApartments />} />
        <Route path="/topGirls" element={<TopGirls />} />
        <Route path="/amount" element={<Amount />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartment/:apartmentId" element={<Apartment />} />
        <Route path="/girl/:girlId" element={<Girl />} />
        <Route path="/donate" element={<Donate />}>
          <Route path=":donateId" />
        </Route>
        <Route path="/donations/notVerified" element={<NotVerified />} />
      </Routes>
      {/* <Routes>
        <Route path="/" element={<Apartments />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartment/:apartmentId" element={<Apartment />} />
        <Route path="/girl/:girlId" element={<Girl />} />{" "}
      </Routes> */}
    </>
  );
}

export default App;
