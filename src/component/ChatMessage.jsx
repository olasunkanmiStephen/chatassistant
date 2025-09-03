// import { Bot, Check, User } from "lucide-react";

// const ChatMessage = ({ messages, darkMode, formatTime }) => {
//   const isUser = messages.sender === "user";

//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`flex items-start max-w-[80%] rounded-2xl px-5 py-3.5 relative ${
//           isUser
//             ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
//             : darkMode
//             ? "bg-gray-800 text-gray-100 border border-gray-700"
//             : "bg-white text-gray-800 shadow-md"
//         }`}
//       >
//         {!isUser && (
//           <div
//             className={`flex-shrink-0 mr-3 ${
//               darkMode ? "text-indigo-400" : "text-indigo-800"
//             }`}
//           >
//             <Bot className="h-5 w-5" />
//           </div>
//         )}

//         <div className="flex-1">
//           <span className="block font-medium mb-1">
//             {isUser ? "You" : "AI Assistant"}
//           </span>
//           {isEditing ? (
//             <div className="flex items-center space-x-2">
//               <input value={editText} onChange={(e) => setEditText(e.target.value)} className="flrx-1 px-2 py-1 rounded-md text-black" />
//               <button onClick={}>
//                 <Check className="h-4 w-4" />
//               </button>
//             </div>
//           )}
//           <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed pb-2.5">
//             {messages.text}
//           </p>
//           <span
//             className={`text-xs absolute bottom-2 right-3 ${
//               isUser
//                 ? "opacity-70 text-gray-200"
//                 : darkMode
//                 ? "text-gray-400"
//                 : "text-gray-500"
//             }`}
//           >
//             {formatTime(new Date(messages.timestamp))}
//           </span>
//         </div>

//         {isUser && (
//           <div className="flex-shrink-0 ml-3 text-indigo-200">
//             <User className="h-5 w-5" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatMessage;

import { Bot, User, Pencil, Check, X } from "lucide-react";
import { useState } from "react";

const ChatMessage = ({ messages, darkMode, formatTime, onEdit }) => {
  const isUser = messages.sender === "user";
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(messages.text);

  const handleSave = () => {
    onEdit(messages.id, editText);
    setIsEditing(false);
  };

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

          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2 py-1 rounded-md text-black"
              />
              <button onClick={handleSave}>
                <Check className="h-4 w-4" />
              </button>
              <button onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed pb-2.5">
              {messages.text}
            </p>
          )}

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

        {isUser && !isEditing && (
          <div className="flex-shrink-0 ml-3 flex items-center space-x-2">
            <User className="h-5 w-5" />
            <button onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4 opacity-80 hover:opacity-100" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
