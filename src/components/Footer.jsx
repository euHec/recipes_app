import { useHistory } from 'react-router-dom';
import { BiDrink } from 'react-icons/bi';
import { GiKnifeFork } from 'react-icons/gi';

export default function Footer() {
  const { push } = useHistory();

  return (
    <footer
      data-testid="footer"
      className="w-full h-16 fixed bottom-0
      left-0 bg-cyan-200 flex justify-around
      items-center rounded-t-full"
    >
      <button onClick={ () => push('/recipes_app/drinks') }>
        <BiDrink
          data-testid="drinks-bottom-btn"
          className="text-5xl text-cyan-800 "
        />
      </button>
      <button onClick={ () => push('/recipes_app/meals') }>
        <GiKnifeFork
          data-testid="meals-bottom-btn"
          className="text-5xl text-cyan-800 "
        />
      </button>
    </footer>
  );
}
