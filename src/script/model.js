import dotenv from "dotenv";
const API_KEY = process.env.API_KEY;

export const state = {
  city: null,
  coords: [null, null],
  weather: {
    current: {},
    daily: [],
  },
};

export const fetchCity = async function (city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("💥 Invalid response");
    const data = await response.json();

    const { name, lat, lon } = await data[0];

    state.city = name;
    state.coords = [lat, lon];
  } catch (err) {
    throw err;
  }
};

export const fetchWeather = async function (city) {
  try {
    await fetchCity(city);

    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${state.coords[0]}&lon=${state.coords[1]}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error("💥 Invalid response");
    const data = await response.json();

    const { current: currentWeather, daily: dailyWeather } = data;
    dailyWeather.splice(0, 1);

    state.weather.current = {
      temperature: currentWeather.temp,
      perceivedTemp: currentWeather.feels_like,
      humidity: currentWeather.humidity,
      wind: currentWeather.wind_speed,
      description: currentWeather.weather[0],
    };

    state.weather.daily = [...dailyWeather];
  } catch (err) {
    throw err;
  }
};
