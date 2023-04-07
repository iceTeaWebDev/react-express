import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { iRegister } from '../../interface/auth';
import { register } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  let navigate = useNavigate();
  const handleRegister = (values: iRegister, {setSubmitting, setErrors}: any) => {
    register(values)
    .then(response => {
      localStorage.setItem('user', JSON.stringify(response));
      navigate('/')
      setSubmitting(false);
    })
    .catch(error => {
      console.error(error.response.data);
      setSubmitting(false);
      setErrors({ email: 'Email exist' });
    });
  }
  return (
    <div className="container">
      <h1 className="my-5">Register</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
        })}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field className="form-control" type="text" name="name" />
              <ErrorMessage className="text-danger" name="name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field className="form-control" type="email" name="email" />
              <ErrorMessage className="text-danger" name="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field className="form-control" type="password" name="password" />
              <ErrorMessage className="text-danger" name="password" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field className="form-control" type="password" name="confirmPassword" />
              <ErrorMessage className="text-danger" name="confirmPassword" />
            </div>

            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;