import "../App.css";
import { useState, useEffect } from "react";
import CardComponents from "./cardComponents";
const cardImages = [
  {
    src: "/PNG-cards-1.3/3_of_spades.png",matched:false
  },
  {
    src: "/PNG-cards-1.3/6_of_spades.png",matched:false
  },
  {
    src: "/PNG-cards-1.3/ace_of_hearts.png",matched:false
  },
  {
    src: "/PNG-cards-1.3/king_of_clubs.png",matched:false
  },
  {
    src: "/PNG-cards-1.3/jack_of_clubs.png",matched:false
  },
  {
    src: "/PNG-cards-1.3/queen_of_clubs2.png",matched:false
  },

];
function EasyLevel() {
  const [card, setCard] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled,setDisbaled]= useState(false);
  const shuffle = () => {
    const Shufflecards = [...cardImages, ...cardImages] //new array bna li hy having 12 items ,duplicate of each item
      .sort(() => Math.random() - 0.5) //randomly sort kreingy
      .map((card) => ({ ...card, id: Math.random() })); //har card ki new copy return krien gy upr bnai thi pr wahan show shallow copy hy is liye aik pr click to dodno flip hongy is liye .map new return kry ga
    setCard(Shufflecards);
    setTurns(0);
  };
  /// set choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisbaled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCard(prevCards =>
        prevCards.map(card =>
          card.src === choiceOne.src ? { ...card, matched: true } : card
        )
      );
      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }
}, [choiceOne, choiceTwo]);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turns) => turns + 1);
    setDisbaled(false)
  };
useEffect(()=>{
  shuffle();
},[])
  return (
    <div className="App">
      <h1>Memo Flip</h1>
      <button onClick={shuffle}>Play Again
      </button>
    <p className="game-info">Match: 2×2 Mines: 0</p>
      <div className="card-grid">
        {card.map((card) => (
          <CardComponents
            key={card.id}
            src={card.src}
            handleChoice={handleChoice}
            card={card}
            flipped={card===choiceOne || card===choiceTwo || card.matched}
            disabled={disabled}
            shuffle={shuffle}
          />
        ))}
      </div>
      <p className="turns-counter">Turns: {turns}</p>

    </div>
  );
}
export default EasyLevel;