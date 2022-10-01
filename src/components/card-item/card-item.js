import "./card-item.css";

function CardItem({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card-item" key={card.id}>
      <div className={flipped ? "flipped" : null}>
        <img src={card.src} className="front" alt="card front" />
        <img
          src="/assets/card-back.jpg"
          className="back"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default CardItem;
