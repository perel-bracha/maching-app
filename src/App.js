import logo from "./logo.svg";
import "./App.css";
import { Router, Routes, Route } from "react-router";
import { apartments } from "./db/data";
import Home from "./components/Home";
import Apartments from "./components/Apartments";
import Apartment from "./components/Apartment";
import Girl from "./components/Girl";
import { Donate } from "./components/Donate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartment/:apartmentId" element={<Apartment />} />
        <Route path="/girl/:girlId" element={<Girl />} />
        <Route path="/donate" element={<Donate />}>
          <Route path=":donateId" />
        </Route>
      </Routes>
      {/* <Home a={5} /> */}
    </>
  );
}

export default App;
