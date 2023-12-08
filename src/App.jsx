import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import MyHome from "./components/MyHome";
import MyFooter from "./components/MyFooter";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MyHome />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
