import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, reset, SelectAuth } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } =
    useSelector(SelectAuth);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isLoading, message, isSuccess, navigate, dispatch]);
  const onChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.email == "" || formData.password == "") {
      toast.error("Cant leave any textfield blank");
    } else {
      const UserData = {
        email: formData.email,
        password: formData.password,
      };
      dispatch(loginUser(UserData));
    }
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
