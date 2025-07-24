import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const SearchBar = ({ value, onChange, onSubmit, darkMode, toggleDark }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // New API key from WeatherAPI.com
  const API_KEY = "04ad0b19e19d4a9fb14201826250602";

   useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 2) {
        setSuggestions([]);
        return;
      }

      try {

      setIsLoading(true);
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${value}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call to avoid too many requests
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleSuggestionClick = (suggestion) => {
    console.log('Suggestion clicked:', suggestion); // Debug log
    onChange(suggestion.name);
    setShowSuggestions(false);
    setError(null);
    onSubmit({ preventDefault: () => {} });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    console.log('Input changed:', newValue); // Debug log
    onChange(newValue);
    setShowSuggestions(true);
    if (!newValue) {
      setSuggestions([]);
      setError(null);
    }
  };

  return (
  <div
    className={`
      ${darkMode ? 'bg-[#1E2837]' : 'bg-white'} 
      p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center shadow-lg
      transition-colors duration-300
      relative z-50
    `}
  >
    {/* SEARCH FORM */}
    <form onSubmit={onSubmit} className="flex-1 w-full">
      <motion.div 
        className="relative w-full"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder="Search for cities..."
          className={`
            w-full pl-10 pr-10 py-2 rounded-lg
            ${darkMode ? 'bg-[#111827] text-white' : 'bg-gray-100 text-gray-900'}
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all duration-300
            relative z-50
          `}
        />
        
        {/* Search Icon */}
        <motion.div 
          className="absolute left-3 top-2.5 text-gray-400 z-50"
          animate={{ scale: isFocused ? 1.1 : 1, rotate: isFocused ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {isLoading ? (
            <motion.svg 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </motion.svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </motion.div>

        {/* Clear Button */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={() => {
                onChange("");
                setSuggestions([]);
              }}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 z-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`
                absolute z-50 w-full mt-1 py-2 px-3 rounded-lg text-sm
                ${darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-500'}
                border ${darkMode ? 'border-red-800/30' : 'border-red-200/30'}
              `}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`
                absolute z-[100] w-full mt-2 py-2 rounded-lg shadow-xl
                ${darkMode ? 'bg-[#1E2837] text-white' : 'bg-white text-gray-900'}
                border ${darkMode ? 'border-gray-700' : 'border-gray-200'}
                backdrop-blur-lg backdrop-filter overflow-hidden
              `}
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
            >
              {suggestions.map((suggestion) => (
                <motion.div
                  key={`${suggestion.lat}-${suggestion.lon}`}
                  whileHover={{ backgroundColor: darkMode ? 'rgba(46, 51, 64, 0.8)' : 'rgba(243, 244, 246, 0.8)', scale: 1.01 }}
                  className="px-4 py-2 cursor-pointer flex items-center transition-all duration-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="font-medium">{suggestion.name}</div>
                    <div className="text-sm text-gray-400">
                      {suggestion.region}, {suggestion.country}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </form>
  </div>
);


};

export default SearchBar; 