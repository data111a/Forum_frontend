import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Reminder = ({ width }) => {
  return (
    <div className="Reminder_div">
      <div>
        <h2>Please select room</h2>
      </div>
      <div className="Reminder_up_div">
        <div className="Reminder_content_div">
          <h3>Before you go in a little about the project </h3>
          <p>
            The purpose of this project is to show you my capabilities in both
            frontend and backend. I have used a number of well-known libraries
            and technologies in this project. For example, JWT web tokens,
            WebSocket and more... I used Express.js for the backend and React.js
            for the frontend. Now a little about me: I am a self-taught
            developer who strives to grow and take on new challenges. I am ready
            to take responsibility for new tasks and develop along with it. A
            short list of what technologies I know:
          </p>
          <div className="List_div">
            <li>React</li>
            <li>Express.js</li>
            <li>Node.js</li>
            <li>JWT </li>
            <li>WebSocket</li>
            <li>HTML 5</li>
            <li>CSS</li>
          </div>
          <p>and many more. If u are interested you can contact me on</p>
          <p>davitkikaleishvili551@gmail.com</p>
        </div>
        {width > 860 && (
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
        )}
      </div>
    </div>
  );
};

export default Reminder;
