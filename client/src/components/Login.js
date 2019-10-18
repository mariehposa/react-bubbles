import React from "react";
import { Formik, Field, Form } from 'formik';

const initialValues = {
  username: '',
  password: ''
}

export default function Login () {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <Formik 
        render = { props => {
          return (
            <Form>
                <Field name="username" placeholder="Enter username" type="text"/>
                <Field name="password" placeholder="Enter password" type="text"/>
                <button type="submit">Login</button>
            </Form>
          )
        }}
      />
    </>
  );
};

export default Login;
