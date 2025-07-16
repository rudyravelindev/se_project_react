import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import './ItemCard.css';

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const isOwn = item.owner === currentUser?._id;

  const handleLike = () => {
    if (isLoggedIn) {
      onCardLike({ id: item._id, isLiked });
    }
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
            type="button"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          />
        )}
      </div>

      {isOwn && (
        <button
          className="item-card__delete-button"
          type="button"
          aria-label="Delete"
        />
      )}
    </div>
  );
}

export default ItemCard;
