import '../ModalWithForm/ModalWithForm.css';
import CloseIconBtn from '../../../assets/close-btn.svg';

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div className={`modal ${activeModal === 'add-garment' && 'modal_opened'}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={handleCloseClick} className="modal__close">
          <img
            src={CloseIconBtn}
            alt="Close modal"
            width={20}
            height={20}
            className="modal__close-icon"
          />
        </button>
        <form className="modal__form">
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
