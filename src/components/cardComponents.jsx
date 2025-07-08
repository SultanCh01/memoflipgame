import React from 'react';
import "../App.css";
function CardComponents({ src, handleChoice, card, flipped ,disabled}) {
  const handleClick = () => {
   if(!disabled){
     handleChoice(card);
   }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={src} alt="card front" className="front" />
        <img
          src="/PNG-cards-1.3/cover.png"
          alt="card back"
          className="back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
export default CardComponents;