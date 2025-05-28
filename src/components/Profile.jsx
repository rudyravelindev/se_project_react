import React from 'react';
import './Profile.css';
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';

function Profile({ clothingItems, onAddItem, onSelectCard, weatherType }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} onAddItem={onAddItem} />
    </div>
  );
}

export default Profile;
