import { Bot, Moon, Sparkles, Sun } from 'lucide-react'


const Header = ({darkMode, toggleDarkMode}) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg py-4 px-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-5xl mx-auto flex justify-between ">
        {/* Left section */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold">ZIO</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium bg-gray-100">
            <Sparkles className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} h-4 w-4`} />
            <span className={`${darkMode ? 'text-indigo-500' : 'text-indigo-700'} text-sm font-medium`}>AI Powered</span>
          </div>
          <button className={`p-2 rounded-full cursor-pointer ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-indigo-100 text-indigo-700'}`}
          onClick={toggleDarkMode}>
            {darkMode ? (<Sun />) : (<Moon />) }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
