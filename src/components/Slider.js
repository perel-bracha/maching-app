import React, { useState, useEffect } from "react";

export function SliderMy({ percents }) {
  const [displayedPercents, setDisplayedPercents] = useState(0);

  useEffect(() => {
    let start = 0;
    // const duration = 2000; // duration of the animation in milliseconds
    const increment = 1; // increment by 1 percent each frame
    let timeoutId;

    const animate = () => {
      start += increment;
      if (start < percents) {
        setDisplayedPercents(Math.round(start));
        timeoutId = setTimeout(animate, 1000 / 60);
      } else {
        setDisplayedPercents(percents);
      }
    };

    animate();
    return () => clearTimeout(timeoutId);
  }, [percents]);

  const paragraphStyle = {
    width: displayedPercents + "%",
    transition: "width 2s linear",
  };

  return (
    <div className="slide">
      <p className="first" style={paragraphStyle}>
        <span>{displayedPercents + "%"}</span>
      </p>
    </div>
  );
}

// export function SliderMy({ percents }) {
//   const paragraphStyle = {
//     width: percents + "%",
//   };
//   return (
//     <div className="slide">
//       <p className="first" style={paragraphStyle}>
//         {" "}
//         <span>{percents + "%"}</span>
//       </p>
//       {/* <p className="second">
//         <span>{percents + "%"}</span>
//       </p> */}
//     </div>
//   );
// }
