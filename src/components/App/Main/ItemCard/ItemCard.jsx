import './ItemCard.css';
function ItemCard({ item }) {
  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        <img className="card__image" src={item.link} alt={item.name} />
      </div>
    </li>
  );
}

export default ItemCard;
