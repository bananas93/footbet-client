/* eslint-disable react/jsx-indent */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { registerToken } from './api/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCmhZ6jlItI9EiQ2uvMZFJ639iBlngN-sc',
  authDomain: 'footbet-2d3b7.firebaseapp.com',
  projectId: 'footbet-2d3b7',
  storageBucket: 'footbet-2d3b7.appspot.com',
  messagingSenderId: '112215657600',
  appId: '1:112215657600:web:b30c8b5ab58dd176cd2a65',
  measurementId: 'G-VKR0R9Y6ZS',
};
const app = initializeApp(firebaseConfig);
let messaging;
try {
  messaging = getMessaging(app);
} catch (err) {
  console.error('Failed to initialize Firebase Messaging', err);
}

export const requestPermission = () => {
  if ('Notification' in window) {
    console.log('Requesting User Permission......');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification User Permission Granted.');
        return getToken(messaging, { vapidKey: 'BDpXz66_M0T5PAnnRFlOCxDyrHQ93Mt7x3J60zlVDNSOLNYULk9X78krDuAoaMDCACBiMK8qLNivnB_sLgqqljY' })
          .then(async (currentToken) => {
            if (currentToken) {
              await registerToken(currentToken);
              console.log('Client Token: ', currentToken);
            } else {
              console.log('Failed to generate the app registration token.');
            }
          })
          .catch((err) => {
            console.log('An error occurred when requesting to receive the token.', err);
          });
      }
      console.log('User Permission Denied.');
    });
  }
};

export const onMessageListener = (callback) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};
