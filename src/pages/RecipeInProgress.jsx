import { useCallback, useEffect, useState } from 'react';
import customFetch from '../helpers/customFetch';
import RecipeInProgressCard from '../components/RecipeInProgressCard';

export default function RecipeInProgress({ match }) {
  const [recipe, setRecipe] = useState([]);

  const getEndPoint = (path, id) => {
    if (path.includes('drinks')) {
      return {
        endPoint: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      };
    }
    return {
      endPoint: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    };
  };

  const doFetch = useCallback(async () => {
    const { endPoint } = getEndPoint(match.path, match.params.id);
    const data = await customFetch(endPoint);
    const dataValue = Object.values(data);
    setRecipe(dataValue[0]);
  }, [match.params.id, match.path]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    recipe.map((recip, ind) => <RecipeInProgressCard key={ ind } recipe={ recip } />)
  );
}
