import { donate, apartments } from "../db/data";
import { useState, useEffect } from "react";
// import Combobox from "react-widgets/Combobox";
import { SliderMy } from "./Home";
export function GirlDonate({ apart, name, amount, setState, setThis }) {
  const [girlAmount, setGirlAmount] = useState(0);
  // const [percentCompletion, setPercentCompletion] = useState(0);

  useEffect(() => {
    let donates = JSON.parse(localStorage.getItem("donates")) || [];
    let amount = 0;
    donates.forEach((d) => {
      //   console.log(d.amount);
      if (d.apartment == apart && d.name == name) amount += parseInt(d.amount);
    });
    setGirlAmount(amount);
    //   setPercentCompletion(Math.floor((amount / 4000) * 100));
  }, [name]);
  // setGirlAmount(amount)
  console.log(girlAmount);
  return (
    <div
      className="apartDonate"
      onClick={() => {
        setState(false);
        setThis(name);
      }}
    >
      <h3>{name}</h3>
      <h4>סכום: ₪{girlAmount}</h4>
      {/* <SliderMy percents={percentCompletion} /> */}
    </div>
  );
}

export function ApartDonate({ apart, setState, setThis, num }) {
  const [apartAmount, setApartAmount] = useState(0);
  const [percentCompletion, setPercentCompletion] = useState(0);

  useEffect(() => {
    let donates = JSON.parse(localStorage.getItem("donates")) || [];
    let amount = 0;
    donates.forEach((d) => {
      //   console.log(d.amount);
      if (d.apartment == apart) amount += parseInt(d.amount);
    });
    setApartAmount(amount);
    setPercentCompletion(Math.floor((amount / 4000) * 100));
  }, [apart]);

  return (
    <div
      className={"apartDonate " + num}
      onClick={() => {
        setState(false);
        setThis(apart);
      }}
    >
      <h3>{apart}</h3>
      <h4>סכום: ₪{apartAmount}</h4>
      <SliderMy percents={percentCompletion} />
    </div>
  );
}

export function AllGirls({ apart, setState, setThis }) {
  let donates = JSON.parse(localStorage.getItem("donates")) || [];
  let girls = [];
  console.log(apart);
  donates.forEach((donate, index) => {
    if (donate.apartment == apart)
      if (girls.find((g) => g.name == donate.name))
        girls[girls.findIndex((g) => g.name == donate.name)].amount +=
          donate.amount;
      else girls.push({ name: donate.name, amount: donate.amount });
  });
  // const [listApartmentsState, setListApartmentsState] =
  //   useState(listApartments);
  const listGirls = girls.map((g, index) => (
    <GirlDonate
      key={index}
      apart={apart}
      name={g.name}
      setState={setState}
      setThis={setThis}
    />
  ));

  return (
    <>
      <h1>{apart}</h1>
      <div className="allapart">{listGirls}</div>
    </>
  );
}

export function OneDonate({ donateObj, setDonates, setAmount, setPer }) {
  return (
    <div className="apartDonate">
      <h3>{donateObj.nameDon}</h3>
      <h4>סכום: ₪{donateObj.amount}</h4>
      <input
        type="button"
        value="x"
        className="x"
        onClick={() => {
          let donates = JSON.parse(localStorage.getItem("donates")) || [];
          donates.splice(
            donates.findIndex(
              (d) =>
                d.amount == donateObj.amount &&
                d.name == donateObj.name &&
                d.nameDon == donateObj.nameDon &&
                d.apartment == donateObj.apartment
            ),
            1
          );
          localStorage.setItem("donates", JSON.stringify(donates));
          setDonates(JSON.parse(localStorage.getItem("donates")) || []);
          let amount = 0;
          donates.forEach((d) => {
            amount += parseInt(d.amount);
          });
          setAmount(amount);
          setPer(Math.floor((amount / 80000) * 100));
        }}
      />
    </div>
  );
}

export function AllDonates({ apart, girl, setAmount, setPer }) {
  // let donates = JSON.parse(localStorage.getItem("donates")) || [];
  const [donates, setDonates] = useState(
    JSON.parse(localStorage.getItem("donates")) || []
  );
  console.log(apart, girl);
  const ListDonates = donates
    .filter((don) => don.apartment == apart && don.name == girl)
    .map((d, index) => (
      <OneDonate
        key={index}
        donateObj={d}
        setDonates={setDonates}
        setAmount={setAmount}
        setPer={setPer}
      />
    ));
  console.log(ListDonates);

  return (
    <>
      <h1>{girl}</h1>
      <div className="allapart">{ListDonates}</div>
    </>
  );
}
