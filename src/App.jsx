import React, { useState } from "react";
import Header from "./component/Headerr.jsx";
import ChatMessage from "./component/ChatMessage.jsx";
import { formatTime } from "./ChatUtils.js";
import Loading from "./component/Loading.jsx";
import ChatInput from "./component/ChatInput.jsx";
import { generateResponse } from "./services/openai.js";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, how can I help you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = () => {
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  
  return (
    <div className="flex flex-col h-screen ">
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
        </div>
      </div>
      <ChatInput
        darkMode={darkMode}
        input={input}
        setInput={setInput}
        loading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
