import React, { useState, useEffect, useCallback } from "react";

export default function DonationAnimation({ donations, removeDonation }) {
  const [queue, setQueue] = useState([]); // תור התרומות שמחכות
  const [activeDonations, setActiveDonations] = useState([]); // תרומות שמוצגות כרגע
  const [animating, setAnimating] = useState(false); // משתנה לניהול סדר האנימציות
  const isPositionTaken = useCallback(
    (left, top) => {
      return activeDonations.some(
        (d) =>
          Math.abs(parseFloat(d.left) - parseFloat(left)) < 10 &&
          Math.abs(parseFloat(d.top) - parseFloat(top)) < 10
      );
    },
    [activeDonations] // תלוי רק ב-activeDonations
  );

  useEffect(() => {
    if (donations.length > 0) {
      setQueue((prevQueue) => [...prevQueue, ...donations]); // מוסיף תרומות לתור
      donations.forEach((d) => {
        removeDonation(d.id);
      });
    }
  }, [donations, removeDonation]); // מאזין לשינויים במערך התרומות שהתקבלו מהאב

  useEffect(() => {
    const addDonation = () => {
      if (queue.length > 0) {
        const newDonation = queue[0]; // לוקח את הראשונה בתור
        setQueue((prevQueue) => prevQueue.slice(1)); // מסיר אותה מהתור

        const newId = Math.random().toString(36).substr(2, 9); // מזהה ייחודי
        const { left, top } = getRandomPosition();

        // לוודא שאין חפיפות עם מיקומים קיימים
        if (isPositionTaken(left, top)) {
          return; // אם המיקום תפוס, מפסיקים את הוספת התרומה
        }

        setActiveDonations((prev) => [
          ...prev,
          {
            ...newDonation,
            id: newId,
            left,
            top,
            size: getSize(newDonation.amount),
            apartment_id: newDonation.apartment_id,
          },
        ]);

        setTimeout(() => {
          setActiveDonations((prev) => prev.filter((d) => d.id !== newId)); // מוחק אחרי 4 שניות
        }, 4000);
      }
    };

    // אם אין אנימציה רצה, התחל אנימציה חדשה אחרי עיכוב של 500 מילישניות
    if (!animating && queue.length > 0) {
      setAnimating(true);
      addDonation();
      setTimeout(() => setAnimating(false), 500); // עיכוב של 500 מילישניות לפני התחלת האנימציה הבאה
    }
  }, [queue, activeDonations, animating, isPositionTaken]); // מאזין לשינויים בתור או בתרומות הפעילות

  // פונקציה לוודא שאין חפיפות במיקומים

  return (
    <>
      {activeDonations.map((donation) => (
        <div
          key={donation.id}
          className={`donation-animation apart${donation.apartment_id}`}
          style={{
            fontSize: donation.size, // שינוי גודל לפי סכום התרומה
            left: donation.left,
            "--final-top": donation.top, // משתנה CSS לשליטה בגובה הסופי
          }}
        >
          {donation.name}
          <br />
          {Number(donation.amount).toLocaleString()} ₪
        </div>
      ))}
    </>
  );
}

// פונקציה לקבלת מיקום רנדומלי על המסך
const getRandomPosition = () => {
  const top = `${Math.random() * 80 + 10}%`; // בין 10% ל-70% מגובה המסך
  const left = `${Math.random() * 80 + 10}%`; // בין 20% ל-80% מרוחב המסך
  return { top, left };
};

const getSize = (amount) => `${Math.min(16 + amount / 10, 50)}px`; // גודל מקסימלי 50px
