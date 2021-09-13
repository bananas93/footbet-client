import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getTournaments = () => {
  const token = getCookie('JWToken');
  return axios.get('https://footbet.herokuapp.com/api/tournaments', {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
