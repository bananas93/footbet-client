import axios from 'axios';
import { getCookie } from '../helpers/authHelper';

export const getMessages = async () => {
  const token = getCookie('JWToken');
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/chat`, {
    headers: {
      Authorization: token,
    },
  });
};
