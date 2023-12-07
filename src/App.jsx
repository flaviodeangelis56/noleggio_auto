import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
