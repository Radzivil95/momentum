"use strict";
import { getLocalStorage, setLocalStorage } from "./localStorage.js";
const weaterCity = document.querySelector('.city');
const weaterIcon = document.querySelector('.weather-icon');
const weaterTemperature = document.querySelector('.temperature');
const weatherDescr = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');

const getWeatherData = async (city = 'Minsk') => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e568e3207798fb149c9fafd4dcd5cc37&units=metric`);

    return await response.json();
  } catch(error) {
    alert('error');
  }
};

export const weather = async () => {

  weaterCity.addEventListener('input', async () => {
    setLocalStorage();
  });
  if(!localStorage.getItem('city')) {
    weaterCity.value = 'Minsk';
  }
  getLocalStorage();
  const weather = await getWeatherData(weaterCity.value);
  renderWeather(weather);
};

function renderWeather(weather) {
  weaterCity.value = weather.name;
  weaterIcon.src = `https://api.openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  weaterTemperature.innerHTML = Math.round(weather.main.temp) + '°C';
  weatherDescr.innerHTML = weather.weather[0].description;
  weatherWind.innerHTML = 'Wind speed: ' + Math.round(weather.wind.speed) + ' m/s';
  weatherHumidity.innerHTML = 'Humidity: ' + weather.main.humidity + ' %';
}

weaterCity.addEventListener('keypress', (e) => {
  if(e.key == 'Enter') {
    weather();
  }
});