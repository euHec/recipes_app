import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { push } = useHistory();
  return (
    <>
      <Header pageTitle="Profile" />
      <p data-testid="profile-email">{user?.email}</p>
      <button
        data-testid="profile-done-btn"
        onClick={ () => { push('/done-recipes'); } }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => { push('/favorite-recipes'); } }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => {
          push('/');
          localStorage.clear();
        } }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}
