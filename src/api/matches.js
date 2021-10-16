import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getMatches = (tournament) => {
  const token = getCookie('JWToken');
  return axios.get(`${process.env.REACT_APP_LOCAL_API}/matches/${tournament}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
