import './AddItemModal.css';
import ModalWithForm from './ModalWithForm';
import { useState, useEffect } from 'react';

export default function AddItemModal({ onClose, isOpen, onAddItem }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weatherType, setWeatherType] = useState('hot');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const resetForm = () => {
    setName('');
    setImageUrl('');
    setWeatherType('hot');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name.trim(),
      imageUrl: imageUrl.trim(),
      weather: weatherType.toLowerCase(),
    };
    console.log('Sending this data to API:', newItem);
    onAddItem(newItem);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name {''}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image {''}
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weather"
            type="radio"
            value="hot"
            className="modal__radio-input"
            checked={weatherType === 'hot'}
            onChange={handleWeatherTypeChange}
          />{' '}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weather"
            type="radio"
            value="warm"
            className="modal__radio-input"
            checked={weatherType === 'warm'}
            onChange={handleWeatherTypeChange}
          />{' '}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            type="radio"
            value="cold"
            className="modal__radio-input"
            checked={weatherType === 'cold'}
            onChange={handleWeatherTypeChange}
          />{' '}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
