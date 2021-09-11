import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getMatches = (tournament) => {
  const token = getCookie('JWToken');
  return axios.get(`https://footbet.herokuapp.com/api/matches/${tournament}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
