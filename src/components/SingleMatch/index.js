/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { notificationWrapper } from '../../helpers/notification';
import { useMinute } from '../../helpers/useMinute';
import PredictModal from '../PredictModal';
import ViewPredicts from '../ViewPredicts';
import { addBet } from '../../api/bets';
import useMobile from '../../helpers/useMobile';
import MatchMobile from './subcomponents/MatchMobile';
import MatchDesktop from './subcomponents/MatchDesktop';

export default function MatchesCard({ match, loadMatches }) {
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
  const savePredict = async (values) => {
    const { home, away } = values;
    const data = {
      homeBet: home,
      awayBet: away,
      matchId: match.id,
      tournamentId: match.tournament_id,
    };
    setConfirmLoading(true);
    try {
      const res = await addBet(data);
      if (res.status && res.status === 201) {
        loadMatches();
        notificationWrapper(false, res.data.message);
        toggleShowAddPredictModal();
      }
    } catch (error) {
      notificationWrapper(true, `Помилка збереження прогнозу: ${error}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  const winner = ({
    homeGoals, homeTeam, awayGoals, awayTeam,
  }) => useMemo(() => {
    if (homeGoals > awayGoals) {
      return homeTeam.name;
    }
    if (homeGoals < awayGoals) {
      return awayTeam.name;
    }
    return false;
  }, [match]);

  const handleMatchClick = () => {
    if (match.status === 'Заплановано') {
      return toggleShowAddPredictModal();
    }
    return toggleShowPredictsModal();
  };
  const myBet = match.bets.find((bet) => bet.myBet);
  const MatchMinute = useMinute(match.datetime);

  return (
    <>
      {!isMobile ? (
        <MatchDesktop
          winner={winner}
          handleMatchClick={handleMatchClick}
          match={match}
          MatchMinute={MatchMinute}
          myBet={myBet}
        />
      ) : (
        <MatchMobile
          winner={winner}
          handleMatchClick={handleMatchClick}
          match={match}
          MatchMinute={MatchMinute}
          myBet={myBet}
        />
      )}
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

MatchesCard.propTypes = {
  loadMatches: PropTypes.func,
  match: PropTypes.object,
};
