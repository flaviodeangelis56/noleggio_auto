import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import MyHome from "./components/MyHome";
import MyFooter from "./components/MyFooter";
import ParcoMacchine from "./components/ParcoMacchine";
import VehicleDetails from "./components/VehicleDetails";
import GestionePM from "./components/GestionePM";
import MiePrenotazioni from "./components/MiePrenotazioni";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MyHome />} />
        <Route path="/parcoMacchine" element={<ParcoMacchine />} />
        <Route path="/vehicleDetails/:Id" element={<VehicleDetails />} />
        <Route path="/gestionePM" element={<GestionePM />} />
        <Route path="/MiePrenotazioni" element={<MiePrenotazioni />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
