import React from "react";
import "../Paginate/Paginate.css";

const Paginate = ({ dogsxPage, allDogs, paginated }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allDogs / dogsxPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="nav_container">
            <ul className="ul_container">
                { pageNumbers && pageNumbers.map(number => (
                    <li className="li_container" onClick={() => paginated(number)} key={number}>
                         <button type="button">{number}</button> 
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paginate