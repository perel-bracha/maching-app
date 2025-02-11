import logo from "./logo.svg";
import "./App.css";
import Donate from "./components/Donate";
import Home from "./components/Home";
import { Router, Routes } from "react-router";
import { apartments } from "./db/data";

function App() {
  return (
    <>
      <Routes>
        <Router path="/" element={<Home />} />
        <Router path="/apartments" element={<Apartments />}>
          <Router path="/:apartmentId" element={<GirlsApartment />} />
        </Router>
        <Router path="/donate" element={<Donate />} />
      </Routes>
    </>
  );
}

export default App;
