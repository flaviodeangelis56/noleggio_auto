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
import GestionePrenotazioni from "./components/GestionePrenotazioni";
import GestioneUtenti from "./components/GestioneUtenti";
import Bugatti from "./components/Bugatti";
import Ferrari from "./components/Ferrari";
import Lamborghini from "./components/Lamborghini";
import McLaren from "./components/McLaren";

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
        <Route path="/gestionePR" element={<GestionePrenotazioni />} />
        <Route path="/gestioneUT" element={<GestioneUtenti />} />
        <Route path="/bugatti" element={<Bugatti />} />
        <Route path="/ferrari" element={<Ferrari />} />
        <Route path="/lamborghini" element={<Lamborghini />} />
        <Route path="/mclaren" element={<McLaren />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
