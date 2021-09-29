import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getResults = (tournament) => {
  const token = getCookie('JWToken');
  return axios.get(`https://footbet.site/api/results/${tournament}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};

export const getResultsByTour = (tournament, tour) => {
  const token = getCookie('JWToken');
  return axios.get(`https://footbet.site/api/results/${tournament}/${tour}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
