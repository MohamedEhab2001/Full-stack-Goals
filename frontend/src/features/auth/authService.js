import axios from "axios";

const API_REGISTER_URL = `${process.env.REACT_APP_API}/api/v1/users/register`;
const API_LOGIN_URL = `${process.env.REACT_APP_API}/api/v1/users/login`;

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

const authService = {
  Reg,
  Log,
};
export default authService;
