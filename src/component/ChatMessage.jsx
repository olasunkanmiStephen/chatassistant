import { Bot, User } from "lucide-react";

const ChatMessage = ({ messages, darkMode, formatTime }) => {
  const isUser = messages.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start max-w-[80%] rounded-2xl px-5 py-3.5 relative ${
          isUser
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
            : darkMode
            ? "bg-gray-800 text-gray-100 border border-gray-700"
            : "bg-white text-gray-800 shadow-md"
        }`}
      >
        {!isUser && (
          <div
            className={`flex-shrink-0 mr-3 ${
              darkMode ? "text-indigo-400" : "text-indigo-800"
            }`}
          >
            <Bot className="h-5 w-5" />
          </div>
        )}

        <div className="flex-1">
          <span className="block font-medium mb-1">
            {isUser ? "You" : "AI Assistant"}
          </span>
          <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed pb-2.5">
            {messages.text}
          </p>
          <span
            className={`text-xs absolute bottom-2 right-3 ${
              isUser
                ? "opacity-70 text-gray-200"
                : darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            {formatTime(new Date(messages.timestamp))}
          </span>
        </div>

        {isUser && (
          <div className="flex-shrink-0 ml-3 text-indigo-200">
            <User className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
