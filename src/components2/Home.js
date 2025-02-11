import React, { useState, useEffect } from "react";
import { AllDonates, AllGirls, ApartDonate, GirlDonate } from "./Details";
import { apartments } from "../db/data";
import "./style.css";
import Donate from "./Donate";
import { mysave } from "./save";
function calcAmount(apart) {
  let donates = JSON.parse(localStorage.getItem("donates")) || [];
  let amount = 0;
  donates.forEach((d) => {
    //   console.log(d.amount);
    if (d.apartment == apart) amount += parseInt(d.amount);
  });
  console.log(amount);
  return amount;
}

export default function Home({ a }) {
  const [showComponentA, setShowComponentA] = useState(true);
  const [showComponentB, setShowComponentB] = useState(false);
  const [allAmount, setAllAmount] = useState(0);
  const [percentCompletionAll, setPercentCompletionAll] = useState(0);
  const [stateApartments, setStateApartments] = useState(true);
  const [stateGirls, setStateGirls] = useState(true);
  const [thisApart, setThisApart] = useState();
  const [thisGirl, setThisGirl] = useState();

  const listApartments = apartments.map((apart, index) => (
    <ApartDonate
      key={index}
      apart={apart}
      setState={setStateApartments}
      setThis={setThisApart}
    />
  ));
  const [listApartmentsState, setListApartmentsState] =
    useState(listApartments);

  useEffect(() => {
    let donates = JSON.parse(localStorage.getItem("donates")) || [];
    let amount = 0;
    donates.forEach((d) => {
      amount += parseInt(d.amount);
    });
    setAllAmount(amount);
    // console.log(amount);
    // console.log(allAmount);
    setPercentCompletionAll(Math.floor((amount / 80000) * 100));
  }, [a]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (stateApartments) {
  //       setShowComponentA(!showComponentA);
  //       if (showComponentA) setShowComponentB(!showComponentB);
  //     } else setShowComponentA(true);
  //   }, 9000);

  //   return () => clearInterval(interval);
  // }, [showComponentA]);

  return (
    <>
      {/* <div style={{position:"sticky", top: 0, display:"flex", alignItems: "center"}}>
      <img src={require("../components/myLogo.jpg")} alt="my logo" />
  </div> */}
      {/* <img src={require("../components/confety.gif")} className="fullscreen-gif" alt="Fullscreen GIF" /> */}

      <div className="dir">
        <div className="con">
          {showComponentA || showComponentB? (
            <div>
              <h1 className="pin2">השגנו עד כה: ₪{allAmount} </h1>
              <h1>היעד: ₪80,000</h1>
              <SliderMy percents={percentCompletionAll} />
            </div>
          ) : null}
          <div className="hei">
            {showComponentA ? (
              <>
                {stateApartments ? (
                  <div className="allapart">{listApartmentsState}</div>
                ) : (
                  <>
                    {stateGirls ? (
                      <AllGirls
                        apart={thisApart}
                        setState={setStateGirls}
                        setThis={setThisGirl}
                      />
                    ) : (
                      <AllDonates
                        apart={thisApart}
                        girl={thisGirl}
                        setAmount={setAllAmount}
                        setPer={setPercentCompletionAll}
                      />
                    )}
                  </>
                )}
              </>
            ) : showComponentB ? (
              <TopApartments
                setStateApartments={setStateApartments}
                setThisApart={setThisApart}
              />
              // <TopGirls />

            ) : (
              <div className="big">
                <h1 className="pin">השגנו עד כה: ₪{allAmount} </h1>
                <SliderMy percents={percentCompletionAll} />
                <h1 className="small">היעד: ₪80,000</h1>
              </div>

            )}
            {/* <TopGirls/> */}
          </div>
        </div>
        <Donate
          set={setListApartmentsState}
          setAll={setAllAmount}
          setPerAll={setPercentCompletionAll}
        />
      </div>
      {/* <input type="button" value="העתק נתונים" onClick={mysave} /> */}
    </>
  );
}

function TopApartments({ setStateApartments, setThisApart }) {
  let myAp = JSON.parse(JSON.stringify(apartments));
  myAp.sort((a, b) =>
    calcAmount(a) < calcAmount(b) ? 1 : calcAmount(a) > calcAmount(b) ? -1 : 0
  );

  return (
    <div>
      <div className="topAll">
        <h1>הדירות המובילות</h1>

        <div className="top">
          <ApartDonate
            apart={myAp[0]}
            num={"firstapartdonate"}
            setState={setStateApartments}
            setThis={setThisApart}
          />
          <p>מקום ראשון</p>
        </div>
        <div className="topApart">
          <div className="top">
            <ApartDonate
              apart={myAp[1]}
              setState={setStateApartments}
              setThis={setThisApart}
            />
            <p>מקום שני</p>
          </div>
          <div className="top">
            <ApartDonate
              apart={myAp[2]}
              setState={setStateApartments}
              setThis={setThisApart}
            />
            <p>מקום שלישי</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SliderMy({ percents }) {
  const paragraphStyle = {
    width: percents + "%",
  };
  return (
    <div className="slide">
      <p className="first" style={paragraphStyle}>
        {" "}
        <span>{percents + "%"}</span>
      </p>
      {/* <p className="second">
        <span>{percents + "%"}</span>
      </p> */}
    </div>
  );
}

function TopGirls({ setStateApartments, setThisApart }) {
  let donates = JSON.parse(localStorage.getItem("donates")) || [];
  let girls = [];
  donates.forEach((donate, index) => {
    if (girls.find((g) => g.name == donate.name))
      girls[girls.findIndex((g) => g.name == donate.name)].amount += parseInt(
        donate.amount
      );
    else
      girls.push({
        name: donate.name,
        amount: parseInt(donate.amount),
        apart: donate.apart,
      });
  });
  console.log(girls);
  // girls = JSON.parse(JSON.stringify(girls));
  girls.sort((a, b) =>
    a.amount < b.amount ? 1 : a.amount > b.amount ? -1 : 0
  );
  console.log(girls);

  return (
    <div>
      <div className="topAll">
        <h1>הבנות המובילות</h1>

        <div className="top">
          <GirlDonate
            name={girls[0].name}
            apart={girls[0].apart}
            // num={"firstapartdonate"}
            // setState={setStateApartments}
            // setThis={setThisApart}
            amount={girls[0].amount}
          />
          <p>מקום ראשון</p>
        </div>
        <div className="topApart">
          <div className="top">
            <GirlDonate
              name={girls[1].name}
              apart={girls[1].apart}
              amount={girls[1].amount}
              // setState={setStateApartments}
              // setThis={setThisApart}
            />
            <p>מקום שני</p>
          </div>
          <div className="top">
            <GirlDonate
              name={girls[2].name}
              apart={girls[2].apart}
              amount={girls[2].amount}
              // setState={setStateApartments}
              // setThis={setThisApart}
            />
            <p>מקום שלישי</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// export function FirstApartDonate({ apart, num }) {
//   const [apartAmount, setApartAmount] = useState(0);
//   const [percentCompletion, setPercentCompletion] = useState(0);

//   useEffect(() => {
//     let donates = JSON.parse(localStorage.getItem("donates")) || [];
//     let amount = 0;
//     donates.forEach((d) => {
//       //   console.log(d.amount);
//       if (d.apartment == apart) amount += parseInt(d.amount);
//     });
//     setApartAmount(amount);
//     setPercentCompletion(Math.floor((amount / 4000) * 100));
//   }, [apart]);

//   return (
//     <div className={"apartDonate " + num}>
//       <h3>{apart}</h3>
//       <h4>סכום: ₪{apartAmount}</h4>
//       <SliderMy percents={percentCompletion} />
//     </div>
//   );
// }
