import React, { useEffect, useRef, useState } from "react";
import Header from "./component/Headerr.jsx";
import ChatMessage from "./component/ChatMessage.jsx";
import { formatTime } from "./ChatUtils.js";
import Loading from "./component/Loading.jsx";
import ChatInput from "./component/ChatInput.jsx";
import { generateResponse } from "./services/openai.js";
import AuthForm from "./component/authForms.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded JWT payload:", payload);
      setUserId(payload.userId);
    }
  }, []);


  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, cannot fetch history");
      }

      
      try {
        const res = await fetch("http://localhost:5000/chat/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Chat history fetched:", data);

        const history = data.map((msg) => ({
          id: msg._id,
          text: msg.message,
          sender: msg.role === "user" ? "user" : "bot",
          timestamp: new Date(msg.createdAt),
        }));

        setMessages(history);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };

    if (isAuthenticated) fetchHistory();
  }, [isAuthenticated]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = {
        id: (Date.now() + 1).toString() + "_bot",
        text: data.reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating bot response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div
        className={`${
          darkMode ? "bg-gray-600 text-white" : "bg-white"
        } flex flex-col h-screen `}
      >
        <Routes>
          <Route
            path="/"
            element={<AuthForm onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/chat"
            element={
              isAuthenticated ? (
                <>
                  <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                  <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-5xl mx-auto space-y-4">
                      {messages.map((message) => (
                        <ChatMessage
                          key={message.id}
                          formatTime={formatTime}
                          messages={message}
                          darkMode={darkMode}
                        />
                      ))}
                      {isLoading && <Loading darkMode={darkMode} />}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <ChatInput
                    darkMode={darkMode}
                    input={input}
                    setInput={setInput}
                    loading={isLoading}
                    handleSendMessage={handleSendMessage}
                  />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
