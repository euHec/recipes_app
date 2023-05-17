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
      {
        toggleShowSearch
          && <SearchBar />
      }
      <div className=" left-0 p-2 fixed top-72 w-full h-3/5">
        <Recipes />
      </div>
      <Footer />
    </>
  );
}
