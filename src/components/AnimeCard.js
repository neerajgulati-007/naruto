import React from 'react';

const AnimeCard = ({ image_url, title }) => (
  <div className="cardContainer">
    <div className="img-container">
      <img src={image_url} alt={"anime-img"} />
    </div>
    <div className="title-container">
      {title}
    </div>
  </div>
);

export default AnimeCard;