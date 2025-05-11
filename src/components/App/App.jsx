import { useState, useEffect } from 'react';

import 'normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ModalWithForm from './ModalWithForm/ModalWithForm';
import ItemModal from './ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, APIkey } from '../../utils/constants';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999 },
    city: '',
    isDay: true,
    condition: 'clear',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log('Raw Weather Data:', data); // Add this line

        const filteredData = filterWeatherData(data);
        console.log('Filtered Weather Data:', filteredData);

        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          onClose={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name {''}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image {''}
            <input
              type="text"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                name="weather"
                type="radio"
                className="modal__radio-input"
              />{' '}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                name="weather"
                type="radio"
                className="modal__radio-input"
              />{' '}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                name="weather"
                type="radio"
                className="modal__radio-input"
              />{' '}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <Footer />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </div>
  );
}

export default App;
