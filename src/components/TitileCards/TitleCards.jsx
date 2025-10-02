import React, { useRef, useEffect } from 'react'
import './TitleCards.css'
import card_data from '../../assets/cards/Cards_data.js'

const TitleCards = ({title, category}) => {
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='titleCards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {card_data.map((cards, index) => (
          <div className='card' key={index}>
            <img src={cards.image} alt={cards.title} />
            <p>{cards.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitleCards
