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
    <div className="card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />
      <div className="card__info">
        <h3 className="card__name">{item.name}</h3>
        {isLoggedIn && (
          <button
            className={`card__like-button ${
              isLiked ? 'card__like-button_active' : ''
            }`}
            onClick={handleLike}
            type="button"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          />
        )}
      </div>
      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          aria-label="Delete"
        />
      )}
    </div>
  );
}

export default ItemCard;
