import './Main.css';
import WeatherCard from './WeatherCard/WeatherCard';
import ItemCard from './ItemCard/ItemCard';
import { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../../contexts/CurrentTemperatureUnitContext';

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  isLoggedIn,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature =
    currentTemperatureUnit === 'F' ? weatherData.temp.F : weatherData.temp.C;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temperature}° {currentTemperatureUnit} / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {clothingItems

            .filter((item) => {
              console.log('Weather data:', weatherData);
              console.log('Item weather:', item.weather);
              console.log('Weather type:', weatherData.type);
              console.log(
                'Does item match?',
                item.weather === weatherData.type
              );
              return item.weather === weatherData.type;
            })

            .map((item) => {
              console.log('Item being rendered:', item);
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={() => handleCardClick(item)}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
