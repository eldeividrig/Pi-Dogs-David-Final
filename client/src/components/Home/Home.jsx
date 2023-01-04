import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getTemperaments,
  filterByTemperament,
  orderByName,
  orderByWeight,
} from "../../redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("");
  const dogsxPage = 8;
  const lastIndex = currentPage * dogsxPage;
  const firstIndex = lastIndex - dogsxPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
  };

  return (
    <>

      <header className="header">
        <div className="header_container_left">
          <Link to="/">
            <div className="logo"></div>
          </Link>
          <div className="header_left">
            <SearchBar />
            <div className="container_filters">
              <select onChange={handleOrderByName}>
                <option value={'default'}>
                  Orden Alfabetico
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              <select onChange={handleOrderByWeight}>
                <option value={'default'}>
                  Filtrar por peso
                </option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
              </select>
              <select onChange={handleFilterByTemperament}>
                <option value={'default'}>
                  Temperamentos
                </option>
                <option value="Todos">Todos</option>
                {allTemperaments?.map((temp) => (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="header_right">
          <Link to="/dog">
            <button className="button_add_dog">Crear Raza</button>
          </Link>
        </div>
      </header>

      <hr />

      <div className="main_container_home">
        <div className="container_cards">
          {currentDogs?.map((el) => {
            return (
              <div className="container_card" key={el.id}>
                <Link to={"/dog-detail/" + el.id}>
                  {
                    <Card key={el.id} image={el.image} name={el.name} temperaments={el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments} />
                    
                  }
                </Link>
              </div>
            )
          })}
        </div>
        <div className="pagination">
          <Paginate dogsxPage={dogsxPage} allDogs={allDogs.length} paginated={paginated} />
        </div>
      </div>

    </>
  );
};

export default Home;
