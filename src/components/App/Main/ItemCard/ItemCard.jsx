import './ItemCard.css';
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl || item.link}
          alt={item.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
