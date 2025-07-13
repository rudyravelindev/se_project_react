import { useState, useContext } from 'react';
import './EditProfileModal.css';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfileModal({ isOpen, onClose, onUpdateProfile, isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, avatar });
  };

  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <button type="button" onClick={onClose}>
          ✕
        </button>
        <h3>Edit profile</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
