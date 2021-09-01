import axios from 'axios';
import { getJWToken } from '../helpers/authHelper';

export function addBet(data) {
  const token = getJWToken();
  return axios.post('https://footbet.herokuapp.com/api/bets', data,
    {
      headers: { Authorization: token },
    })
    .then((res) => ({
      status: res.status,
      data: res.data,
    }))
    .catch((err) => err.response);
}
