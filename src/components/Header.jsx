import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { BsSearch, BsPerson } from 'react-icons/bs';
import profileIconSvg from '../images/profileIcon.svg';
import searchIconSvg from '../images/searchIcon.svg';
import { RecipesContext } from '../context/RecipesContext';
import logo from '../images/logo Recipes App.svg';

export default function Header() {
  const { setToggleShowSearch } = useContext(RecipesContext);
  const history = useHistory();
  return (
    <header
      className="w-full h-28 flex
      justify-around border-solid
      border-b border-black fixed bg-cyan-600 top-0 left-0"
    >
      <button
        data-testid="profile-top-btn"
        onClick={ () => { history.push('/profile'); } }
        src={ profileIconSvg }
        className="bg-transparent w-24 flex justify-center items-center"
      >
        <BsPerson className="text-5xl text-cyan-50" />
      </button>
      <div className="flex w-24">
        <img className="w-full" src={ logo } alt="logo app" />
      </div>
      <button
        data-testid="search-top-btn"
        src={ searchIconSvg }
        onClick={ () => { setToggleShowSearch((prevState) => !prevState); } }
        className="bg-transparent w-24 flex justify-center items-center"
      >
        <BsSearch className="text-4xl text-cyan-50" />
      </button>
    </header>
  );
}
