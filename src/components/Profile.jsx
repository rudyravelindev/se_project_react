import { useContext } from 'react';
import './Profile.css';
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
export default function Profile({
  clothingItems,
  onAddItem,
  onCardClick,
  onCardLike,
  handleAddClick,
  onEditProfile,
  onLogout,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  // Filter to show only current user's items
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="profile">
      <SideBar
        currentUser={currentUser}
        onEditProfile={onEditProfile}
        onLogout={onLogout}
      />
      <ClothesSection
        clothingItems={userItems}
        onAddItem={handleAddClick}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
