import React, { useState } from 'react';
import './RegisterModal.css';

const RegisterModal = ({ isOpen, onClose, onRegister, onLoginClick }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
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
              id="name"
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

          <button type="submit" className="auth-form__submit">
            Sign Up
          </button>
          <button
            type="button"
            className="auth-form__footer-link"
            onClick={() => {
              onClose();
              onLoginClick();
            }}
          >
            or Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
