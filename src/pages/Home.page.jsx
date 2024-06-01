import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="home_div">
      <Header />
      <div className="welcome_text_div">
        <h2>Please select room</h2>
      </div>
      <div className="home_content_div">
        <h2>Before entering chat let me intrdoce myself</h2>
        <p>
          I'm data, self-taught web developer. I worked on small and medium
          projects by myself. From these projects I learned many things
          including
        </p>
        <li>
          <l>React</l>
          <ul>REST API</ul>
          <ul>Express.js</ul>
          <ul>Node.js</ul>
          <ul>WebSocket</ul>
        </li>
        <p>and many more. If u are interested you cvan contact me</p>
        <div className="nav_icons">
          <a href="https://github.com/data111a" target="_blank">
            <FaGithub style={{ fontSize: "40px" }} />
          </a>
          <a href="https://www.facebook.com/xxanaxx000/" target="_blank">
            <FaFacebook style={{ fontSize: "40px" }} />
          </a>
          <a
            href="https://www.linkedin.com/in/davit-kikaleishvili-aa72b6256/"
            target="_blank"
          >
            <FaLinkedin style={{ fontSize: "40px" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
