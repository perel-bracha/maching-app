import logo from "./logo.svg";
import "./App.css";
import { Router, Routes, Route } from "react-router";
import { apartments } from "./db/data";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hellow/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/topApartments" element={<TopApartments/>}/>
        <Route path="/topGirls" element={<TopGirls/>}/>
        <Route path="/amount" element={<Amount/>}/>
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartment/:apartmentId" element={<Apartment />} />
        <Route path="/girl/:girlId" element={<Girl />} />
        <Route path="/donate" element={<Donate />}>
          <Route path=":donateId" />
        </Route>
        <Route path="/donations/notVerified" element={<NotVerified/>}/>
      </Routes>
      {/* <Home a={5} /> */}
    </>
  );
}

export default App;
