import { checkResponse } from './api';

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

export function filterWeatherData(data) {
  const result = {};
  result.city = data.name;

  // Calculate both F and C temperatures
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round(((tempF - 32) * 5) / 9); // Convert F to C
  result.temp = {
    F: tempF,
    C: tempC,
  };

  result.isDay = isDay(data.sys, Date.now());
  result.type = getWeatherType(data.main.temp);

  const condition = data.weather[0].main.toLowerCase();
  switch (condition) {
    case 'clouds':
      result.condition = 'clouds';
      break;
    case 'clear':
      result.condition = 'clear';
      break;
    case 'thunderstorm':
      result.condition = 'thunderstorm';
      break;
    case 'rain':
      result.condition = 'rain';
      break;
    case 'snow':
      result.condition = 'snow';
      break;
    case 'mist':
    case 'haze':
      result.condition = 'fog';
      break;
    default:
      result.condition = condition;
  }
  console.log('Filtered Result:', result);

  return result;
}

export const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return 'hot';
  } else if (temperature >= 66 && temperature < 86) {
    return 'warm';
  } else {
    return 'cold';
  }
};
