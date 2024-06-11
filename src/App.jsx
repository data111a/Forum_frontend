import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.page";
import Registration from "./pages/Registration.page";
import Home from "./pages/Home.page";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
