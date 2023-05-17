import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, index }) {
  return (
    <li
      data-testid={ `${index}-recipe-card` }
    >
      <Link
        to={
          recipe.idDrink
            ? `/recipes_app/drinks/${recipe.idDrink}`
            : `/recipes_app/meals/${recipe.idMeal}`
        }
        className="no-underline"
      >
        <div className="bg-white p-0 w-36 rounded-xl">
          <img
            src={ recipe.strDrinkThumb ? recipe.strDrinkThumb : recipe.strMealThumb }
            alt={ recipe.strDrinkThumb ? recipe.strDrinkThumb : recipe.strMealThumb }
            data-testid={ `${index}-card-img` }
            className="w-full rounded-t-xl"
          />
          <h4
            data-testid={ `${index}-card-name` }
            className="text-center text-base text-cyan-800"
          >
            {recipe.strDrink ? recipe.strDrink : recipe.strMeal}
          </h4>
        </div>
      </Link>
    </li>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
