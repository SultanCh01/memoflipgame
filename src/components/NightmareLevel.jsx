
import React from 'react'
import "../App.css";
import { useState, useEffect } from "react";
import CardComponents from "./cardComponents";


const cardImages = [

    {
        src: "/PNG-cards-1.3/ace_of_hearts.png", matched: false
    },
    {
        src: "/PNG-cards-1.3/king_of_clubs.png", matched: false
    }, {
        src: "/PNG-cards-1.3/black_joker.png", matched: false
    }
    , {
        src: "/PNG-cards-1.3/queen_of_hearts.png", matched: false
    }
    , {
        src: "/PNG-cards-1.3/jack_of_hearts2.png", matched: false
    }
    
];
const Bomb = [
    {
        src: "/PNG-cards-1.3/bomb.png"
    }
]
function NightmareLevel() {


    const [card, setCard] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [choiceThree, setChoiceThree] = useState(null);
    const [choiceFour, setChoiceFour] = useState(null);
    const [disabled, setDisbaled] = useState(false);
    const shuffle = () => {
        const Shufflecards = [...cardImages, ...cardImages, ...cardImages , ...cardImages, ...Bomb,...Bomb,...Bomb,...Bomb] 
            .sort(() => Math.random() - 0.5) 
            .map((card) => ({ ...card, id: Math.random() }));
        setCard(Shufflecards);
        setTurns(0);
    };
   
    const handleChoice = (card) => {
       
        if (card.src === "/PNG-cards-1.3/bomb.png") {
            if (!choiceOne) {
                setChoiceOne(card);
            } else if (!choiceTwo) {
                setChoiceTwo(card);
            } else if (!choiceThree) {
                setChoiceThree(card);
            }
            else if (!choiceFour) {
                setChoiceFour(card)
            }

            setTimeout(() => {
                alert(" You hit a bomb!");
                resetTurn();
                shuffle()
            }, 1000);
            return;
        }
        if (!choiceOne) {
            setChoiceOne(card)
        }
        else if (!choiceTwo) {
            setChoiceTwo(card)
        }
        else if (!choiceThree) {
            setChoiceThree(card)
        }
        else if (!choiceFour) {
            setChoiceFour(card)
        }
    };
    useEffect(() => {

        if (choiceOne && choiceTwo && choiceThree && choiceFour) {
            if (choiceOne.src === choiceTwo.src) {
                
                if (choiceTwo.src === choiceThree.src) {
                    if(choiceThree.src===choiceFour.src)
                        setDisbaled(true)
                    setCard(prevCards =>
                        prevCards.map(card =>
                            card.src === choiceOne.src ? { ...card, matched: true } : card
                        )
                    );
                }
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo, choiceThree,choiceFour]);

   

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setChoiceThree(null);
        setChoiceFour(null);
        setTurns((turns) => turns + 1);
        setDisbaled(false)
    };
    useEffect(() => {
        shuffle();
    }, [])

    return (
        <div className="App">
            <h1>Memo Flip</h1>

            <button onClick={shuffle}>Play Again</button>
           <p className="game-info">Match: 4×4 Mines: 4</p>

            <div className="card-grid">
                {card.map((card) => (
                    <CardComponents
                        key={card.id}
                        src={card.src}
                        handleChoice={handleChoice}
                        card={card}
                        flipped={card === choiceOne || card === choiceTwo || card === choiceThree || card === choiceFour || card.matched}
                        disabled={disabled}

                    />
                ))}
            </div>
            <p className="turns-counter">Turns: {turns}</p>

        </div>
    );

}

export default NightmareLevel
