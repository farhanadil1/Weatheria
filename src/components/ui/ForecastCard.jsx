import React from 'react';
import { motion } from 'framer-motion';

const ForecastCard = ({ time, temp, icon, darkMode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        p-3 rounded-xl text-center
        ${darkMode 
          ? 'bg-[#111827] hover:bg-[#1a2436]' 
          : 'bg-white hover:bg-blue-50'
        }
        transition-colors duration-200 shadow-sm
      `}
    >
      <p className="text-gray-400 text-sm mb-2">{time}</p>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        {icon}
      </motion.div>
      <p className="text-lg font-bold mt-1">{Math.round(temp)}°</p>
    </motion.div>
  );
};

export default ForecastCard; 