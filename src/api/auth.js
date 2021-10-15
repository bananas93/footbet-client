import axios from 'axios';
import { setCookie, getCookie, logout } from '../helpers/authHelper';

export function login({ email, password }) {
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${process.env.REACT_APP_LOCAL_API}/users/login`,
    data: { email, password },
  })
    .then((res) => {
      if (res.status && res.status === 200) {
        setCookie('JWToken', res.data.token);
      }
      return res;
    }).catch((e) => e.response);
}

export function register({ email, name, password }) {
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${process.env.REACT_APP_LOCAL_API}/users/register`,
    data: { email, name, password },
  })
    .then((res) => {
      if (res.status && res.status === 201) {
        setCookie('JWToken', res.data.token);
      }
      return res;
    }).catch((e) => e.response);
}

export function getUserDetails() {
  const token = getCookie('JWToken');
  return axios.get(`${process.env.REACT_APP_LOCAL_API}/users/me`, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      if (res.status && res.status !== 200) {
        logout();
      }
      return res.data;
    }).catch((e) => e.response);
}

export function updateUserDetails({ email, name, password }) {
  const token = getCookie('JWToken');
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    url: `${process.env.REACT_APP_LOCAL_API}/users/me`,
    data: { email, name, password },
  }).then((res) => {
    if (res.status && res.status !== 201) {
      logout();
    }
    return res;
  }).catch((e) => e.response);
}
