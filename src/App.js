import React, { useMemo, useState } from 'react';
import './index.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import { RecipesContext } from './context/RecipesContext';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  const [toggleShowSearch, setToggleShowSearch] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const ContextValue = useMemo(() => ({
    recipes,
    setRecipes,
    toggleShowSearch,
    setToggleShowSearch }), [recipes, toggleShowSearch]);
  return (
    <Switch>
      <RecipesContext.Provider value={ ContextValue }>
        <Route
          exact
          path="/recipes_app/"
          component={ Login }
        />
        <Route
          exact
          path="/recipes_app/meals"
          component={ Meals }
        />
        <Route
          exact
          path="/recipes_app/meals/:id"
          component={ RecipeDetails }
        />
        <Route
          exact
          path="/recipes_app/meals/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/recipes_app/drinks"
          component={ Drinks }
        />
        <Route
          exact
          path="/recipes_app/drinks/:id"
          component={ RecipeDetails }
        />
        <Route
          exact
          path="/recipes_app/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/recipes_app/profile"
          component={ Profile }
        />
        <Route
          exact
          path="/recipes_app/done-recipes"
          component={ DoneRecipes }
        />
        <Route
          exact
          path="/recipes_app/favorite-recipes"
          component={ FavoriteRecipes }
        />
      </RecipesContext.Provider>
    </Switch>
  );
}

export default App;
