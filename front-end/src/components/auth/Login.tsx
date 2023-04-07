import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { iLogin } from '../../interface/auth';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const LoginForm: React.FC = () => {
  let navigate = useNavigate();
  const handleLogin = (values: iLogin, { setSubmitting, setErrors }: any) => {
    login(values)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response));
        navigate('/')
        setSubmitting(false);
      })
      .catch(error => {
        console.error(error.response.data);
        setSubmitting(false);
        setErrors({ password: 'Incorrect email or password' });
      });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;