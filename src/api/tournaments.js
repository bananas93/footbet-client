import axios from 'axios';
import { getCookie, logout } from '../helpers/authHelper';

export const getTournaments = () => {
  const token = getCookie('JWToken');
  return axios.get('https://footbet.herokuapp.com/api/tournaments', {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      if (res.status && res.status === 403) {
        logout();
      } else if (res.status && res.status === 404) {
        return [];
      }
      return res.data;
    }).catch((e) => e.response);
};
