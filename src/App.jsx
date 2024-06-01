import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.page";
import Registration from "./pages/Registration.page";
import Home from "./pages/Home.page";
import Chat from "./pages/Chat.page";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chats/:room_category" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
