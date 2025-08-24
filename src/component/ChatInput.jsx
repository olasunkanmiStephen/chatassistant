import { Send } from 'lucide-react'
import React from 'react'

const ChatInput = ({setInput, darkMode, input, loading, handleSendMessage}) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-t border-gray-200'} p-4`}>
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center space-x-3">
                <input 
                type='text'
                onKeyDown={(e) => {
                    if(e.key === "Enter" && !e.shiftKey){
                        e.preventDefault();
                        handleSendMessage()
                    } 
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-1 border ${darkMode ? 'bg-gray-700 border-gray-800 text-white placeholder-gray-400' : 'bg-white border-gray-300'} rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent `} name="" id="" placeholder='Type your Message...'/>
                <button className={`p-3 rounded-full transition-colors shadow-md cursor-pointer`}
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}>
                    <Send className={`${darkMode ? 'text-white' : 'text-grey-800'}`} />
                </button>
            </div>
        </div>
    </div>
  )
}

export default ChatInput
