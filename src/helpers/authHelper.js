/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
import { getMyInfo } from '../api/users';
import { notificationWrapper } from './notification';

export const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  for (const optionKey in options) {
    updatedCookie += `; ${optionKey}`;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};

export const getJWToken = () => `Bearer ${getCookie('JWToken')}`;

export function checkAuthorization() {
  return Boolean(getCookie('JWToken'));
}

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

export const logout = () => {
  deleteCookie('JWToken');
  window.location.href = '/';
};
