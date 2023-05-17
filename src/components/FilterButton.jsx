import PropTypes from 'prop-types';
import { GiCakeSlice, GiBull, GiChickenOven, GiGoat } from 'react-icons/gi';
import { SiCoffeescript } from 'react-icons/si';

export default function FilterButton({ indice, filter, handleCategory }) {
  const icons = {
    0: <GiBull />,
    1: <SiCoffeescript />,
    2: <GiChickenOven />,
    3: <GiCakeSlice />,
    4: <GiGoat />,
  };

  return (
    <div className="div-button">
      <button
        data-testid={ `${filter.strCategory}-category-filter` }
        onClick={ () => handleCategory(filter.strCategory) }
        className="button-filter"
      >
        { icons[indice]}
      </button>
      <p className="text-cyan-50">{ filter.strCategory }</p>
    </div>
  );
}

FilterButton.propTypes = {
  filter: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
  handleCategory: PropTypes.func.isRequired,
  indice: PropTypes.number.isRequired,
};
