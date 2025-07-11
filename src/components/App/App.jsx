import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getItems, addItem, deleteItem } from '../../utils/api';
import { register, login, checkToken } from '../../utils/auth';
import { updateProfile } from '../../utils/api';

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
import Profile from '../../components/Profile';
import RegisterModal from '../../components/Auth/RegisterModal';
import LoginModal from '../../components/Auth/LoginModal';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SideBar from '../SideBar';
import EditProfileModal from '../Auth/EditProfileModal';
function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 0 },
    city: '',
    isDay: true,
    condition: 'clear',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch(console.error);
    }
  }, []);

  // Fetch weather data
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  // Fetch clothing items
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.data);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setActiveModal('add-garment');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  const handleDeleteItem = (card) => {
    const token = localStorage.getItem('jwt');
    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemSubmit = (newItem) => {
    const token = localStorage.getItem('jwt');
    addItem(newItem, token)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegister = async ({ name, avatar, email, password }) => {
    try {
      const data = await register({ name, avatar, email, password });

      localStorage.setItem('jwt', data.token);
      setIsLoggedIn(true);
      setCurrentUser(data);

      setIsRegisterModalOpen(false);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const data = await login({ email, password });
      localStorage.setItem('jwt', data.token);
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      setIsLoginModalOpen(false);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  const handleProfileUpdate = async ({ name, avatar }) => {
    try {
      const token = localStorage.getItem('jwt');
      const updatedUser = await updateProfile({ name, avatar }, token);

      setCurrentUser(updatedUser);
      setIsEditProfileModalOpen(false);
    } catch (error) {
      console.error('Update failed:', error);
      // Optional: Add user-facing error message
    }
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setIsLoginModalOpen(true)}
              onRegisterClick={() => setIsRegisterModalOpen(true)}
              onLogoutClick={handleLogout}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onEditProfile={handleEditProfileClick}
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      currentUser={currentUser}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />

            {/* All modals */}
            <AddItemModal
              isOpen={activeModal === 'add-garment'}
              onClose={closeActiveModal}
              onAddItem={handleAddItemSubmit}
            />

            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              isOpen={activeModal === 'preview'}
              onDelete={handleDeleteItem}
              isLoggedIn={isLoggedIn}
            />

            <RegisterModal
              isOpen={isRegisterModalOpen}
              onClose={() => setIsRegisterModalOpen(false)}
              onRegister={handleRegister}
            />

            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
              onLogin={handleLogin}
            />
            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onClose={() => setIsEditProfileModalOpen(false)}
              onUpdateProfile={handleProfileUpdate}
            />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
