import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../reducers/authApi';
import { setUser } from '../reducers/authSlice';
import Logo from '../../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { error }] = authApi.useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const username = useRef(null);
  const password = useRef(null);
  const userLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    let data = {
      username: username.current.value,
      password: password.current.value,
    };
    let userData = await loginUser(data);
    if (!userData?.error && userData.data?.token) {
      let token = userData.data.token;
      if (token) {
        dispatch(setUser({ token }));
        localStorage.setItem('token', token);
        localStorage.setItem('username', data.username);
        navigate('/home');
      }
    } else if (userData.error.originalStatus === 404) {
      setErrorMessage('Internal Server Error');
    }
  };

  return (
    <div className='admin__login__wrapper'>
      <div className='admin__login--content'>
        <div className='login__holder'>
          <div className='image__box'>
            <img className='img-fluid' src={Logo} />
          </div>
          <div className='header__box'>
            <h5>Log In</h5>
            <p>Welcome to Authtication Example</p>
          </div>
          <form onSubmit={(event) => userLogin(event)}>
            <div
              className={`error-messsage text-danger ${
                error || errorMessage ? 'd-block mb-2' : 'd-none'
              }`}
            >
              {errorMessage !== null
                ? errorMessage
                : error?.data.non_field_errors?.[0]}
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control mb-4'
                id='loginEmail'
                placeholder='Email'
                ref={username}
                required
              />
            </div>
            <div className='form-group'>
              <div className='has__icon-end'>
                <input
                  type={`${showPassword ? 'text' : 'password'}`}
                  className='form-control toogle_password mb-2'
                  id='loginPassowrd'
                  placeholder='Password'
                  ref={password}
                  required
                />

                <span>
                  {showPassword ? (
                    <FontAwesomeIcon
                      className='text-muted toogle-password'
                      icon={solid('eye-slash')}
                      onClick={() =>
                        password.current.value.length > 0 &&
                        setShowPassword(false)
                      }
                    />
                  ) : (
                    <FontAwesomeIcon
                      className='text-muted toogle-password'
                      icon={solid('eye')}
                      onClick={() =>
                        password.current.value.length > 0 &&
                        setShowPassword(true)
                      }
                    />
                  )}
                </span>
              </div>
            </div>
            <div className='login__footer d-flex flex-column'>
              <button type='submit' className='btn btn-primary mt-3'>
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
