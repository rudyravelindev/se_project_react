import React, { useState } from 'react';
import ModalWithForm from './ModalWithForm';
import Input from './Input';
import './AuthModal.css';
import './RegisterModal.css';
import { register, login, checkToken } from '../utils/auth';

const RegisterModal = ({
  isOpen,
  onClose,
  onRegister,
  onLoginClick,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    email: '',
    password: '',
  });

  const isFormValid =
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.name.trim() !== '' &&
    formData.avatar.trim() !== '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onRegister(formData);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign Up"
      buttonText="Sign Up"
      isButtonDisabled={!isFormValid}
      isLoading={isLoading}
      additionalButton={
        <button
          type="button"
          className="modal__alt-button"
          onClick={(e) => {
            e.preventDefault();
            onLoginClick();
          }}
        >
          or Log In
        </button>
      }
    >
      <Input
        label="Email*"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Password*"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Input
        label="Name*"
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Avatar URL*"
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        value={formData.avatar}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
