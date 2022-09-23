import { useRef, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoginUserMutation } from '../reducers/authApi';
import { setCredentials } from '../reducers/authSlice';

import { Button, Form } from 'react-bootstrap';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Logo from '../../../assets/images/logo.png';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

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
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));

              await loginUser({ data: values })
                .unwrap()
                .then(
                  (payload) => (
                    localStorage.setItem('access', payload.access),
                    dispatch(setCredentials({ ...payload })),
                    navigate('/')
                  )
                )
                .catch(() =>
                  console.log('Provided email or password is incorrect')
                );
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email()
                .required('Email field cannot be empty'),
              password: Yup.string().required('No password provided'),
            })}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control
                    placeholder='Email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={userRef}
                    className={
                      errors.email && touched.email
                        ? 'error c-input-h'
                        : 'text-input c-input-h'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className='input-feedback'>{errors.email}</div>
                  )}
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label></Form.Label>
                  <Form.Control
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? 'error c-input-h'
                        : 'text-input c-input-h'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className='input-feedback'>{errors.password}</div>
                  )}
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Button
                    className='my-3 btn-custom'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
