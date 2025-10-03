import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import card_data from '../../assets/cards/Cards_data.js'

const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTk5NmQ0NzA0YTI4NmY1NzVmODA0ZmI4MmE1YjE3MCIsIm5iZiI6MTc1OTQ5ODU2MC44MDcwMDAyLCJzdWIiOiI2OGRmZDE0MDMzYjgxZmQ5NDdlZTRmYTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.l45FslD_VuKXrKIe5z-g_Jh54i9XaIawIMeUMt_5LHk'
  }
};



  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const genreMapping = {
      action: '28',
      top_rated: 'top_rated',
      popular: 'popular',
      now_playing: 'now_playing',
    };

    const endpoint = genreMapping[category]
      ? genreMapping[category] === '28'
        ? `https://api.themoviedb.org/3/discover/movie?with_genres=${genreMapping[category]}&language=en-US&page=1`
        : `https://api.themoviedb.org/3/movie/${genreMapping[category]}?language=en-US&page=1`
      : `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;

    fetch(endpoint, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results);
        } else {
          console.error('No results found for category:', category);
        }
      })
      .catch((err) => console.error('Error fetching data:', err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  return (
    <div className='titleCards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((cards, index) => {
          return (
            <div className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/${cards.backdrop_path}`} alt={cards.title} />
              <p>{cards.original_title}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default TitleCards
