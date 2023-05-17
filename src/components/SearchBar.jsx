import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext, fetchAPI } from '../context/RecipesContext';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const { location, push } = useHistory();
  const { recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    if (recipes.length === 1) {
      const { pathname } = location;
      const { idMeal } = recipes[0];
      if (!idMeal) {
        const { idDrink } = recipes[0];
        push(`/recipes_app${pathname}/${idDrink}`);
      } else {
        push(`/recipes_app${pathname}/${idMeal}`);
      }
    }
  }, [location, push, recipes]);

  return (
    <form
      onSubmit={ (e) => e.preventDefault() }
      className="flex fixed p-2 top-28 w-full bg-cyan-600 left-0
        flex-col items-center justify-center"
    >
      <div className="w-full">
        <input
          data-testid="search-input"
          type="text"
          value={ searchValue }
          onChange={ ({ target }) => {
            if (searchType === 'first-letter' && target.value.length > 1) {
              return global.alert('Your search must have only 1 (one) character');
            }
            setSearchValue(target.value);
          } }
          className="rounded-xl w-full h-12 mb-2 pl-2"
          placeholder="O que deseja buscar?"
        />
      </div>
      <div className="w-full h-8 flex items-center justify-center">
        <label
          className="text-cyan-100
          flex flex-col items-center justify-around h-9 mt-3"
        >
          <input
            className="w-14 mx-4"
            type="radio"
            data-testid="ingredient-search-radio"
            name="search-bar"
            value="ingredients"
            onClick={ ({ target }) => {
              setSearchValue('');
              setSearchType(target.value);
            } }
          />
          Ingredientes
        </label>
        <label
          className="text-cyan-100
          flex flex-col items-center justify-center h-9 mt-3"
        >
          <input
            className="w-14 mx-4"
            type="radio"
            data-testid="name-search-radio"
            name="search-bar"
            value="name"
            onClick={ ({ target }) => {
              setSearchValue('');
              setSearchType(target.value);
            } }
          />
          Nome
        </label>
        <label
          className="text-cyan-100
          flex flex-col items-center justify-center h-9 mt-3"
        >
          <input
            className="w-14 mx-4"
            type="radio"
            data-testid="first-letter-search-radio"
            name="search-bar"
            value="first-letter"
            onClick={ ({ target }) => {
              setSearchValue('');
              setSearchType(target.value);
            } }
          />
          Primeira palavra
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        onClick={ async () => {
          const { pathname } = location;
          const data = await fetchAPI(
            pathname,
            searchType,
            searchValue,
          );
          if (!data) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
            return;
          }
          const maxCards = 12;
          const newData = data.slice(0, maxCards);
          setRecipes(newData);
        } }
        className="rounded-xl bg-cyan-300 w-full h-12 mt-4"
      >
        Buscar
      </button>
    </form>
  );
}
