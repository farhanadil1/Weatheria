import React from 'react';
import { motion } from 'framer-motion';

const IconButton = ({ children, className = '', onClick }) => (
  <motion.div 
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      relative p-2 rounded-xl cursor-pointer
      hover:bg-white/10
      backdrop-blur-sm
      transition-all duration-300 ease-in-out
      ${className}
    `}
  >
    {children}
  </motion.div>
);

const Sidebar = ({ darkMode = true, toggleDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        w-16 min-h-screen
        ${darkMode ? 'bg-[#1E2837]/40' : 'bg-white/40'}
        backdrop-blur-md backdrop-filter
        border-r ${darkMode ? 'border-gray-700/30' : 'border-gray-200/30'}
        flex flex-col items-center 
        py-4 space-y-6
        relative
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
      `}
    >
      {/* Gradient Background */}
      <div className={`
        absolute inset-0 
        ${darkMode 
          ? 'bg-gradient-to-b from-gray-800/30 via-gray-800/20 to-gray-900/30' 
          : 'bg-gradient-to-b from-gray-100/30 via-gray-200/20 to-gray-300/30'}
      `} />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full">
        {/* Profile Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative"
        >
          <div className={`absolute inset-0 rounded-full ${darkMode ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30' : 'bg-gradient-to-r from-blue-400/30 to-purple-400/30'} blur-md`} />
          <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'} p-0.5`}>
            <div className={`w-full h-full rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
              <svg className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Weather Icon */}
        <IconButton>
          <svg className={`h-5 w-5 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </IconButton>

        {/* Cities Icon */}
        <IconButton>
          <svg className={`h-5 w-5 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </IconButton>

        {/* Map Icon */}
        <IconButton>
          <svg className={`h-5 w-5 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </IconButton>

        {/* Theme Toggle */}
        <IconButton onClick={toggleDark} className="mt-auto">
          {darkMode ? (
            <motion.svg
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="h-5 w-5 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </motion.svg>
          ) : (
            <motion.svg
              initial={{ rotate: 180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </motion.svg>
          )}
        </IconButton>

        {/* Settings Icon */}
        <IconButton>
          <svg className={`h-5 w-5 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </IconButton>
      </div>
    </motion.div>
  );
};

export default Sidebar; 