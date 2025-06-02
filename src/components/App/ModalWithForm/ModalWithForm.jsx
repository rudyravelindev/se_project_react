import '../ModalWithForm/ModalWithForm.css';
import CloseIconBtn from '../../../assets/close-btn.svg';

function ModalWithForm({
  isOpen,
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  onSubmit,
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
          {' '}
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
