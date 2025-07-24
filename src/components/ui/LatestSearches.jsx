import React from 'react';
import { motion } from 'framer-motion';

const WeatherIcon = ({ condition, darkMode }) => {
  const iconColor = darkMode ? 'text-gray-300' : 'text-gray-700';

  const getIcon = () => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </motion.svg>
      );
    }
    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${iconColor}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </motion.svg>
    );
  };

  return (
    <div className={iconColor}>
      {getIcon()}
    </div>
  );
};

const SearchItem = ({ search, onClick, darkMode, isCurrent }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => onClick(search.city)}
      className={`
        relative overflow-hidden
        flex items-center justify-between 
        ${darkMode ? 'bg-[#111827]/50' : 'bg-gray-100/70'}
        backdrop-blur-sm backdrop-filter
        px-4 py-3 rounded-lg cursor-pointer
        ${isCurrent
          ? `border-2 ${darkMode ? 'border-blue-500/50' : 'border-blue-400/50'} shadow-lg`
          : `border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/30'}`
        }
        transition-all duration-300
        ${isCurrent
          ? (darkMode ? 'bg-[#1a2436]/80' : 'bg-white/80')
          : (darkMode ? 'hover:bg-[#1a2436]/60' : 'hover:bg-gray-200/50')
        }
      `}
    >
      <div className={`
        absolute inset-0 
        ${darkMode
          ? 'bg-gradient-to-r from-gray-800/30 to-gray-900/30'
          : 'bg-gradient-to-r from-gray-100/30 to-gray-200/30'}
      `} />

      <div className="flex items-center space-x-3 relative z-10">
        <WeatherIcon condition={search.condition} darkMode={darkMode} />
        <div>
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {search.city}
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
            {search.time}
          </p>
        </div>
      </div>
      <div className={`text-xl font-semibold relative z-10 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {Math.round(search.temp)}°
      </div>
    </motion.div>
  );
};

const LatestSearches = ({ searches, onClick, darkMode = true, currentCity }) => {
  const recentSearches = searches.slice(0, 4);

  return (
    // HIDE ON MOBILE
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        hidden sm:block
        relative overflow-hidden rounded-xl p-4
        ${darkMode ? 'bg-[#1E2837]/40' : 'bg-white/40'}
        backdrop-blur-md backdrop-filter
        border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}
      `}
    >
      {/* Gradient Background */}
      <div className={`
        absolute inset-0 
        ${darkMode
          ? 'bg-gradient-to-b from-gray-800/50 via-gray-800/30 to-gray-900/50'
          : 'bg-gradient-to-b from-gray-100/50 via-gray-200/30 to-gray-300/50'}
      `} />

      {/* Content */}
      <div className="relative z-10">
        <h2 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Latest Searches
        </h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {recentSearches.map((search, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
              }}
            >
              <SearchItem
                search={search}
                onClick={onClick}
                darkMode={darkMode}
                isCurrent={search.city === currentCity}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LatestSearches;
