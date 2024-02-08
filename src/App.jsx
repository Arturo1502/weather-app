import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import {
  getForecast,
  getForecastByCords,
  getWeather,
  getWeatherByCords,
} from "./components/hooks/fetch";
import { addPlaceToLocalStorage } from "./components/hooks/storage";
import "./app.css";
import Week from "./components/Week";
import Temp from "./components/Temp";
import Today from "./components/Today";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

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
    <main className="md:flex max-w-8xl mx-auto w-full h-screen">
      <section className="w-[100%] md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px] relative h-[990px]">
        <Search inputSearch={inputSearch} cords={cords} />

        <Sidebar
        weatherData={weatherData}
        isFahrenheit={isFahrenheit}
        />
        
      </section>

      <section className="md:flex-1 md:pl-[400px] md:m-20">
        
        <Temp changeF={changeF} changeC={changeC} />
        <Week
          keys={keys}
          forecastData={forecastData}
          isFahrenheit={isFahrenheit}
        />
        <Today weatherData={weatherData}
          isMph={isMph}
        />
        
        <Footer/>
      </section>
    </main>
  );
}

export default App;
