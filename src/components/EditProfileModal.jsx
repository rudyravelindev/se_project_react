import { useContext, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import './EditProfileModal.css';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ModalWithForm from './ModalWithForm';

import {
  getItems,
  addItem,
  deleteItem,
  addLike,
  removeLike,
} from '../utils/api';

function EditProfileModal({ isOpen, onClose, onUpdateProfile, isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: currentUser?.name || '',
    avatar: currentUser?.avatar || '',
  });

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser, setValues]);

  if (!currentUser) return null;

  const isFormValid = values.name.trim() !== '' && values.avatar.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(values);
  };

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText={isLoading ? 'Saving...' : 'Save changes'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isButtonDisabled={!isFormValid}
      isLoading={isLoading}
    >
      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
