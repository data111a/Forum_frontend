import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Capitalize from "../utils/Capitalize";

const socketURL = "ws://localhost:8080";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const { room_category } = useParams();
  const [currFontSize, setCurrFontSize] = useState(16);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${socketURL}?token=${localStorage.getItem("token")}`,
    {
      // onOpen: () => {
      //   sendMessage(
      //     JSON.stringify({
      //       type: "join",
      //       room: room_category,
      //     })
      //   );
      // },
      onError: (event) => {
        console.error("WebSocket error observed:", event);
      },
      // eslint-disable-next-line no-unused-vars
      shouldReconnect: (closeEvent) => true,
    }
  );

  console.log(messageHistory);

  useEffect(() => {
    sendMessage(
      JSON.stringify({
        type: "join",
        room: room_category,
      })
    );
    setMessageHistory([]);
  }, [room_category]);

  useEffect(() => {
    if (lastMessage !== null) {
      // try {
      const data = JSON.parse(lastMessage.data);
      console.log(data.username);
      setMessageHistory((prevMessages) => [...prevMessages, data.message]);
      // } catch (error) {
      // console.log("Error parsing WebSocket message:", error);
      // }
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
      navigate("/home");
    }
  }, [connectionStatus, navigate]);

  console.log(input);

  const handleSendMessage = useCallback(() => {
    if (input.trim()) {
      sendMessage(
        JSON.stringify({
          type: "message",
          message: input,
        })
      );
      setInput("");
    }
  }, [input, sendMessage]);

  return (
    <div className="chat_div">
      {/* <div>
        <button
          onClick={() => {
            navigate("/home");
          }}
        >
          Change room
        </button>
      </div>
      <h2>Room: {room_category}</h2>
      <div>Status: {connectionStatus}</div>
      <div>
        {messageHistory?.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Send</button> */}
      <div className="chat_header_div">
        <h2>Room : {Capitalize(room_category)}</h2>
        <button
          className="change_room_btn"
          onClick={() => navigate("/home", { replace: true })}
        >
          Change room
        </button>
        <div className="font_reg_div">
          <p>Font size : </p>
          <button
            className="font_reg_btn"
            onClick={() => setCurrFontSize((prev) => prev - 1)}
          >
            -
          </button>
          <p>{currFontSize}</p>
          <button
            className="font_reg_btn"
            onClick={() => setCurrFontSize((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="chat_box_div">
        <div className="chat_content_div">
          {messageHistory?.map((msg, index) => (
            <p style={{ fontSize: currFontSize }} key={index}>
              {msg}
            </p>
          ))}
        </div>
        <div className="input_box">
          <input
            placeholder="Some text"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={() => handleSendMessage()}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
