import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIconSvg from '../images/shareIcon.svg';

export default function DoneRecipeCard({ recipe, index }) {
  const [isCopied, setIsCopied] = useState(false);

  const {
    image, category, nationality, name, doneDate, tags, alcoholicOrNot, id, type,
  } = recipe;

  const handleClickCopy = () => {
    const { location: { protocol, host } } = window;
    navigator.clipboard.writeText(`${protocol}//${host}/${type}s/${id}`);
    setIsCopied(true);
  };

  return (
    <li>
      <Link to={ `/recipes_app/${type}s/${id}` }>
        <img
          style={ { width: '300px' } }
          src={ image }
          alt={ image }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category} ${alcoholicOrNot || ''}`}
      </p>
      <Link
        to={ `/recipes_app/${type}s/${id}` }
        data-testid={ `${index}-horizontal-name` }
      >
        {name}
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <ul>
        {
          !tags ? [] : tags
            .map((tag, ind) => (
              <li
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ ind }
              >
                {tag}
              </li>
            ))
        }
      </ul>
      <button
        src={ shareIconSvg }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleClickCopy }
      >
        <img src={ shareIconSvg } alt="shareIcon" />
      </button>
      {
        isCopied && <span>Link copied!</span>
      }
    </li>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    nationality: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
