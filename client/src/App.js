import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from './components/Home/Home';
import AddDog from './components/AddDog/AddDog';
import DogDetails from './components/DogDetails/DogDetails';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/dog">
            <AddDog />
          </Route>
          <Route exact path="/dog-detail/:id">
            <DogDetails />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
