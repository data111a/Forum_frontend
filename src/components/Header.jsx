/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Header = () => {
  const [showRooms, setShowRooms] = useState(true);
  const categories = ["Sport", "News", "History", "Art"];

  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleBtnClick = () => {
    let path = `/chats/${selectedCategory.toLowerCase()}`;
    navigate(path);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  console.log(selectedCategory);

  return (
    <div>
      {showRooms ? (
        <div className="home_header_div">
          <div className="home_category_select_div">
            <div className="logout_div">
              <button onClick={handleLogOut}>Logout</button>
            </div>
            {categories.map((category, index) => {
              return (
                <div
                  className={`category_div ${
                    selectedCategory === category && "active_category"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
                  key={index}
                >
                  <p>{category}</p>
                </div>
              );
            })}
            <button className="join_btn" onClick={handleBtnClick}>
              Join
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="show_hide_btn">
        <button
          onClick={() => {
            setShowRooms((prev) => !prev);
          }}
        >
          {showRooms ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
        </button>
      </div>
    </div>
  );
};

export default Header;
