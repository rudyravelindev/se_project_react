import './Profile.css';
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';

export default function Profile({
  clothingItems,
  onAddItem,
  onCardClick,
  handleAddClick,
}) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddItem={handleAddClick}
        onCardClick={onCardClick}
      />
    </div>
  );
}
