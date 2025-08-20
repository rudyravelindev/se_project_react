import { useContext } from 'react';
import './ClothesSection.css';
import ItemCard from './ItemCard';
import CurrentUserContext from '../contexts/CurrentUserContext';

import {
  getItems,
  addItem,
  deleteItem,
  addLike,
  removeLike,
} from '../utils/api';

function ClothesSection({ clothingItems, onAddItem, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  // Filter to show only current user's items
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          className="clothes-section__add-button"
          onClick={onAddItem}
          type="button"
          aria-label="Add new clothing item"
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))
        ) : (
          <p className="clothes-section__empty-message">
            You haven't added any items yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default ClothesSection;
