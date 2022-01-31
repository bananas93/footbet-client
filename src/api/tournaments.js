import axios from 'axios';
import { getJWToken } from '../helpers/authHelper';

export const getTournaments = async () => {
  const token = getJWToken();
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/tournaments`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getTournament = async (id) => {
  const token = getJWToken();
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/tournaments/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
