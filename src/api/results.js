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
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/results/${tournament}/tour/${tour}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getResultsChart = async (tournament) => {
  const token = getCookie('JWToken');
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/results/${tournament}/matches`, {
    headers: {
      Authorization: token,
    },
  });
};
