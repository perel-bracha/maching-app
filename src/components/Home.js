import React, { useState, useEffect } from "react";
import Apartment from "./Apartment";
import Amount from "./Amount";
import TopApartments from "./TopApartments";
import TopGirls from "./TopGirls";
import Apartments from "./Apartments";

export default function Home() {
  const componentsArray = [Apartments, Amount, TopApartments, TopGirls]; // Add your components here  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % componentsArray.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [componentsArray.length]);

  const CurrentComponent = componentsArray[currentIndex];

  return (
    <div>
      <CurrentComponent />
    </div>
  );
}
