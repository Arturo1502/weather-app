const apiKey = "276a80b66097882c8b4b20edc5b8fc26"

function getWeatherByCords(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => data)
}

function getForecastByCords(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => data)
}

function getWeather(place) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => data)
}

function getForecast(place) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => data)
}

export {
    getWeather,
    getForecast,
    getWeatherByCords,
    getForecastByCords
}
