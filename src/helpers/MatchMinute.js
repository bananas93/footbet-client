import PropTypes from 'prop-types';
import moment from 'moment';
import { useState } from 'react';
import { useInterval } from '../utils/useInterval';

const matchMinute = (date) => {
  const matchDate = moment(date);
  const nowDate = moment();
  return nowDate.diff(matchDate, 'minutes');
};

const MatchMinute = ({ date }) => {
  const [minute, setMinute] = useState(matchMinute(date));

  useInterval(() => {
    setMinute(minute + 1);
  }, 60 * 1000);

  const checkMinute = () => {
    if (minute > 45 && minute < 45) {
      return '45+';
    }
    if (minute > 45 && minute < 60) {
      return 'HT';
    }
    if (minute > 45 && minute < 109) {
      return minute - 19;
    }
    if (minute > 90) {
      return '90+';
    }
    return minute;
  };
  const min = checkMinute();
  return (
    <div className="match-minute" style={{ color: '#ed1c24' }}>
      <span>{min}</span>
      <img src="/blinker.gif" alt="blinker" style={{ verticalAlign: 'top' }} />
    </div>
  );
};

MatchMinute.propTypes = {
  date: PropTypes.string,
};

export default MatchMinute;
