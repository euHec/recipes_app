import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import RecipeCard from './RecipeCard';
import { RecipesContext } from '../context/RecipesContext';
import FilterButton from './FilterButton';
import customFetch from '../helpers/customFetch';

const MAX_CARDS = 12;
const MAX_FILTERS = 5;

export default function Recipes() {
  const { recipes, toggleShowSearch } = useContext(RecipesContext);
  const [dataRecipes, setDataRecipes] = useState([]);
  const [dataFilters, setDataFilters] = useState([]);
  const [filteredDataRecipes, setFilteredDataRecipes] = useState([]);
  const history = useHistory();

  const { location: { pathname } } = history;

  const getEndPoint = (path) => {
    if (path === '/drinks') {
      return {
        recipes: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        filters: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        category: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
      };
    }
    return {
      recipes: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      filters: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      category: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    };
  };

  const fetchDrinksOrMeals = useCallback(async () => {
    const { recipes: ENDPOINT_RECIPES } = getEndPoint(pathname);
    const data = await customFetch(ENDPOINT_RECIPES);
    const valuesOfData = Object.values(data);
    setDataRecipes(valuesOfData[0]);
  }, [pathname]);

  const fetchFiltersDrinksOrMeals = useCallback(async () => {
    const { filters: ENDPOINT_FILTERS } = getEndPoint(pathname);
    const data = await customFetch(ENDPOINT_FILTERS);
    const valuesData = Object.values(data);
    setDataFilters(valuesData[0]);
  }, [pathname]);

  const clearCategory = () => setFilteredDataRecipes([]);

  const handleCategory = async (endpoint) => {
    const { category } = getEndPoint(pathname);
    const data = await customFetch(`${category}${endpoint}`);
    const valuesOfData = Object.values(data);
    setFilteredDataRecipes(valuesOfData[0]);
  };

  useEffect(() => {
    fetchFiltersDrinksOrMeals();
    fetchDrinksOrMeals();
  }, [fetchDrinksOrMeals, fetchFiltersDrinksOrMeals]);

  return (
    <>
      {
        !toggleShowSearch && (
          <div
            className="w-full pt-4 fixed top-28 left-0
            m-auto flex items-center justify-around bg-cyan-600 z-auto"
          >
            <div className="div-button">
              <button
                data-testid="All-category-filter"
                onClick={ clearCategory }
                className="button-filter"
              >
                <GiKnifeFork />
              </button>
              <p className="text-cyan-50">All</p>
            </div>
            {
              dataFilters
                .filter((filter, ind) => ind < MAX_FILTERS)
                .map((filter, ind) => (
                  <FilterButton
                    filter={ filter }
                    key={ ind }
                    indice={ ind }
                    handleCategory={ filteredDataRecipes.length
                      ? clearCategory : handleCategory }
                  />))
            }
          </div>
        )
      }
      <div
        className="w-full h-full m-auto flex
        justify-around overflow-y-scroll"
      >
        {
          !recipes.length
            && (
              <ul className="flex flex-wrap justify-around">
                {
                  (filteredDataRecipes.length ? filteredDataRecipes : dataRecipes)
                    .filter((filter, ind) => ind < MAX_CARDS)
                    .map((recipe, ind) => (<RecipeCard
                      recipe={ recipe }
                      index={ ind }
                      key={ ind }
                    />))
                }
              </ul>
            )
        }
      </div>
    </>
  );
}
