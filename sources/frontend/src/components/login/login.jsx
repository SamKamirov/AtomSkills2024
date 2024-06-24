import React, { useState } from 'react';
import { useRef } from 'react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { loginAction } from '../../store/app-data';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Loading } from '../loading';
import { getToken } from '../../utils';

export const Login = () => {
  const roleRef = useRef();
  const loading = useSelector(state => state.app.loading);
  const [loginState, setLoginState] = useState({
    username: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);


  const handleSubmit = (e) => {
    const username = loginState.username;
    const password = loginState.password;
    const role = roleRef.current.value;

    e.preventDefault();
    dispatch(loginAction({ username, password, role }));
    navigate('dashboard')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginState({
      ...loginState,
      [name]: value
    })

  };

  useEffect(() => {
    if (user) {
      navigate('dashboard')
    }
  }, [user]);

  if (loading) {
    return <Loading />
  };

  return (
    <Fragment>
      <title>Login</title>
      <div className="login-card">
        <h2 className="login-title">Авторизация</h2>
        <div className="unit-card__wrapper">
          <form className='user-select'>
            <select ref={roleRef} name='role' id='role' defaultValue={'teacher'}>
              <option value={'teacher'} >Наставник</option>
              <option value={'student'} >Студент</option>
            </select>
          </form>
          <form className="login-form" onSubmit={handleSubmit} onChange={handleChange}>
            <input
              className="login-input"
              name="username"
              id="username"
              placeholder="Логин или email"
              type="text"
            />
            <input
              className="login-input"
              name="password"
              id="password"
              placeholder="Пароль"
              type="text"
            />
            <div className="login-enter">
              <button type="submit" className="login-enter-button">
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
