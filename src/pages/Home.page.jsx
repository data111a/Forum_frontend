import { useRef, useState, useEffect } from "react";
import Reminder from "../components/Reminder";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Ala = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [joined, setJoined] = useState(false);
  const [username] = useState(localStorage.getItem("username"));
  const [width, setWidth] = useState(window.innerWidth);
  const leaveRoomBtnRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    // Function to update state on window resize
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Ala_div">
      {width > 860 || !joined ? (
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          joined={joined}
          setJoined={setJoined}
          leaveRoomBtnRef={leaveRoomBtnRef}
          navigate={navigate}
        />
      ) : (
        ""
      )}
      <div className="Chat_div">
        {" "}
        {joined ? (
          <Chat
            width={width}
            setJoined={setJoined}
            room_category={selectedCategory}
            leaveRoomBtnRef={leaveRoomBtnRef}
            username={username}
          />
        ) : (
          <Reminder width={width} />
        )}
      </div>
    </div>
  );
};

export default Ala;
