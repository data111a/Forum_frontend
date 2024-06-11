/* eslint-disable react/prop-types */
import { useState } from "react";
import Capitalize from "../utils/Capitalize";
import { FaRegNewspaper } from "react-icons/fa";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { IoBrushOutline, IoBookOutline } from "react-icons/io5";

const Sidebar = ({
  setJoined,
  joined,
  selectedCategory,
  setSelectedCategory,
  leaveRoomBtnRef,
  navigate,
}) => {
  const [error, setError] = useState("");

  const categories = [
    { name: "sport", icon: <MdOutlineSportsGymnastics /> },
    { name: "news", icon: <FaRegNewspaper /> },
    { name: "history", icon: <IoBookOutline /> },
    { name: "art", icon: <IoBrushOutline /> },
  ];
  return (
    <div className="Choose_div">
      <div className="Category_select_div">
        <div className="Option_div">
          {categories.map((category, index) => {
            return (
              <div
                onClick={() => {
                  if (!joined) {
                    setSelectedCategory(category.name);
                  } else {
                    setError("You should leave room first!");
                  }
                }}
                className={`Category_div ${
                  selectedCategory === category.name && "Active_category"
                }`}
                key={index}
              >
                {category.icon}
                <h2>{Capitalize(category.name)}</h2>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            setError("");
            setJoined(true);
          }}
          disabled={!selectedCategory || joined}
        >
          Join Room
        </button>
        <button
          disabled={!joined}
          onClick={() => {
            setError("");
            setSelectedCategory("");
            setJoined(false);
          }}
          ref={leaveRoomBtnRef}
        >
          Leave room
        </button>
        <div className="Error_div">
          <p className="error_message">{error}</p>
        </div>
      </div>
      <button className="logout_btn" onClick={() => navigate("/")}>
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
