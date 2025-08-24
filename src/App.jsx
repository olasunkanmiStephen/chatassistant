import React, { useState } from 'react'
import Header from './component/Headerr.jsx'
import ChatMessage from './component/ChatMessage.jsx';
import { formatTime } from './ChatUtils.js';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, how can I help you?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  return (
    <div className='flex flex-col h-screen '>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <ChatMessage formatTime={formatTime} messages={messages} darkMode={darkMode} />
        </div>
      </div>
    </div>
  )
}

export default App
