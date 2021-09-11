import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getResults = (tournament) => {
  const token = getCookie('JWToken');
  return axios.get(`https://footbet.herokuapp.com/api/results/${tournament}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
