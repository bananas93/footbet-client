import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getMatches = async (tournament) => {
  const token = getCookie('JWToken');
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/matches/${tournament}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const updateMatch = async (id, status, homeGoals, awayGoals) => {
  const token = getCookie('JWToken');
  return await axios.patch(`${process.env.REACT_APP_LOCAL_API}/matches/${id}`, { status, homeGoals, awayGoals }, {
    headers: {
      Authorization: token,
    },
  });
};
