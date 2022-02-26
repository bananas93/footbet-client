import axios from 'axios';
import { getJWToken } from '../helpers/authHelper';
import { notificationWrapper } from '../helpers/notification';

export const getInfo = async (user, tournament, tour) => {
  const token = getJWToken('JWToken');
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/users/${user}/${tournament}/${tour}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getMyInfo = async () => {
  const token = getJWToken('JWToken');
  return await axios.get(`${process.env.REACT_APP_LOCAL_API}/users/me`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getUserInfo = async () => {
  await getMyInfo()
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return false;
    })
    .catch((e) => {
      notificationWrapper(true, `Помилка ${e.message}`);
    });
};
