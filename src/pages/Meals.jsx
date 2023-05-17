import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

export default function Meals() {
  const { toggleShowSearch } = useContext(RecipesContext);
  return (
    <>
      <Header pageTitle="Meals" showSearchIcon />
      <div className="mt-32">
        {
          toggleShowSearch
            && <SearchBar />
        }
        <Recipes />
        <Footer />
      </div>
    </>
  );
}
