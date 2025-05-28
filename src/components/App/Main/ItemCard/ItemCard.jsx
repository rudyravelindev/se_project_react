import './ItemCard.css';

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        <img
          className="card__image"
          src={item.imageUrl || item.link}
          alt={item.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
