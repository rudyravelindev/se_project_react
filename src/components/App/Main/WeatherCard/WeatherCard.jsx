import './WeatherCard.css';
import { weatherOptions } from '../../../../utils/constants';
import { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../../../contexts/CurrentTemperatureUnitContext';

function WeatherCard({ weatherData }) {
  console.log('Weather Data in WeatherCard:', weatherData);

  const filteredOptions = weatherOptions.filter((option) => {
    console.log('Checking option:', option);
    console.log('Against weather:', weatherData.isDay, weatherData.condition);
    console.log('Comparison results:', {
      dayMatch: option.day === weatherData.isDay,
      conditionMatch: option.condition === weatherData.condition,
      optionDay: option.day,
      weatherIsDay: weatherData.isDay,
      optionCondition: option.condition,
      weatherCondition: weatherData.condition,
    });
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  console.log('Filtered Options:', filteredOptions);

  const weatherOptionUrl = filteredOptions[0]?.url;
  const weatherOptionCondition = filteredOptions[0]?.condition;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === 'F'
          ? weatherData.temp.F
          : weatherData.temp.C}{' '}
        &deg; {currentTemperatureUnit}
      </p>
      {weatherOptionUrl ? (
        <img
          src={weatherOptionUrl}
          alt={weatherOptionCondition}
          className="weather-card__image"
        />
      ) : (
        <div>No matching weather image found</div>
      )}
    </section>
  );
}

export default WeatherCard;
