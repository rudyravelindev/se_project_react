import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import './ItemCard.css';

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const isOwn = item.owner === currentUser?._id;

  const handleLike = (e) => {
    e.stopPropagation();
    if (!item._id) {
      console.error('Missing item ID!', item);
      return;
    }
    onCardLike({
      id: item._id,
      isLiked: isLiked,
    });
  };
  return (
    <div className="item-card">
      <div className="item-card__image-container">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-card__image"
          onClick={() => onCardClick(item)}
        />
      </div>
      <div className="item-card__info">
        <h3 className="item-card__name">{item.name}</h3>

        {isLoggedIn && (
          <button
            className={`item-card__like-button ${
              isLiked ? 'item-card__like-button_active' : ''
            }`}
            onClick={handleLike}
            aria-label="Like button"
            type="button"
          />
        )}
      </div>
    </div>
  );
}

export default ItemCard;
