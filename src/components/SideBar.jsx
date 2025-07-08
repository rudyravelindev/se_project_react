import { useContext } from 'react';
import './SideBar.css';
import CurrentUserContext from '../contexts/CurrentUserContext';

function SideBar({ onEditProfile, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="User avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">
          {currentUser?.name || 'Terrence Tegegne'}
        </p>
      </div>
      <div className="sidebar__actions">
        <button className="sidebar__edit-button" onClick={onEditProfile}>
          Edit profile
        </button>
        <button className="sidebar__logout-button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
