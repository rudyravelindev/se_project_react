import './ItemCard.css';

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
      <h3 className="item-card__name">{item.name}</h3>
    </div>
  );
}

export default ItemCard;
