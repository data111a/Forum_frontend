import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:3000/login", {
      username,
      password,
    });
    if (res.data.status === 200) {
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } else {
      setError("User not found!");
    }
  };

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
