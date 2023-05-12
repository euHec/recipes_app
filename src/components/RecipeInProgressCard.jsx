import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import shareIconSvg from '../images/shareIcon.svg';
import favIconSvgWhite from '../images/whiteHeartIcon.svg';
import favIconSvgBlack from '../images/blackHeartIcon.svg';
import ChecklistIngredients from './ChecklistIngredients';

export default function RecipeInProgressCard({ recipe }) {
  const [isCopied, setIsCopied] = useState();
  const [isFavRecipe, setIsFavRecipe] = useState();

  const handleClickCopy = () => {
    const { location: { protocol, host } } = window;
    const type = recipe.idDrink ? 'drink' : 'meal';
    const id = recipe.idDrink ? recipe.idDrink : recipe.idMeal;
    navigator.clipboard.writeText(`${protocol}//${host}/${type}s/${id}`);
    setIsCopied(true);
  };

  const handleClickFav = () => {
    const fromLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const id = recipe.idDrink ? recipe.idDrink : recipe.idMeal;
    const toSaveOnLS = {
      id,
      type: recipe.idDrink ? 'drink' : 'meal',
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strDrink ? recipe.strDrink : recipe.strMeal,
      image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
    };

    localStorage.setItem('favoriteRecipes', JSON.stringify([...fromLS, toSaveOnLS]));
    setIsFavRecipe(true);
  };

  const handleClickUnfav = () => {
    const fromLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const id = recipe.idDrink ? recipe.idDrink : recipe.idMeal;
    const verifyIndex = fromLS.findIndex((recip) => id === recip.id);
    fromLS.splice(verifyIndex, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fromLS));
    setIsFavRecipe(false);
  };

  const checkIfIsFav = () => {
    const fromLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const id = recipe.idDrink ? recipe.idDrink : recipe.idMeal;
    const verifyFav = fromLS.some((recip) => id === recip.id);
    setIsFavRecipe(verifyFav);
  };

  useEffect(() => {
    const fromLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!fromLS) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    checkIfIsFav();
  }, []);

  return (
    <section>
      <img
        style={ { width: '300px' } }
        src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
        data-testid="recipe-photo"
      />

      <p
        data-testid="recipe-title"
      >
        {recipe.strMeal ? recipe.strMeal : recipe.strDrink}
      </p>

      <p data-testid="recipe-category">{ recipe.strCategory }</p>

      <button
        data-testid="share-btn"
        onClick={ handleClickCopy }
        src={ shareIconSvg }
      >
        <img src={ shareIconSvg } alt="" />
      </button>

      {isCopied && <span>Link copied!</span> }

      <button
        data-testid="favorite-btn"
        onClick={ isFavRecipe ? handleClickUnfav : handleClickFav }
        src={ isFavRecipe ? favIconSvgBlack : favIconSvgWhite }
      >
        <img src={ isFavRecipe ? favIconSvgBlack : favIconSvgWhite } alt="" />
      </button>

      <p data-testid="instructions">{recipe.strInstructions}</p>

      <ul>
        <ChecklistIngredients recipe={ recipe } />
      </ul>

      <button data-testid="finish-recipe-btn">
        Finalizar receita
      </button>

    </section>
  );
}

RecipeInProgressCard.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
};
