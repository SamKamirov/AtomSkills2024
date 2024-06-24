import React from 'react';
import { useRef } from 'react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction, registryAction } from '../../store/app-data';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Registry = () => {
  const navigate = useNavigate();
  const loginRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);


  const handleSubmit = (e) => {
    const username = loginRef.current.value;
    const password = passwordRef.current.value;

    dispatch(registryAction({ username, password, role: 'admin' }));
    e.preventDefault();
  };

  useEffect(() => {
    if (user) {
      navigate('dashboard')
    }
  }, [user, navigate])

  return (
    <Fragment>
      <title>Регистрация</title>
      <div className="login-card">
        <h2 className="login-title">Регистрация</h2>
        <div className="unit-card__wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              name="login-input"
              placeholder="Логин или email"
              type="text"
              ref={loginRef}
            />
            <input
              className="login-input"
              name="login-input"
              placeholder="Пароль"
              type="text"
              ref={passwordRef}
            />
            <div className="login-enter">
              <button type="submit" className="login-enter-button">
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
