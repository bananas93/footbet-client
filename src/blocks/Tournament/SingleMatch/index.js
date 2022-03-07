/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import PredictModal from '../PredictModal';
import ViewPredicts from '../ViewPredicts';

import useMobile from '../../../helpers/useMobile';
import MatchMobile from './subcomponents/MatchMobile';
import MatchDesktop from './subcomponents/MatchDesktop';

const MatchesCard = ({ match }) => {
  const [showAddPredictModal, setShowAddPredictModal] = useState(false);
  const [showPredictsModal, setShowPredictsModal] = useState(false);
  const [predict, setPredict] = useState();
  const isMobile = useMobile();

  useEffect(() => {
    const myBet = match.bets.find((bet) => bet.myBet);
    setPredict(myBet);
  }, []);

  const toggleShowAddPredictModal = () => {
    setShowAddPredictModal(!showAddPredictModal);
  };
  const toggleShowPredictsModal = () => {
    setShowPredictsModal(!showPredictsModal);
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

  return (
    <>
      {!isMobile ? (
        <MatchDesktop
          winner={winner}
          handleMatchClick={handleMatchClick}
          match={match}
          myBet={predict}
        />
      ) : (
        <MatchMobile
          winner={winner}
          handleMatchClick={handleMatchClick}
          match={match}
          myBet={predict}
        />
      )}
      {showAddPredictModal && (
        <PredictModal
          title="Зберегти прогноз"
          showAddPredictModal={showAddPredictModal}
          toggleShowAddPredictModal={toggleShowAddPredictModal}
          match={match}
          myBet={predict}
          setPredict={setPredict}
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
};

MatchesCard.propTypes = {
  match: PropTypes.object,
};

export default MatchesCard;
