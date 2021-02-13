import React from 'react';
import { useFormik } from 'formik';
import Axios from "axios";

const Login = ({setToken}) => {
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        onSubmit: values => {
            Axios.post("https://castaway-304704.uc.r.appspot.com/api/login/",{username:values.username, password:values.password}).then((res) => {
                setToken(res.data.token);
                localStorage.setItem('token', res.data.token);
            });
        },
      });

    return (
      <>
        <form onSubmit={formik.handleSubmit}>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
  
        <button type="submit">Submit</button>
      </form>
      Don't have an account? <a href="/signup">Sign up here</a>
      </>
    );
  };

  export default Login;