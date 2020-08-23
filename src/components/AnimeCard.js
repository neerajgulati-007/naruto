import React from 'react';

const AnimeCard = ({ image_url, title }) => (
    <div>
        <img src={image_url} />
        <div>{title}</div>
    </div>
);

export default AnimeCard;