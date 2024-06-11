import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post(
      "https://forum-backend-oriy.onrender.com/login",
      // "http://localhost:3000/login",
      {
        username,
        password,
      }
    );
    if (res.data.status === 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/Forum_frontend/home");
    } else {
      setError("User not found!");
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }, []);

  return (
    <div className="login_div">
      <div className="login_form">
        <div className="login_title">
          <h2>Login</h2>
        </div>
        <div className="login_inp_div">
          <input
            placeholder="Username"
            type="text"
            onChange={(e) => {
              setError("");
              setUsername(e.target.value);
            }}
          />
          <input
            placeholder="Passowrd"
            type="password"
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>
        <div className="login_btn_div">
          <button disabled={!username || !password} onClick={handleLogin}>
            Login
          </button>
          <div className="error_div">
            <p className="error_message">{error}</p>
          </div>
          <div className="login_nav_div">
            <p>
              Create accaunt <NavLink to="/registration">here!</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
