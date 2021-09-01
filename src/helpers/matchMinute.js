import moment from 'moment';

export const matchMinute = (date) => {
  const matchDate = moment(date);
  const nowDate = moment();
  const minute = nowDate.diff(matchDate, 'minutes');
  return minute;
};
