/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { Button, notification } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState } from 'react';
import { useInterval } from '../../utils/useInterval';
import { matchMinute } from '../../helpers/matchMinute';
import PredictModal from '../PredictModal';
import ViewPredicts from '../ViewPredicts';
import { addBet } from '../../api/bets';
import { logout } from '../../helpers/authHelper';

export default function Match({ match, loadMatches }) {
  const [showAddPredictModal, setShowAddPredictModal] = useState(false);
  const [showPredictsModal, setShowPredictsModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const toggleShowAddPredictModal = () => {
    setShowAddPredictModal(!showAddPredictModal);
  };
  const toggleShowPredictsModal = () => {
    setShowPredictsModal(!showPredictsModal);
  };
  const notificationSuccess = (message) => {
    notification.success({
      message: 'Успіх',
      description: message,
    });
  };
  const notificationError = (error) => {
    notification.error({
      message: 'Помилка',
      description: error,
    });
  };
  const savePredict = (values) => {
    setConfirmLoading(true);
    const { home, away } = values;
    const data = {
      homeBet: home,
      awayBet: away,
      matchId: match.id,
      tournamentId: match.tournament_id,
    };
    addBet(data).then((res) => {
      if (res) {
        if (res.status === 201) {
          notificationSuccess('Прогноз успішно збережено');
          toggleShowAddPredictModal();
          loadMatches();
        } else if (res.status === 403) {
          notificationError('Помилка збереження');
        } else if (res.status === 401) {
          notificationError('Помилка авторизації');
          logout();
        } else {
          notificationError(res.data.error);
        }
      } else {
        notificationError('Помилка серверу...');
      }
      setConfirmLoading(false);
    });
  };

  const [minute, setMinute] = useState(matchMinute(match.datetime));
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
  const myBet = match.bets.find((bet) => bet.myBet);

  return (
    <>
      <div className="single-match" id={`match-${match.id}`}>
        <span className="single-match__time">
          {match.group ? `Група ${match.group}` : match.tour}
          <br />
          {match.status !== 'Live' ? (
            <span>
              { match.status === 'Заплановано' ? (
                moment(match.datetime).format('HH:mm')
              ) : (
                'FT'
              )}
            </span>
          ) : (
            <span className="match-minute">{checkMinute()}</span>
          )}
        </span>
        <span className="single-match__team single-match__team--left">{match.homeTeam.name}</span>
        <span className="single-match__score">
          <span className={`single-match__score--data ${match.status === 'Live' ? 'single-match__score--live' : ''} ${match.status === 'Заплановано' ? 'single-match__score--scheduled' : ''}`}>
            {match.status === 'Заплановано' ? (
              '-:-'
            ) : (
              `${match.homeGoals} - ${match.awayGoals}`
            )}
          </span>
        </span>
        <span className="single-match__team single-match__right">{match.awayTeam.name}</span>
        {myBet ? (
          <span className="single-match__mypredict">
            {myBet.homeBet}
            {' '}
            -
            {' '}
            {myBet.awayBet}
            {' '}
            (
            {myBet.points}
            )
          </span>
        ) : (
          <span className="single-match__mypredict">
            -:-
          </span>
        )}
        { match.status === 'Заплановано' ? (
          <span className="single-match__predict">
            {myBet ? (
              <Button type="text" title="Змінити прогноз" onClick={toggleShowAddPredictModal}><EditOutlined /></Button>
            ) : (
              <Button type="text" title="Додати прогноз" onClick={toggleShowAddPredictModal}><PlusOutlined /></Button>
            )}
          </span>
        ) : (
          <span className="single-match__predict">
            <Button type="text" title="Подивитися прогнози" onClick={toggleShowPredictsModal}><PlusOutlined /></Button>
          </span>
        )}
      </div>
      {showAddPredictModal && (
        <PredictModal
          visible={showAddPredictModal}
          toggleShowAddPredictModal={toggleShowAddPredictModal}
          onCreate={savePredict}
          confirmLoading={confirmLoading}
          match={match}
        />
      )}
      {showPredictsModal && (
        <ViewPredicts
          showPredictsModal={showPredictsModal}
          toggleShowPredictsModal={toggleShowPredictsModal}
          match={match}
        />
      )}
    </>
  );
}

Match.propTypes = {
  match: PropTypes.object,
  loadMatches: PropTypes.func,
};
