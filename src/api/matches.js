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
