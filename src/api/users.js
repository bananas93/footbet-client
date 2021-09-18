import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getInfo = (user, tournament) => {
  const token = getCookie('JWToken');
  return axios.get(`http://localhost:3000/api/users/${user}/${tournament}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
