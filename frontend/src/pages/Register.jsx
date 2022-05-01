import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const onChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="ENTER YOUR NAME"
              autoComplete="off"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="ENTER YOUR EMAIL"
              autoComplete="off"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="ENTER YOUR PASSWORD"
              autoComplete="off"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="confirm"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="PLEASE CONFIRM YOUR PASSWORD"
              autoComplete="off"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
