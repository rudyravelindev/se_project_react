import './AddItemModal.css';
import { useForm } from '../hooks/useForm';
import ModalWithForm from './ModalWithForm';
import { useEffect } from 'react';

export default function AddItemModal({ onClose, isOpen, onAddItem }) {
  const { values, handleChange, setValues } = useForm({
    name: '',
    imageUrl: '',
    weather: 'hot',
  });

  const resetForm = () => {
    setValues({
      name: '',
      imageUrl: '',
      weather: 'hot',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: values.name.trim(),
      imageUrl: values.imageUrl.trim(),
      weather: values.weather.toLowerCase(),
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
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
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
            checked={values.weather === 'hot'}
            onChange={handleChange}
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
            checked={values.weather === 'warm'}
            onChange={handleChange}
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
            checked={values.weather === 'cold'}
            onChange={handleChange}
          />{' '}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
