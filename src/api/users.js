import axios from 'axios';
import { getJWToken } from '../helpers/authHelper';

export const getInfo = async (user, tournament, tour) => {
  const token = getJWToken('JWToken');
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/users/${user}/${tournament}/${tour}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getMyInfo = async () => {
  const token = getJWToken('JWToken');
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/users/me`, {
    headers: {
      Authorization: token,
    },
  });
};
