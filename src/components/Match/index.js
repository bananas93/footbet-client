/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { useState } from 'react';
import { useInterval } from '../../utils/useInterval';
import { matchMinute } from '../../helpers/matchMinute';
import PredictModal from '../PredictModal';
import ViewPredicts from '../ViewPredicts';
import { addBet } from '../../api/bets';
import { logout } from '../../helpers/authHelper';
import useMobile from '../../helpers/useMobile';
import MatchMobile from './subcomponents/MatchMobile';
import MatchDesktop from './subcomponents/MatchDesktop';

export default function Match({ isBets, match, loadMatches }) {
  const [showAddPredictModal, setShowAddPredictModal] = useState(false);
  const [showPredictsModal, setShowPredictsModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const isMobile = useMobile();

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
        {!isMobile ? (
          <MatchDesktop
            isBets={isBets}
            match={match}
            checkMinute={checkMinute}
            myBet={myBet}
            toggleShowAddPredictModal={toggleShowAddPredictModal}
            toggleShowPredictsModal={toggleShowPredictsModal}
          />
        ) : (
          <MatchMobile
            isBets={isBets}
            match={match}
            checkMinute={checkMinute}
            myBet={myBet}
            toggleShowAddPredictModal={toggleShowAddPredictModal}
            toggleShowPredictsModal={toggleShowPredictsModal}
          />
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
  isBets: PropTypes.bool,
  match: PropTypes.object,
  loadMatches: PropTypes.func,
};
