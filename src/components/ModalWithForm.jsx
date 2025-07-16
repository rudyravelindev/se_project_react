import './ModalWithForm.css';
import CloseIconBtn from '../assets/close-btn.svg';

function ModalWithForm({
  isOpen,
  children,
  buttonText,
  title,
  onClose,
  onSubmit,
  isButtonDisabled = false,
  isLoading = false,
  additionalButton = null,
}) {
  return (
    <div onClick={onClose} className={`modal ${isOpen && 'modal_opened'}`}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} className="modal__close">
          <img
            src={CloseIconBtn}
            alt="Close modal"
            width={20}
            height={20}
            className="modal__close-icon"
          />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons-container">
            <button
              type="submit"
              className="modal__submit"
              disabled={isButtonDisabled || isLoading}
            >
              {isLoading ? 'Loading...' : buttonText}
            </button>
            {additionalButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
