import axios from "axios";

const API_GOAL_URL = `${process.env.REACT_APP_API}/api/v1/goals`;

const Create = async (token, text) => {
  const response = await axios.post(
    API_GOAL_URL,
    { text },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const Get = async (token) => {
  const response = await axios.get(API_GOAL_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const goalServices = {
  Create,
  Get,
};
export default goalServices;
