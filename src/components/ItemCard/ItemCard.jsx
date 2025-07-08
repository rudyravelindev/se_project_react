import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './ItemCard.css';
function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  // Check if current user is the owner of this card
  const isOwn = item.owner === currentUser?._id;

  // Check if current user has liked this card
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <div className="item-card__content">
        <div className="item-card__header">
          <h2 className="item-card__name">{item.name}</h2>
          {isLoggedIn && (
            <button
              className={`item-card__like-button ${
                isLiked ? 'item-card__like-button_active' : ''
              }`}
              onClick={handleLikeClick}
              aria-label={isLiked ? 'Unlike item' : 'Like item'}
            />
          )}
        </div>
        <img className="item-card__image" src={item.imageUrl} alt={item.name} />
        {isOwn && (
          <button
            className="item-card__delete-button"
            aria-label="Delete item"
          />
        )}
      </div>
    </li>
  );
}

export default ItemCard;
