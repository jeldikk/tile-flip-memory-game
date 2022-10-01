import { useEffect, useState } from "react";
import "./App.css";
import CardItem from "./components/card-item/card-item";

const cardImages = [
  {
    src: "/assets/alluarjun.jpg",
  },
  {
    src: "/assets/chiru.jpg",
  },
  {
    src: "/assets/jr-ntr.jpg",
  },
  {
    src: "/assets/balayya.jpg",
  },
  {
    src: "/assets/prabhas.jpg",
  },
  {
    src: "/assets/rana.jpg",
  },
  {
    src: "/assets/nagarjuna.jpg",
  },
  {
    src: "/assets/venkatesh.jpg",
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleImages = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ id: Math.random(), ...card, matched: false }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {
                ...card,
                matched: true,
              };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h2>Hero's Memory Game</h2>
      <button type="button" onClick={shuffleImages}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="turn-count">Turns Count: {turns}</div>
    </div>
  );
}

export default App;
