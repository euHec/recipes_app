import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo Recipes App.svg'

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const { push } = useHistory();

  const onInputChange = ({ target: { id, value } }) => {
    if (id === 'email') {
      setEmailInput(value);
    } else {
      setPassInput(value);
    }
  };

  // validação de login.
  // ideia de regex de verificação de email retirado do site:
  // https://www.w3resource.com/javascript/form/email-validation.php
  useEffect(() => {
    const SIX = 6;
    const emailIsValid = emailInput.toLowerCase()
      .match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/);

    if (passInput.length > SIX && emailIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [emailInput, passInput]);

  return (
    <section
      className="container flex flex-col h-full w-full justify-center items-center m-auto"
    >
      <img src={ logo } alt="logo app" />
      <div
        className="md:w-3/5 w-full h-2/4 flex
        flex-col items-center justify-center
        bg-cyan-900 rounded-xl shadow-lg
        shadow-cyan-500/50"
      >
        <h1
          className="text-cyan-300 tracking-wide uppercase font-bold"
        >
          App de Receitas
        </h1>
        <form
          className="
          flex flex-col w-10/12 h-56
          justify-center items-center
           mx-auto"
        >
          <input
            type="email"
            placeholder="Email"
            onChange={ onInputChange }
            value={ emailInput }
            id="email"
            data-testid="email-input"
            className="input-login"
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={ onInputChange }
            value={ passInput }
            data-testid="password-input"
            className="input-login"
          />
          <input
            type="submit"
            onClick={ (e) => {
              e.preventDefault();
              localStorage.setItem('mealsToken', 1);
              localStorage.setItem('cocktailsToken', 1);
              localStorage.setItem('user', JSON.stringify({ email: emailInput }));
              push('/meals');
            } }
            disabled={ isDisabled }
            value="Login"
            data-testid="login-submit-btn"
            className="disabled:bg-cyan-950 input-login
            cursor-pointer bg-cyan-300 text-cyan-50 uppercase"
          />
        </form>
      </div>
    </section>
  );
}
