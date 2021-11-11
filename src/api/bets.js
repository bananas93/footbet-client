import axios from 'axios';
import { getJWToken } from '../helpers/authHelper';

export const addBet = (data) => {
  const token = getJWToken();
  if (!token) return false;
  return axios.post(`${process.env.REACT_APP_LOCAL_API}/bets`, data,
    {
      headers: { Authorization: token },
    })
    .then((res) => ({
      status: res.status,
      data: res.data,
    }))
    .catch((err) => err.response);
};

export const getMyBets = (tournament) => {
  const token = getJWToken();
  return axios.get(`${process.env.REACT_APP_LOCAL_API}/bets/${tournament}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
