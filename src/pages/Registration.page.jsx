import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repetPass, setRepetPass] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await axios.post("http://localhost:3000/users/add", {
      username,
      password,
      repetPassword: repetPass,
      email,
    });
    console.log(res);
    if (res.data.status === 200) {
      console.log("movida ak");
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } else {
      setError("Failed to register!");
    }
  };

  return (
    <div className="reg_div">
      <div className="reg_form_div">
        <div className="reg_title">
          <h2>Registration</h2>
        </div>
        <div className="reg_inp_div">
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            required={true}
            placeholder="Username*"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required={true}
            placeholder="Password*"
          />
          <input
            onChange={(e) => setRepetPass(e.target.value)}
            value={repetPass}
            type="password"
            required={true}
            placeholder="Repeat password*"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required={true}
            placeholder="Example@gmail.com*"
          />
        </div>
        <div className="reg_btn_div">
          <button
            className="reg_btn"
            onClick={handleRegister}
            disabled={
              username == "" || password == "" || repetPass == "" || email == ""
            }
          >
            Register
          </button>
          <div className="error_div">
            <p className="error_message">{error}</p>
          </div>
          <div className="reg_nav_div">
            <p>
              Back to <NavLink to="/">login!</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
