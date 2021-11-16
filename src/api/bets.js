import axios from 'axios';
import { getJWToken } from '../helpers/authHelper';

export const addBet = async (data) => {
  const token = getJWToken();
  if (!token) return false;
  return await axios.post(`${process.env.REACT_APP_LOCAL_API}/bets`, data, {
    headers: { Authorization: token },
  });
};

export const getMyBets = async (tournament) => {
  const token = getJWToken();
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/bets/${tournament}`, {
    headers: {
      Authorization: token,
    },
  });
};
