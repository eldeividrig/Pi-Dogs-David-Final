import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../redux/actions/";
import "../SearchBar/SearchBar.css";

const SearchBar = ({ paginated }) => {
  const dispatch = useDispatch();
  const [searchDog, setSearchDog] = useState("");

  const handleInput = (e) => {
    e.preventDefault()
    setSearchDog(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();    
    dispatch(getBreed(searchDog));
    let number = 1;
    paginated(number);    
  }
  

  return (
    <div className="searchbar_container">
      <input className="searchbar" type="text" onChange={handleInput} placeholder="Search..." />
      <button className="searchbar_button" type="submit" onClick={handleSubmit} >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  )
}

export default SearchBar