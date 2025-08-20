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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        if (Array.isArray(items)) {
          const safeItems = items.map((item) => ({
            ...item,
            likes: item.likes || [],
          }));
          setClothingItems(safeItems);
        } else {
          setClothingItems([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch items:', err);
        setClothingItems([]);
      });
  }, []);

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
          (prevItems || []).filter((item) => item._id !== card._id)
        );
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleAddItemSubmit = async (newItem) => {
    setIsLoading(true);
    const token = localStorage.getItem('jwt');

    try {
      const tempId = `temp-${Date.now()}`;
      setClothingItems((prev) => [
        { ...newItem, _id: tempId },
        ...(prev || []),
      ]);

      const createdItem = await addItem(newItem, token);
      console.log('Created item response:', createdItem);

      setClothingItems((prev) => [
        createdItem,
        ...prev.filter((item) => item._id !== tempId),
      ]);

      setTimeout(async () => {
        try {
          const itemsFromServer = await getItems(); // use the array directly
          console.log('Verification fetch:', itemsFromServer);
          if (!itemsFromServer.some((item) => item._id === createdItem._id)) {
            console.warn('Item not found in verification fetch');
          }
        } catch (err) {
          console.error('Verification failed:', err);
        }
      }, 1000);

      closeActiveModal();
    } catch (err) {
      console.error('Full error:', err);

      const { data } = await getItems();
      setClothingItems(data || []);
      alert(`Failed to add item: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
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
    const apiCall = isLiked ? removeLike : addLike;

    apiCall(id, token)
      .then((response) => {
        const updatedItem = response?.data || response;
        if (!updatedItem) {
          throw new Error('No item data received');
        }
        setClothingItems((prevItems) =>
          (prevItems || []).map((item) =>
            item._id === id ? updatedItem : item
          )
        );
      })
      .catch((err) => {
        console.error(`Failed to ${isLiked ? 'remove' : 'add'} like:`, err);
      });
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
