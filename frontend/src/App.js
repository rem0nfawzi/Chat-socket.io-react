import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

let socket;
function App() {
  // Messages
  const [messages, setMessages] = useState([]);

  // Start socket connection
  useEffect(() => {
    socket = io("http://localhost:3000/");

    // Listen to event "send-message"
    socket.on("send-message", newData => {
      setMessages(prev => [...prev, newData]);
    });

    // Cleanup function
    return () => socket.disconnect();
  }, []);

  // Send message
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!nameSaved) {
      setNameSaved(true);
    } else
      socket.emit("send-message", {
        message,
        name,
      });
    // Empty input
    setMessage("");
  };

  // Scroll to bottom whenever messages are updated
  const lastMsgRef = useRef();
  useEffect(() => {
    if (lastMsgRef) lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div id="chat-app">
      <div className="messages">
        {messages.map(msg => (
          <div
            className={`msg-row ${msg.name === name ? "mine" : ""}`}
            key={uuidv4()}
          >
            <span className="avatar">
              {msg.name.split(" ").map(name => name[0])}
            </span>
            <p>{msg.message}</p>
          </div>
        ))}
        <span ref={lastMsgRef}></span>
      </div>

      <form onSubmit={handleSubmit}>
        {!nameSaved && (
          <input
            type="text"
            value={name}
            placeholder="Name ..."
            onChange={e => setName(e.target.value)}
            className="name"
          />
        )}

        {nameSaved && (
          <input
            type="text"
            value={message}
            placeholder="message ..."
            onChange={e => setMessage(e.target.value)}
          />
        )}

        <input
          type="submit"
          value={nameSaved ? "send" : "enter"}
          disabled={!message && nameSaved}
          className={!message ? "disabled" : ""}
        />
      </form>
    </div>
  );
}

export default App;
