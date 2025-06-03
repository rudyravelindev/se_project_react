import '../ItemModal/ItemModal.css';
import CloseIconBtn from '../../../assets/close-btn.svg';

function ItemModal({ activeModal, onClose, card, isOpen, onDelete }) {
  return (
    <div onClick={onClose} className={`modal ${isOpen && 'modal_opened'}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__content modal__content_type_image"
      >
        <button onClick={onClose} className="modal__close">
          <img
            src={CloseIconBtn}
            alt="Close modal"
            width={20}
            height={20}
            className="modal__close-icon"
          />
        </button>
        <div className="modal__image-container">
          <img
            src={card.link || card.imageUrl}
            alt={card.name || 'Preview image'}
            className="modal__image"
          />
        </div>
        <div className="modal__footer">
          <div className="modal__text-container">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <button
            className="modal__delete"
            onClick={() => {
              onDelete(card);
            }}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
