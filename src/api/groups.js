import axios from 'axios';
import { getJWToken } from '../helpers/authHelper';

export const getTournamentGroups = async (id) => {
  const token = getJWToken();
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/tournaments/${id}/groups`, {
    headers: {
      Authorization: token,
    },
  });
};
