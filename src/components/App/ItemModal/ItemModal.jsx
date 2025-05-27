import '../ItemModal/ItemModal.css';
import CloseIconBtn from '../../../assets/close-btn.svg';

function ItemModal({ activeModal, onClose, card, isOpen }) {
  return (
    <div className={`modal ${isOpen && 'modal_opened'}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close">
          <img
            src={CloseIconBtn}
            alt="Close modal"
            width={20}
            height={20}
            className="modal__close-icon"
          />
        </button>
        <img
          src={card.link || card.imageUrl}
          alt={card.name || 'Preview image'}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
