import { Link } from 'react-router-dom';

import { useContext } from 'react';
import './Header.css';
import logo from '../../../assets/logo.svg';
import avatar from '../../../assets/avatar.png';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';
import { CurrentTemperatureUnitContext } from '../../../contexts/CurrentTemperatureUnitContext';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
  onLogoutClick,
}) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header__left-group">
        <Link to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right-group">
        <ToggleSwitch
          isChecked={currentTemperatureUnit === 'C'}
          onToggle={handleToggleSwitchChange}
        />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">
                  {currentUser?.name || 'User'}
                </p>
                <img
                  src={currentUser?.avatar || avatar}
                  alt={currentUser?.name || 'User Avatar'}
                  className="header__avatar"
                />
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button className="header__signup" onClick={onRegisterClick}>
              Sign up
            </button>
            <button className="header__signin" onClick={onLoginClick}>
              Sign in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
