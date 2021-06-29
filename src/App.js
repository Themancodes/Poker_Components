import React, { useState, useEffect } from 'react';
import './App.scss';

const Card = (props) => {
  const isNumber = !isNaN(props.number)
  const [isFlipped, setIsFlipped] = useState(props.flipped)

  return <div 
    symbol={props.symbol}
    number={props.number}
    className="card"
    >
   <div 
   className={['container', (isFlipped ? 'flipped' : '')].filter(Boolean).join(' ')}
   onClick={() => { setIsFlipped(!isFlipped) }} 
   >
     
     <div className="front">
       
       <div className="card-corner">
         <div>{ props.number }</div>
         <div>{ props.symbol }</div>
       </div>

       <div className="symbols">
         {(props.number === 'A') && <div>{props.symbol}</div>}
         {(['J','Q','K'].includes(props.number)) && <div className="image"></div>}
         {(isNumber) && new Array(parseInt(props.number))
            .fill(props.symbol)
            .map((cardSymbol, index) => <div key={index} >{cardSymbol}</div> )
         }
       </div>
       
       <div className="card-corner">
       <div>{ props.number }</div>
        <div>{ props.symbol }</div>
       </div>
     
     </div>
         <div className="back"></div>
   </div>
  
  </div>
}


const Deck = (props) => {
  const [cards, setCards] = useState([])

  useEffect(async () => {
      let cards = await (await fetch(`http://192.168.1.64:8080/${props.path}`)).json()
        setCards(cards)
    }, [])

  return <div>
      { (cards.length === 0) ?
      <div>Loading...</div> :
      <div>
        <h3>{props.title}</h3>
        <div className="deck">{ cards.map((card, index) => {
            const number = card.slice(0, -1)
            const symbol = card.slice(-1)

            return <Card symbol={symbol} number={number} key={index} flipped={parseInt(props.flipped) > index} />
          }) }</div>
      </div>
      } 
    </div>
}

function App() {
  return (
    <div className="App"> 
      <header className="App-header"> 
        <Deck title="Table" path="table/" flipped="2" />
        <Deck title="Hand" path="deck/2" />
      </header>
    </div>
  )
}

export default App;