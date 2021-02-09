import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

let socket;
function App() {
  // Messages
  const [messages, setMessages] = useState([]);

  // Start socket connection
  useEffect(() => {
    socket = io("http://localhost:3000/");

    // Listen to event "send-message"
    socket.on("send-message", d => {
      setMessages(prev => [...prev, d]);
    });
    // Cleanup function
    return () => socket.disconnect();
  }, []);

  // Send message
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit("send-message", {
      message,
      name,
    });
  };
  return (
    <div id="chat-app">
      <div className="messages">
        {messages.map(msg => (
          <p key={uuidv4()}>{msg.message}</p>
        ))}
        <span></span>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <input type="submit" value="send" />
      </form>
    </div>
  );
}

export default App;
