import './ItemCard.css';
function ItemCard({ item, onCardClick }) {
  return (
    <div className="item-card" onClick={() => onCardClick(item)}>
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
      <h3 className="item-card__name">{item.name}</h3>
    </div>
  );
}

export default ItemCard;
