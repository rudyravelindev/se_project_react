import './Profile.css';
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';

export default function Profile({ clothingItems, onAddItem, onCardClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddItem={onAddItem}
        onCardClick={onCardClick}
      />
    </div>
  );
}
