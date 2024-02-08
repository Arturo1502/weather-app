import { useEffect, useState } from "react";
import { LocationIcon } from "./components/Icons";
import { Search } from "./components/Search";
import {
  getForecast,
  getForecastByCords,
  getWeather,
  getWeatherByCords,
} from "./components/api/fetch";
import { addPlaceToLocalStorage } from "./utils/storage";
import "./app.css";

import backGNuves from "/Cloud-background.png";
import Weak from "./components/Weak";
import Temp from "./components/Temp";
import Highlights from "./components/Highligths";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    dateFormat: "",
    windStatus: 0,
    humidity: 0,
    airPressure: 0,
    visibilityInMiles: 0,
    weather: "",
    locationName: "",
    showImage: true,
    isImageGoingUp: true,
  });



  const [forecastData, setForecastData] = useState({});
  const [keys, setKeys] = useState([]);

  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isMph, setIsMph] = useState(false);


  const changeWeather = (data) => {
    const { weather, main, visibility, wind, name } = data;
    const date = new Date(); // Obtener la fecha actual
    const dateOptions = { weekday: "short", day: "numeric", month: "short" };

    setWeatherData({
      weather: weather.main ?? "Shower",
      temp: Math.round(main?.temp ?? 0),
      dateFormat: date.toLocaleDateString("en-US", dateOptions),
      windStatus: Math.round(wind?.speed ?? 0),
      humidity: Math.round(main?.humidity ?? 0),
      airPressure: main?.pressure ?? 0,
      visibilityInMiles: visibility ? visibility / 1609.34 : 0,
      weather: weather[0]?.main ?? "Shower",
      locationName: name,
    });
    const progreso = document.getElementById("progress");
    const windStatus = document.getElementById("windStatus");
    progreso.style.width = Math.round(main?.humidity ?? 0) + "%";
    windStatus.style.transform = `rotate(${wind.deg}deg)`;
  };

  const changeForecast = (data) => {
    const dailyForecast = [];

    // Iterar sobre cada segmento de tiempo en el pronóstico extendido
    data.list.forEach((segment) => {
      const fechaTexto = segment.dt_txt;
      const fecha = new Date(fechaTexto);
      const dia = fecha.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      // Si es un nuevo día, inicializar el objeto para ese día
      if (!dailyForecast[dia]) {
        dailyForecast[dia] = {
          minTemp: segment.main.temp,
          maxTemp: segment.main.temp,
          weather: segment.weather[0].main,
        };
      } else {
        // Actualizar las temperaturas mínima y máxima si corresponde
        dailyForecast[dia].minTemp = Math.min(
          dailyForecast[dia].minTemp,
          segment.main.temp
        );
        dailyForecast[dia].maxTemp = Math.max(
          dailyForecast[dia].maxTemp,
          segment.main.temp
        );
      }
    });
    const dayKeys = Object.keys(dailyForecast);
    setForecastData(dailyForecast);
    setKeys(dayKeys);
  };

  const cords = () => {
    // Verificar si el navegador soporta la geolocalización
    if ("geolocation" in navigator) {
      // Obtener la ubicación actual del usuario
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Llamar a una función para obtener datos del clima, por ejemplo
        getWeatherByCords(lat, lon).then((data) => changeWeather(data));
        getForecastByCords(lat, lon).then((data) => changeForecast(data));
      });
    } else {
      // El navegador no soporta la geolocalización
      console.log("La geolocalización no está disponible en este navegador.");
    }
  };

  const inputSearch = (place) => {
    addPlaceToLocalStorage(place);
    getWeather(place).then((data) => changeWeather(data));
    getForecast(place).then((data) => changeForecast(data));
  };

  const changeF = () => {
    setIsFahrenheit(true);
    setIsMph(true)
  };

  const changeC = () => {
    setIsFahrenheit(false);
    setIsMph(false)
  };

  useEffect(() => {
    getWeather("Arequipa").then((data) => changeWeather(data));
    getForecast("Arequipa").then((data) => changeForecast(data));
  }, []);

  return (
    <main className="md:flex max-w-8xl mx-auto w-[100%]">
      <section className="w-[100%] md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px] relative h-[990px]">
        <Search inputSearch={inputSearch} cords={cords} />

        <article
          className="px-4 max-sm:py-[0] bg-blue-1 h-[860px] w-[100%] truncate max-sm:w-full 
        sm:w-[100%] sm:h-[950px] md:h-screen
        "
        >
          <div className="flex flex-col items-center relative">
            <img
              className="w-36 absolute m-[35px] mt-[70px]

              sm:w-44 sm:h-44 sm:mt-[120px] max-sm:mt-[160px]
              
              "
              src={`/${weatherData.weather}.png`}
              alt={`/${weatherData.weather}`}
            />
            <div
              className="w-[100%] absolute  max-sm:w-[1200px] 
                max-sm:pl-[180px]
            sm:w-[850px]"
            >
              {/* bg-transparent */}
              <img
                className="h-auto opacity-10  
                  max-sm:h-[450px]
                sm:w-[900px] 

                md:w-[650px] md:h-[376px] md:ml-[85px]
                "
                src={backGNuves}
                alt=""
              />
            </div>
            <div
              className="absolute mt-5 top-[270px]
            
            sm:top-[400px] max-sm:top-[375px]
            "
            >
              <p className="text-[144px] font-medium">
                {isFahrenheit
                  ? Math.floor(weatherData.temp * (9 / 5) + 32)
                  : weatherData.temp}
                <span className="text-gray-2 text-5xl">
                  {isFahrenheit ? "°F" : "°C"}
                </span>
              </p>
              <div className="flex flex-col justify-center items-center ">
                <p className="text-gray-2 text-4xl font-semibold pb-12">
                  {weatherData.weather}
                </p>
                <div className="flex gap-4 text-gray-2  text-lg font-medium pb-6">
                  <span>Today</span>
                  <span>•</span>
                  <span>{weatherData.dateFormat}</span>
                </div>
                <div className="flex mt-5 gap-3">
                  <LocationIcon />
                  <p className="text-gray-2 text-lg font-semibold">
                    {weatherData.locationName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="md:flex-1 md:pl-[400px] md:m-20">
        <Temp changeF={changeF} changeC={changeC} />
        <Weak
          keys={keys}
          forecastData={forecastData}
          isFahrenheit={isFahrenheit}
        />
        <Highlights weatherData={weatherData}
          isMph={isMph}
        />
        <footer className="text-sm font-medium text-center p-8 mt-14 ">
          created by <span className="font-bold">Arturo Alvarez</span> -
          devChallenges.io
        </footer>
      </section>
    </main>
  );
}

export default App;
