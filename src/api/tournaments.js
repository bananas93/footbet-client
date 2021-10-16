import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getTournaments = () => {
  const token = getCookie('JWToken');
  return axios.get(`${process.env.REACT_APP_LOCAL_API}/tournaments`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res).catch((e) => e.response);
};
