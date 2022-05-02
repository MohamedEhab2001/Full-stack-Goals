import axios from "axios";

const API_REGISTER_URL = `${process.env.REACT_APP_API}/api/v1/users/register`;
const API_LOGIN_URL = `${process.env.REACT_APP_API}/api/v1/users/login`;
const API_AUTH_URL = `${process.env.REACT_APP_API}/api/v1/users/me`;

const Reg = async (userData) => {
  const response = await axios.post(API_REGISTER_URL, userData);
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data.user;
};

const Log = async (userData) => {
  const response = await axios.post(API_LOGIN_URL, userData);
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data.user;
};

const Auth = async (userData) => {
  const response = await axios.get(API_AUTH_URL, {
    headers: {
      authorization: `Bearer ${userData}`,
    },
  });
  const name = response.data.name;
  const email = response.data.email;
  return { name, email };
};

const authService = {
  Reg,
  Log,
  Auth,
};
export default authService;
