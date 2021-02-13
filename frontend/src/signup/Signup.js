import React from 'react';
import { useFormik } from 'formik';
import Axios from "axios";

const Signup = ({setToken}) => {
    const formik = useFormik({
        initialValues: {
          username: '',
          password1: '',
          password2: '',
          email: '',
        },
        onSubmit: values => {
            Axios.post("https://castaway-304704.uc.r.appspot.com/api/signup/",
              {username:values.username,
              password1:values.password1,
              password2:values.password2,
              email:values.email
            }).then((res) => {})
        },
      });

    return (
        <form onSubmit={formik.handleSubmit}>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="password1">Password</label>
        <input
          id="password1"
          name="password1"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password1}
        />

        <label htmlFor="password2">Confirm Password</label>
        <input
          id="password2"
          name="password2"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password2}
        />

        <button type="submit">Submit</button>
      </form>
    );
  };

  export default Signup;