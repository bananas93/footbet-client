import axios from 'axios';
import { getJWToken } from '../helpers/authHelper';

export const getInfo = (user, tournament, tour) => {
  const token = getJWToken('JWToken');
  return axios.get(`${process.env.REACT_APP_LOCAL_API}/users/${user}/${tournament}/${tour}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};

export const getMyInfo = () => {
  const token = getJWToken('JWToken');
  return axios.get(`${process.env.REACT_APP_LOCAL_API}/users/me`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
