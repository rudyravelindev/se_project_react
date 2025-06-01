import './ClothesSection.css';
import ItemCard from '../components/ItemCard/ItemCard';

function ClothesSection({
  clothingItems,
  onAddItem,
  onSelectCard,
  weatherType,
  onCardClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        {/* <button className="clothes-section__add-button" onClick={onAddItem}>
          + Add new
        </button> */}

        <button
          className="clothes-section__add-button"
          onClick={() => onAddItem()}
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id || item.id}
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
