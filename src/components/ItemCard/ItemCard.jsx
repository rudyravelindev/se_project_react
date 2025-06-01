import './ItemCard.css';

function ItemCard({ item, onCardClick }) {
  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <div className="item-card__content">
        <h2 className="item-card__name">{item.name}</h2>
        <img className="item-card__image" src={item.imageUrl} alt={item.name} />
      </div>
    </li>
  );
}

export default ItemCard;
