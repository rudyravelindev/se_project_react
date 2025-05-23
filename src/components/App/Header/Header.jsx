// import './Header.css';
// import logo from '../../../assets/logo.svg';
// import avatar from '../../../assets/avatar.png';
// import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';

// function Header({ handleAddClick, weatherData }) {
//   const currentDate = new Date().toLocaleString('default', {
//     month: 'long',
//     day: 'numeric',
//   });
//   return (
//     <header className="header">
//       <img src={logo} alt="Logo" className="header__logo" />

//       <p className="header__date-and-location">
//         {currentDate}, {weatherData.city}
//       </p>
//       <ToggleSwitch />
//       <button
//         onClick={handleAddClick}
//         type="button"
//         className="header__add-clothes-btn"
//       >
//         + Add Clothes
//       </button>

//       <div className="header__user-container">
//         <p className="header__username">Terrence Tegegne</p>
//         <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
//       </div>
//     </header>
//   );
// }

// export default Header;

import './Header.css';
import logo from '../../../assets/logo.svg';
import avatar from '../../../assets/avatar.png';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header__left-group">
        <img src={logo} alt="Logo" className="header__logo" />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__toggle-add-group">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      </div>

      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
