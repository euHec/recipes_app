import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import formatRecipe, { addFavoriteRecipe,
  removeFavoriteRecipe } from '../helpers/formatRecipe';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const [item, setItem] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  const [linkCopied, setLinkCopied] = useState({ display: 'none' });
  const [isFavorite, setIsFavorite] = useState(false);
  const { location: { pathname }, push } = useHistory();

  const getEndPoint = (path, id) => {
    if (path.includes('drinks')) {
      return {
        endPoint: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        suggestion: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      };
    }
    return {
      endPoint: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      suggestion: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    };
  };
  const fetchAPI = useCallback(async () => {
    const id = pathname.split('/').pop();
    const { endPoint, suggestion } = getEndPoint(pathname, id);
    const requestDrinksOrMeals = await fetch(endPoint);
    const dataDrinksOrMeals = await requestDrinksOrMeals.json();
    const requestSugestions = await fetch(suggestion);
    const dataSugestions = await requestSugestions.json();
    if (pathname.includes('meals')) {
      setItem(dataDrinksOrMeals.meals);
      setSuggestions(dataSugestions.drinks);
    }
    if (pathname.includes('drinks')) {
      setItem(dataDrinksOrMeals.drinks);
      setSuggestions(dataSugestions.meals);
    }
  }, [pathname]);
  const validButton = useCallback(() => {
    const id = pathname.split('/').pop();
    const myObjDone = localStorage.getItem('doneRecipes') || [];
    if (myObjDone.length !== 0) {
      const doneRecipes = JSON.parse(myObjDone);
      const verify = doneRecipes.some((done) => Number(done.id) === Number(id));
      if (verify) setShowButton(!verify);
    }
    const myObjInProgress = localStorage.getItem('inProgressRecipes') || [];
    if (myObjInProgress.length !== 0) {
      const progress = JSON.parse(myObjInProgress);
      if (pathname.includes('meals')) {
        const verify = Object.keys(progress.meals)
          .some((recipe) => Number(recipe) === Number(id));
        if (verify) setInProgress(verify);
      } else {
        const verify = Object.keys(progress.drinks)
          .some((recipe) => Number(recipe) === Number(id));
        if (verify) setInProgress(verify);
      }
    }
  }, [pathname]);
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }, []);
  useEffect(() => {
    fetchAPI();
    validButton();
  }, [fetchAPI, validButton]);
  useEffect(() => {
    if (!item) return;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipe = formatRecipe(item, pathname);
    const hasFavorite = favoriteRecipes.some((favorite) => favorite.id === recipe.id);
    setIsFavorite(hasFavorite);
  }, [item, pathname]);
  const MAX = 6;
  const MAX_LENGHT = 13;
  return (
    <>
      <div>
        <button
          data-testid="share-btn"
          onClick={ () => {
            copy(window.location.href);
            setLinkCopied({ display: 'block' });
          } }
        >
          <img src={ shareIcon } alt="Share Button" />
        </button>
        {
          isFavorite
            ? (
              <button
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                onClick={ () => {
                  setIsFavorite(!isFavorite);
                  addFavoriteRecipe(item, pathname);
                } }
              >
                <img src={ blackHeartIcon } alt="Favorite Button" />
              </button>
            )
            : (
              <button
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                onClick={ () => {
                  setIsFavorite(!isFavorite);
                  removeFavoriteRecipe(item, pathname);
                } }
              >
                <img src={ whiteHeartIcon } alt="Favorite Button" />
              </button>
            )
        }
        <span style={ linkCopied }>Link copied!</span>
      </div>
      <section>
        <img
          data-testid="recipe-photo"
          src={ pathname?.includes('meals')
            ? item[0]?.strMealThumb
            : item[0]?.strDrinkThumb }
          alt={
            pathname?.includes('meals')
              ? item[0]?.strMeal
              : item[0]?.strDrinkThumb
          }
          width="325"
          height="200"
        />
        <h1 data-testid="recipe-title">
          {
            pathname?.includes('meals')
              ? item[0]?.strMeal
              : item[0]?.strDrink
          }
        </h1>
        <h1 data-testid="recipe-category">
          {
            pathname?.includes('meals')
              ? item[0]?.strCategory
              : item[0]?.strAlcoholic
          }
        </h1>
        {
          item.length !== 0 && (
            Object.keys(item[0]).map((key, index) => {
              if (key.includes('strIngredient') && item[0][key] !== null) {
                const ingredientIndex = parseInt(key.substring(MAX_LENGHT), 10) - 1;
                return (
                  <p
                    key={ index }
                    data-testid={
                      `${ingredientIndex}-ingredient-name-and-measure`
                    }
                  >
                    { `${item[0][key]} ${item[0][`strMeasure${ingredientIndex + 1}`]}` }
                  </p>
                );
              }
              return null;
            })
          )
        }
        <p data-testid="instructions">{ item[0]?.strInstructions}</p>
        {
          pathname.includes('meals') && (
            <iframe
              data-testid="video"
              width="325"
              height="200"
              src={
                `https://www.youtube.com/embed/${
                  item[0]?.strYoutube.split('=').pop()}`
              }
              title="Embedded YouTube video"
              allow="accelerometer; autoplay;
              sclipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        }
      </section>
      <section className="carrosel">
        {
          suggestions?.slice(0, MAX).map((suggestion, index) => (
            <div
              className="carrossel-card"
              data-testid={ `${index}-recommendation-card` }
              key={ index }
            >
              <img
                src={
                  pathname?.includes('meals')
                    ? suggestion.strDrinkThumb
                    : suggestion.strMealThumb
                }
                alt={
                  pathname?.includes('meals')
                    ? suggestion.strDrink
                    : suggestion.strMeal
                }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {
                  pathname?.includes('meals')
                    ? suggestion.strDrink
                    : suggestion.strMeal
                }
              </p>
            </div>))
        }
      </section>
      {
        showButton && (
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={
              pathname?.includes('meals')
                ? () => push(`/recipes_app/meals/${item[0].idMeal}/in-progress`)
                : () => push(`/recipes_app/drinks/${item[0].idDrink}/in-progress`)
            }
          >
            {
              inProgress ? 'Continue Recipe' : 'Start Recipe'
            }
          </button>
        )
      }
    </>
  );
}
