import React, { useState, useEffect } from "react"
import axios from "axios"

import Sidebar from "./components/ui/SideBar"
import SearchBar from './components/ui/SearchBar'
import LatestSearches from './components/ui/LatestSearches'
import DetailPanel from './components/ui/DetailPanel'

const App = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [data, setData]         = useState(null);
  const [searches, setSearches] = useState([]);
  const [query, setQuery]       = useState("");

  const API_KEY = "04ad0b19e19d4a9fb14201826250602";

  const fetchWeather = async q => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${q}&days=3`
      );
      setData(res.data);

      // record in latest searches
      setSearches(prev => [
        {
          city:       res.data.location.name,
          temp:       res.data.current.temp_c,
          time:       new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}),
          condition:  res.data.current.condition.text
        },
        ...prev.filter(s => s.city !== res.data.location.name)
      ].slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      pos => fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
      ()  => fetchWeather("Malaga")
    );
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (query.trim()) fetchWeather(query);
  };

  const toggleDark = () => {
    setDarkMode(d => {
      localStorage.setItem("darkMode", !d);
      return !d;
    });
  };

  return (
  <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100/20"} flex min-h-screen`}>
    <Sidebar darkMode={darkMode} toggleDark={toggleDark} />

    <div className="flex-1 flex flex-col">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        darkMode={darkMode}
        toggleDark={toggleDark}
      />

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
        {/* LatestSearches: span 2 cols on large, full width on small */}
        <div className="lg:col-span-2">
          <LatestSearches 
            darkMode={darkMode}
            toggleDark={toggleDark}
            searches={searches}
            onClick={fetchWeather}
          />
        </div>

        {/* DetailPanel: full width on small, 1 col on large */}
        <div className="">
          <DetailPanel 
            darkMode={darkMode}
            toggleDark={toggleDark}
            data={data}
          />
        </div>
      </div>
    </div>
  </div>
);

};

export default App;
