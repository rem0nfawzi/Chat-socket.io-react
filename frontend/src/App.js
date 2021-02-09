import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;
function App() {
  // Start socket connection
  useEffect(() => {
    socket = io("http://localhost:3000/");

    // Cleanup function
    return () => socket.disconnect();
  }, []);

  // Messages
  const [messages, setMessages] = useState([]);

  // Send message
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit("message", {
      message,
      name,
    });
  };
  return (
    <div id="chat-app">
      <div className="messages"></div>
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
