import React, { useState } from 'react';
import './RegisterModal.css';

const RegisterModal = ({ isOpen, onClose, onRegister, onLoginClick }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid =
    email.trim() !== '' &&
    password.trim() !== '' &&
    name.trim() !== '' &&
    avatar.trim() !== '';

  const handleSubmit = (e) => {
    onRegister({ name, avatar, email, password });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onClose();
    onLoginClick();
  };

  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <button type="button" onClick={onClose}>
          ✕
        </button>
        <h3>Sign up</h3>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form__field">
            <label htmlFor="email" className="auth-form__label">
              Email*
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-form__input"
              required
            />
          </div>

          <div className="auth-form__field">
            <label htmlFor="password" className="auth-form__label">
              Password*
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-form__input"
              required
            />
          </div>

          <div className="auth-form__field">
            <label htmlFor="name" className="auth-form__label">
              Name*
            </label>
            <input
              id="register-name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-form__input"
              required
            />
          </div>

          <div className="auth-form__field">
            <label htmlFor="avatar" className="auth-form__label">
              Avatar URL
            </label>
            <input
              id="avatar"
              type="url"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="auth-form__input"
            />
          </div>

          <div className="auth-form__footer-container">
            <button
              type="submit"
              className={`auth-form__submit ${
                isFormValid ? 'auth-form__submit--active' : ''
              }`}
            >
              Sign Up
            </button>
            <a
              href="#"
              className="auth-form__footer-link"
              onClick={handleLoginClick}
            >
              or Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
