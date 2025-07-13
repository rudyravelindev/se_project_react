import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <button type="button" onClick={onClose}>
          ✕
        </button>
        <h3>Log In</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="auth-form__footer-container">
            <button
              type="submit"
              className={`auth-form__submit ${
                isFormValid ? 'auth-form__submit--active' : ''
              }`}
              disabled={!isFormValid}
            >
              Log In
            </button>
            <a
              href="#"
              className="auth-form__footer-link"
              onClick={(e) => {
                e.preventDefault();
                onRegisterClick();
              }}
            >
              or Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
