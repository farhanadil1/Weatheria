import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom weather icons component
const WeatherIcon = ({ condition, size = 'normal' }) => {
  const iconClass = size === 'large' ? 'w-16 h-16' : 'w-8 h-8';
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
    return (
      <motion.svg 
        className={iconClass} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="12" cy="12" r="5" fill="#FDB813"/>
        <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.78 4.22L17.66 6.34M6.34 17.66L4.22 19.78M19.78 19.78L17.66 17.66M6.34 6.34L4.22 4.22" 
          stroke="#FDB813" strokeWidth="2" strokeLinecap="round"/>
      </motion.svg>
    );
  } else if (lowerCondition.includes('partly cloudy') || lowerCondition.includes('cloudy') || lowerCondition.includes('overcast')) {
    return (
      <motion.div className={iconClass} whileHover={{ scale: 1.1 }}>
        <div className="relative">
          <motion.svg 
            className="absolute right-0 top-0 z-10" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="12" cy="12" r="4" fill="#FDB813"/>
          </motion.svg>
          <motion.svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{ x: [2, -2, 2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M3 15a4 4 0 004 4h9a5 5 0 100-10 6 6 0 00-11.791 2H3v4z" fill="#E2E8F0"/>
          </motion.svg>
        </div>
      </motion.div>
    );
  } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) {
    return (
      <motion.div className={iconClass} whileHover={{ scale: 1.1 }}>
        <div className="relative">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 15a4 4 0 004 4h9a5 5 0 100-10 6 6 0 00-11.791 2H3v4z" fill="#94A3B8"/>
          </svg>
          <div className="absolute inset-0 flex justify-center items-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, 10], opacity: [1, 0] }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * 0.3 
                }}
                className="mx-1"
              >
                <div className="w-0.5 h-2 bg-blue-400 rounded-full"/>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return (
      <motion.div className={iconClass} whileHover={{ scale: 1.1 }}>
        <div className="relative">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 15a4 4 0 004 4h9a5 5 0 100-10 6 6 0 00-11.791 2H3v4z" fill="#475569"/>
            <motion.path
              d="M13 10L9 15H13L11 20L17 13H13L15 10H13Z"
              fill="#FDB813"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </svg>
        </div>
      </motion.div>
    );
  } else if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) {
    return (
      <motion.div className={iconClass} whileHover={{ scale: 1.1 }}>
        <div className="relative">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 15a4 4 0 004 4h9a5 5 0 100-10 6 6 0 00-11.791 2H3v4z" fill="#94A3B8"/>
            {[...Array(3)].map((_, i) => (
              <motion.rect
                key={i}
                x="4"
                y={14 + i * 2}
                width={16 - i * 4}
                height="1"
                fill="#E2E8F0"
                animate={{ x: [-4, 4, -4] }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </svg>
        </div>
      </motion.div>
    );
  } else if (lowerCondition.includes('snow')) {
    return (
      <motion.div className={iconClass} whileHover={{ scale: 1.1 }}>
        <div className="relative">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 15a4 4 0 004 4h9a5 5 0 100-10 6 6 0 00-11.791 2H3v4z" fill="#94A3B8"/>
            {[...Array(3)].map((_, i) => (
              <motion.circle
                key={i}
                cx={8 + i * 4}
                cy="18"
                r="1"
                fill="white"
                animate={{ 
                  y: [0, 4, 0],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            ))}
          </svg>
        </div>
      </motion.div>
    );
  }
  // Default cloudy icon as fallback
  return (
    <motion.div className={iconClass} whileHover={{ scale: 1.1 }}>
      <motion.svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M3 15a4 4 0 004 4h9a5 5 0 100-10 6 6 0 00-11.791 2H3v4z" fill="#E2E8F0"/>
      </motion.svg>
    </motion.div>
  );
};

const DetailPanel = ({ data, darkMode }) => {
  if (!data) return null;

  const { location, current, forecast } = data;

  const baseClasses = `
    transition-all duration-300
    ${darkMode ? 'text-white' : 'text-gray-900'}
  `;

  const containerClasses = `
    ${baseClasses}
    ${darkMode ? 'bg-[#1E2837] border-gray-700' : 'bg-white border-gray-200'}
  `;

  const glassEffect = `
    backdrop-blur-sm backdrop-filter
    ${darkMode ? 'bg-opacity-60' : 'bg-opacity-70'}
    border
  `;

  const cardStyle = `
    ${containerClasses} ${glassEffect}
    rounded-xl relative overflow-hidden
  `;

  const gradientOverlay = (from, opacity = 'opacity-10') => `
    absolute inset-0 ${opacity}
    ${darkMode 
      ? `bg-gradient-to-r from-${from}-600` 
      : `bg-gradient-to-r from-${from}-200`}
  `;

  return (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`${cardStyle} max-h-[600px] p-4 sm:p-5 shadow-lg w-full`}
  >
    <div className="h-full flex flex-col space-y-5 sm:space-y-6">
      {/* Header */}
      <motion.div className={`relative pb-3 sm:pb-4 border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <h2 className={`text-xl sm:text-2xl font-bold ${baseClasses}`}>{location.name}</h2>
        <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Chance of rain: {forecast.forecastday[0].day.daily_chance_of_rain}%
        </p>
      </motion.div>

     {/* Current Weather */}
<motion.div className="flex items-center justify-between gap-2">
  <motion.span 
    whileHover={{ scale: 1.05 }}
    className="text-5xl sm:text-6xl font-bold relative"
  >
    {Math.round(current.temp_c)}°
    <div className={`absolute -inset-4 blur-xl rounded-full ${darkMode ? 'bg-blue-500' : 'bg-yellow-300'} opacity-20`} />
  </motion.span>

  <WeatherIcon condition={current.condition.text} size="large" />
</motion.div>


      {/* Today's Forecast */}
      <div>
        <h3 className="text-xs uppercase text-gray-500 font-medium mb-2 sm:mb-3">Today's Forecast</h3>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[6, 9, 12].map((hour) => {
            const hourData = forecast.forecastday[0].hour.find(h => new Date(h.time).getHours() === hour);
            return (
              <motion.div 
                key={hour}
                whileHover={{ scale: 1.05 }}
                className={`${cardStyle} p-3`}
              >
                <div className={gradientOverlay('yellow')} />
                <div className="relative z-10">
                  <p className="text-xs text-gray-500">{hour}:00 {hour < 12 ? 'AM' : 'PM'}</p>
                  <div className="flex justify-center items-center my-2">
                    <WeatherIcon condition={hourData.condition.text} />
                  </div>
                  <p className="text-sm font-semibold">{Math.round(hourData.temp_c)}°</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3-Day Forecast */}
<div>
  <h3 className="text-xs uppercase text-gray-500 font-medium mb-2 sm:mb-3">3-Day Forecast</h3>
  <div className="space-y-2">
    {forecast.forecastday.map((day, index) => (
      <motion.div 
        key={day.date}
        whileHover={{ scale: 1.02 }}
        className={`${cardStyle} p-3`}
      >
        <div className={gradientOverlay('blue', 'opacity-5')} />
        
        {/* Always row layout */}
        <div className="flex flex-row items-center justify-between gap-2 relative z-10 flex-wrap">
          
          {/* Date Label */}
          <span className="text-sm w-16 text-center">
            {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
          </span>
          
          {/* Weather Icon + Condition */}
          <div className="flex items-center gap-2 flex-1 justify-center">
            <WeatherIcon condition={day.day.condition.text} />
            <span className="text-xs text-center">{day.day.condition.text}</span>
          </div>

          {/* Max/Min Temp */}
          <span className="text-sm font-medium w-20 text-center">
            {Math.round(day.day.maxtemp_c)}/{Math.round(day.day.mintemp_c)}°
          </span>
        </div>
      </motion.div>
    ))}
  </div>
</div>

    </div>
  </motion.div>
);

};

export default DetailPanel; 