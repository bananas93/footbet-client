import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getResults = async (tournament) => {
  const token = getCookie('JWToken');
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/results/${tournament}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getResultsByTour = async (tournament, tour) => {
  const token = getCookie('JWToken');
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/results/${tournament}/${tour}`, {
    headers: {
      Authorization: token,
    },
  });
};
