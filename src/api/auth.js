import axios from 'axios';
import { getJWToken } from '../helpers/authHelper';

export const login = async ({ email, password }) => await axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  url: `${process.env.REACT_APP_LOCAL_API}/users/login`,
  data: { email, password },
});

export const register = async ({ email, name, password }) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  url: `${process.env.REACT_APP_LOCAL_API}/users/register`,
  data: { email, name, password },
});

export const getUserDetails = async () => {
  const token = getJWToken();
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/users/me`, {
    headers: {
      Authorization: token,
    },
  });
};

export const updateUserDetails = async ({ email, name, password }) => {
  const token = getJWToken();
  return await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    url: `${process.env.REACT_APP_LOCAL_API}/users/me`,
    data: { email, name, password },
  });
};
