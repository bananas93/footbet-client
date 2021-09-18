import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getInfo = (user, tournament) => {
  const token = getCookie('JWToken');
  return axios.get(`https://footbet.site/api/users/${user}/${tournament}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
