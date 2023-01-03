import React from 'react'
import { Link } from "react-router-dom";
import './LandingPage.css';

const LandingPage = props => {
  return (
    <div className= "main_container_landing">
      <div className= "main_left_container">
        <h1 className="titleApp" >Henry Dogs</h1>
        <h3>Aplicación sobre razas de Perros</h3>
        <div className="left_paragraph">
          <p>Aquí puede obtener información sobre múltiples nombres de razas de perros y detalles como su tamaño, esperanza de vida y temperamento, y también puede agregar nuevas razas de perros.</p>
        </div>
        
        <Link to="/home">
            <button className="button_home">Go home</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage