import React from 'react';
import ModalWithForm from './ModalWithForm';
import Input from './Input';
import { useForm } from '../hooks/useForm';
import './LoginModal.css';
import './AuthModal.css';

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  onRegisterClick,
  isLoading,
}) => {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const isFormValid =
    values.email.trim() !== '' && values.password.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Log in"
      buttonText={isLoading ? 'Logging in...' : 'Log in'}
      isButtonDisabled={!isFormValid}
      isLoading={isLoading}
      additionalButton={
        <button
          type="button"
          className="modal__alt-button"
          onClick={(e) => {
            e.preventDefault();
            onRegisterClick();
          }}
        >
          or Sign Up
        </button>
      }
    >
      <Input
        label="Email*"
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Password*"
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};

export default LoginModal;
