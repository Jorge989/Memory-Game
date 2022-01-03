import { useState, useEffect } from "react";
import styles from "./App.module.css";
import SingleCard from "./components/SingleCard";
import "./App.css";
const cardImages = [
  { src: "/img/helmet-1.png", match: false },
  { src: "/img/potion-1.png", match: false },
  { src: "/img/ring-1.png", match: false },
  { src: "/img/scroll-1.png", match: false },
  { src: "/img/shield-1.png", match: false },
  { src: "/img/sword-1.png", match: false },
];
// var fruits = ["cherries", "apples", "bananas"];
// var scores = [1, 10, 2, 21];
// const total = [...scores, ...scores];
// console.log(total.sort(() => Math.random - 1));
// console.log(
//   total
//     .sort(() => Math.random())
//     .map((card) => ({ ...card, id: Math.random() }))
// );

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisalbed] = useState(false);
  const shuffleCards = () => {
    const shuflledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuflledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisalbed(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {
                ...card,
                match: true,
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
  console.log(cards);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisalbed(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Match</button>
      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <SingleCard
            flipped={card === choiceOne || card === choiceTwo || card.match}
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            disabled={disabled}
          />
        ))}
      </div>
      <p>turns: {turns}</p>
    </div>
  );
}

export default App;
