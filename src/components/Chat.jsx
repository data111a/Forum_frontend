import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
// import Capitalize from "../utils/Capitalize";
import FormatTime from "../utils/FormatTime";
import { IoMdExit, IoIosSend } from "react-icons/io";
import Capitalize from "../utils/Capitalize";

const socketURL = "wss://forum-backend-oriy.onrender.com/";

// "https://forum-backend-ipql.onrender.com";

// eslint-disable-next-line react/prop-types
const Chat = ({ room_category, setJoined, username, width }) => {
  const [input, setInput] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [currFontSize, setCurrFontSize] = useState(16);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    const getPrevMessages = async () => {
      const res = await axios.get(
        `https://forum-backend-oriy.onrender.com/messages/get/${room_category}`
        // `http://localhost:3000/messages/get/${room_category}`
      );
      setMessageHistory(res.data);
    };
    getPrevMessages();
  }, []);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${socketURL}?token=${localStorage.getItem("token")}`,
    {
      onError: (event) => {
        console.error("WebSocket error observed:", event);
      },
      // eslint-disable-next-line no-unused-vars
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    const date = new Date();
    sendMessage(
      JSON.stringify({
        type: "join",
        room: room_category,
        date: {
          day: date.getDate() + 1,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
        },
      })
    );
    setMessageHistory([]);
  }, [room_category]);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);
        const newMess = {
          message: data.message,
          date: data.date,
          username: data.username,
        };
        setMessageHistory((prevMessages) => [...prevMessages, newMess]);
      } catch (err) {
        console.log(err);
      }
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (connectionStatus === "Closed") {
      // eslint-disable-next-line react/prop-types
      setJoined(false);
      navigate("/Forum_frontend/home");
    }
  }, [connectionStatus, navigate]);

  const handleSendMessage = useCallback(() => {
    inputRef.current.focus();
    const date = new Date();
    if (input.trim()) {
      sendMessage(
        JSON.stringify({
          type: "message",
          message: input,
          date: {
            day: date.getDate() + 1,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
          },
        })
      );
      setInput("");
    }
  }, [input, sendMessage]);

  return (
    <div className="chat_div">
      <div className="chat_header_div">
        <button
          className="change_room_btn"
          onClick={() => {
            // eslint-disable-next-line react/prop-types
            setJoined(false);
          }}
        >
          <IoMdExit />
        </button>
        <div className="title_div">{Capitalize(room_category)}</div>
        <div className="font_reg_div">
          {width > 860 && <p>Font size : </p>}
          <button
            className="font_reg_btn"
            onClick={() => {
              if (currFontSize > 12) {
                setCurrFontSize((prev) => prev - 1);
              }
            }}
          >
            -
          </button>
          <p>{currFontSize}</p>
          <button
            className="font_reg_btn"
            onClick={() => {
              if (currFontSize < 25) {
                setCurrFontSize((prev) => prev + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="chat_box_div">
        <div className="chat_content_div">
          <ul>
            {messageHistory?.map((msg, index) => (
              <div
                className={`message_div ${
                  msg.username == username ? "own_message" : "other_message"
                }`}
                key={index}
              >
                {msg.username == username && (
                  <p className="date_msg">
                    {FormatTime(msg.date !== undefined ? msg.date : "")}
                  </p>
                )}
                <div className="message_text_div">
                  <p style={{ fontSize: currFontSize }}>
                    {msg.username} : {msg.message}
                  </p>
                </div>
                {msg.username != username && (
                  <p className="date_msg">
                    {FormatTime(msg.date !== undefined ? msg.date : "")}
                  </p>
                )}
              </div>
            ))}
          </ul>
        </div>
        <div className="input_box">
          <input
            ref={inputRef}
            placeholder="Some text"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={() => handleSendMessage()}>
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
