import { useCallback, useEffect, useMemo, useState } from 'react';

// const MAX_INGREDIENTS = 20;

export default function ChecklistIngredients({ recipe, setIsDisable }) {
  const [checkedIng, setCheckedIng] = useState({});
  const [pathname, setPathname] = useState('');

  const listOfIngredients = Object.keys(recipe)
    .map((rec) => {
      if (rec.includes('strIngredient') && recipe[rec] !== '') return recipe[rec];
      return undefined;
    }).filter((ingredient) => ingredient !== undefined);

  useMemo(() => listOfIngredients, [listOfIngredients]);

  const handleChange = ({ target }) => {
    setCheckedIng((prevState) => ({ ...prevState, [target.name]: target.checked }));
  };

  const checkIfHaveOnLocalStorage = useCallback(() => {
    const path = window.location.pathname.split('/')[1];
    const invertPath = path === 'drinks' ? 'meals' : 'drinks';
    setPathname(path);
    const idOfRecipe = recipe.idMeal ? recipe.idMeal : recipe.idDrink;
    const inProgressFromLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressFromLS) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ [path]: { [idOfRecipe]: {} }, [invertPath]: {} }),
      );
      return;
    }
    const { [path]: drinkOrMeal } = inProgressFromLS;
    setCheckedIng({ ...drinkOrMeal[idOfRecipe] });
  }, [recipe.idDrink, recipe.idMeal]);

  useEffect(() => {
    checkIfHaveOnLocalStorage();
  }, [checkIfHaveOnLocalStorage]);

  const updateLocalStorage = useCallback(() => {
    const inProgressFromLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const idOfRecipe = recipe.idMeal ? recipe.idMeal : recipe.idDrink;
    const toSaveOnLS = {
      ...inProgressFromLS,
      [pathname]: {
        ...inProgressFromLS[pathname],
        [idOfRecipe]: {
          ...checkedIng,
        },
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(toSaveOnLS));
  }, [checkedIng, pathname, recipe.idDrink, recipe.idMeal]);

  const checkButtonFinish = useCallback(() => {
    const verifyAllChecked = Object.values(checkedIng).every((ing) => ing);
    const sizeOfCheckedIng = Object.values(checkedIng).length;
    const sizeOfIngredients = listOfIngredients.filter((ing) => ing).length;
    setIsDisable(verifyAllChecked && sizeOfCheckedIng === sizeOfIngredients);
  }, [checkedIng, listOfIngredients, setIsDisable]);

  useEffect(() => {
    checkButtonFinish();
    updateLocalStorage();
  }, [checkButtonFinish, checkedIng, updateLocalStorage]);

  return (
    listOfIngredients
      .filter((ingredient) => ingredient)
      .map((ingredient, ind) => (
        <li key={ ind }>
          <label
            className={ checkedIng[ingredient] ? 'ingredientDone' : '' }
            data-testid={ `${ind}-ingredient-step` }
          >
            {ingredient}
            <input
              name={ ingredient }
              checked={ !!checkedIng[ingredient] }
              onChange={ handleChange }
              type="checkbox"
              data-testid={ `${ind}-ingredient-checkbox` }
            />
          </label>
        </li>
      ))
  );
}
