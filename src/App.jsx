import React, { useState, useEffect } from "react";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);

  const apiKey = "04ad0b19e19d4a9fb14201826250602"; // Replace with your WeatherAPI key

  // Fetch weather and forecast data
  const fetchWeather = async (query) => {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.message) {
          throw new Error(errorData.error.message);
        }
        throw new Error("An unknown error occurred.");
      }

      const data = await response.json();
      setCurrentWeather(data.current);
      setForecast(data.forecast.forecastday);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast(null);
    }
  };

  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          fetchWeather(`${lat},${lon}`);
        },
        (error) => {
          setError("Unable to access your location. Please search manually.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getUserLocation(); // Fetch weather data for user's location on initial load
  }, []);

  // Handle search input and fetch data
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setError("Please enter a valid city or location.");
      return;
    }
    fetchWeather(searchQuery);
  };
  const [date, setDate] = React.useState(new Date());
  const weatherBackgrounds = {
    sunny: "./materils/sunny.jpg",
    clear: "./materils/clear.jpg",
    cloudy: "./materils/cloudy.jpg",
    rain: "./materils/rain.jpg",
    snow: "./materils/snow.jpg",
    thunder: "./materils/thunder.jpg",
    mist: "./materils/mist.jpg",
  };

  const getWeatherBackground = (condition) => {
    condition = condition.toLowerCase();
    const matchingCondition = Object.keys(weatherBackgrounds).find((key) =>
      condition.includes(key)
    );

    return matchingCondition ? weatherBackgrounds[matchingCondition] : "./materils/cloudy.jpg"; // Default if no match
  };

  // Function to get day name from date
  const getDayName = (date) => {
    const options = { weekday: "long" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Function to get the formatted date
  const getFormattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const WeatherCard = ({ weather }) => {
    const [background, setBackground] = useState("/materials/sunny.jpg");

    useEffect(() => {
      if (weather && weather.condition.text) {
        setBackground(getWeatherBackground(weather.condition.text));
      }
    }, [weather]);

    return (
      <div
        className="bg-white m-4 md:m-0 md:mr-2 bg-cover transition-transform duration-300 ease-in-out transform bg-center text-black md:ml-[-100px] md:h-[250px] rounded-lg shadow-lg p-6"
        style={{ backgroundImage: `url('${background}')` }}
      >
        {currentWeather && (
          <>
            <div className="md:mb-0 md:mt-[-6px] mb-6">
              <h1 className="md:text-2xl md:mt-[-10px] w-fit hover:text-white text-3xl font-bold">
                {getDayName(new Date())}
              </h1>
              <p className="text-lg w-fit hover:text-white">{getFormattedDate(new Date())}</p>
            </div>
            <div>
              <h1 className="text-4xl w-fit font-bold hover:text-white">
                {currentWeather.temp_c}°C
              </h1>
              <p className="text-xl w-fit hover:text-white">{currentWeather.condition.text}</p>
              <p className="w-fit hover:text-white">
                <strong>Feels Like:</strong> {currentWeather.feelslike_c}°C
              </p>
              <p className="w-fit hover:text-white">
                <strong>Humidity:</strong> {currentWeather.humidity}%
              </p>
              <p className="w-fit hover:text-white">
                <strong>Wind:</strong> {currentWeather.wind_kph} km/h
              </p>
              <p className="w-fit hover:text-white">
                <strong>Precipitation:</strong> {currentWeather.precip_mm} mm
              </p>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#343D4C]">
      <div className="flex flex-col md:h-full items-center justify-center text-white">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-5xl border-none mx-2 md:mx-0 mt-4 flex mb-6 "
        >
          <input
            type="text"
            placeholder="Search for a city or postal code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 rounded-l-md border-none placeholder:text-black bg-slate-500 text-black"
          />
          <button
            type="submit"
            className="bg-blue-700 px-4 py-3 rounded-r-md transition duration-300 ease-in-out hover:bg-blue-800"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl w-full">
          {/* Left Panel */}
          <WeatherCard weather={currentWeather} />

          {/* Right Panel */}
          <div className="md:col-span-2 m-4 md:m-0 md:ml-2 md:h-[250px] bg-[#212832] md:mr-[-100px] text-black rounded-lg shadow-lg p-6">
            <h2 className="text-2xl md:text-xl md:mt-[-10px] font-bold mb-4 md:mb-0 text-white flex justify-center">5-Day Forecast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
              {forecast &&
                forecast.slice(0, 5).map((day) => (
                  <div
                    key={day.date}
                    className="p-4 md:p-2 hover:text-black hover:bg-slate-300 bg-[#343D4C] m-1 rounded-lg text-white shadow hover:shadow-md"
                  >
                    <p className="font-semibold flex justify-center">{getDayName(day.date)}</p>
                    <img
                      src={day.day.condition.icon}
                      alt={day.day.condition.text}
                      className="w-12 mx-auto"
                    />
                    <p className="font-thin flex justify-center w-auto">{day.day.condition.text}</p>
                    <p className="font-thin flex justify-center">
                      <strong>Max:</strong> {day.day.maxtemp_c}°C
                    </p>
                    <p className="font-thin flex justify-center">
                      <strong>Min:</strong> {day.day.mintemp_c}°C
                    </p>
                    <p className="font-thin flex justify-center">
                      <strong>Rain:</strong> {day.day.totalprecip_mm} mm
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
