import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getItems, addItem, deleteItem } from '../utils/api';
import { register, login, checkToken } from '../utils/auth';
import { updateProfile } from '../utils/api';
import { addLike, removeLike } from '../utils/api';
import 'normalize.css';
import '../vendor/fonts/fonts.css';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ModalWithForm from './ModalWithForm';
import ItemModal from './ItemModal';
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { coordinates, APIkey } from '../utils/constants';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';
import AddItemModal from './AddItemModal';
import Profile from './Profile';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import CurrentUserContext from '../contexts/CurrentUserContext';
import SideBar from './SideBar';
import EditProfileModal from './EditProfileModal';
import ProtectedRoute from './ProtectedRoute';

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
  const [isLoading, setIsLoading] = useState(false);

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

  // Handle escape key press for all modals
  useEffect(() => {
    if (
      !activeModal &&
      !isRegisterModalOpen &&
      !isLoginModalOpen &&
      !isEditProfileModalOpen
    )
      return;

    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        closeActiveModal();
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(false);
        setIsEditProfileModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [
    activeModal,
    isRegisterModalOpen,
    isLoginModalOpen,
    isEditProfileModalOpen,
  ]);

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
    setIsLoading(true);
    const token = localStorage.getItem('jwt');
    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleAddItemSubmit = (newItem) => {
    setIsLoading(true);
    const token = localStorage.getItem('jwt');
    addItem(newItem, token)
      .then((createdItem) => {
        setClothingItems((prevItems) => [createdItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegister = async ({ name, avatar, email, password }) => {
    setIsLoading(true);
    try {
      const data = await register({ name, avatar, email, password });
      localStorage.setItem('jwt', data.token);
      setIsLoggedIn(true);
      setCurrentUser(data);
      setIsRegisterModalOpen(false);
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const data = await login({ email, password });
      localStorage.setItem('jwt', data.token);
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      setIsLoginModalOpen(false);
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const switchToRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleProfileUpdate = async ({ name, avatar }) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const updatedUser = await updateProfile({ name, avatar }, token);
      setCurrentUser(updatedUser);
      setIsEditProfileModalOpen(false);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    if (isLiked) {
      removeLike(id, token)
        .then((updatedItem) => {
          setClothingItems((prevItems) =>
            prevItems.map((item) => (item._id === id ? updatedItem.data : item))
          );
        })
        .catch(console.error);
    } else {
      addLike(id, token)
        .then((updatedItem) => {
          setClothingItems((prevItems) =>
            prevItems.map((item) => (item._id === id ? updatedItem.data : item))
          );
        })
        .catch(console.error);
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onEditProfile={handleEditProfileClick}
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onLogout={handleLogout}
                      onCardLike={handleCardLike}
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
              buttonText={isLoading ? 'Saving...' : 'Add garment'}
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
              onLoginClick={switchToLoginModal}
              buttonText={isLoading ? 'Saving...' : 'Sign up'}
            />
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
              onLogin={handleLogin}
              onRegisterClick={switchToRegisterModal}
              buttonText={isLoading ? 'Signing in...' : 'Sign in'}
            />
            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onClose={() => setIsEditProfileModalOpen(false)}
              onUpdateProfile={handleProfileUpdate}
              buttonText={isLoading ? 'Saving...' : 'Save changes'}
            />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
