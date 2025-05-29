import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { getItems, addItem, deleteItem } from '../../utils/api';

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
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal';
import { defaultClothingItems } from '../../utils/constants';
import Profile from '../Profile';

function App() {
  const [clothingItems, setClothingItems] = useState(
    defaultClothingItems.map((item) => ({
      ...item,
      imageUrl: item.link, // Copy link to imageUrl
    }))
  );

  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: {
      F: 999,
      C: 0,
    },
    city: '',
    isDay: true,
    condition: 'clear',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const handleToggleSwitchChange = () => {
    console.log('Current unit before change:', currentTemperatureUnit);

    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  // const handleCardClick = (card) => {
  //   setSelectedCard(card);
  //   setActiveModal('preview');
  // };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };
  const handleDeleteItem = (cardToDelete) => {
    console.log('Attempting to delete:', cardToDelete._id);
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  // const handleDeleteItem = (cardToDelete) => {
  //   console.log('Attempting to delete:', cardToDelete._id); // Debug log
  //   setClothingItems((prevItems) =>
  //     prevItems.filter((item) => item._id !== cardToDelete._id)
  //   );
  //   closeActiveModal();
  // };
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log('Raw Weather Data:', data);

        const filteredData = filterWeatherData(data);
        console.log('Filtered Weather Data:', filteredData);

        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  // Api
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);
  //

  // const handleAddItemSubmit = (newItem) => {
  //   const itemWithId = {
  //     ...newItem,
  //     _id: Math.random().toString(36).substring(2, 9),
  //   };

  //   setClothingItems([itemWithId, ...clothingItems]);

  //   closeActiveModal();
  // };
  const handleAddItemSubmit = (newItem) => {
    addItem(newItem)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit: currentTemperatureUnit,
        handleToggleSwitchChange: handleToggleSwitchChange,
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onAddItem={handleAddItemSubmit}
                  onCardClick={handleCardClick}
                />
              }
            ></Route>
          </Routes>

          <AddItemModal
            isOpen={activeModal === 'add-garment'}
            onClose={closeActiveModal}
            onAddItem={handleAddItemSubmit}
          />
          <Footer />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === 'preview'}
            onDelete={handleDeleteItem}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
