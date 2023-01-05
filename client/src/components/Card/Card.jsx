import React from 'react';
import "../Card/Card.css";

const Card = ({ image, name, temperaments }) => {  
  return (
    <div className="main_container">
      <div className="image_container">
        <img className="img" src={`${image}`} alt={`imagen de: ${name}`} />
      </div>
      <h2>{name}</h2>
      <div className="temperaments_container">
        { 
          temperaments.map((temps) => <h3 key={temps+Math.random}>{temps}</h3>)
        }
      </div>

    </div>
  )
}

export default Card