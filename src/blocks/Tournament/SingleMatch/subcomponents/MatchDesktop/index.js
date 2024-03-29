/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
import style from './index.module.scss';
import MatchMinute from '../../../../../helpers/MatchMinute';

const MatchDesktop = ({
  winner,
  handleMatchClick,
  match,
  myBet,
}) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = '/logos/empty.webp';
  };
  return (
    <button className={style.wrap} id={`match-${match.id}`} type="button" onClick={handleMatchClick}>
      <div className={style.match}>
        <div className={style.matchTime}>
          {match.group ? `Група ${match.group}` : match.stage}
          <br />
          {match.status !== 'Live' ? (
            <div>
              {match.status === 'Заплановано' ? (
                moment(match.datetime).format('HH:mm')
              ) : (
                'FT'
              )}
            </div>
          ) : (
            <MatchMinute date={match.datetime} />
          )}
        </div>
        <div className={cn(style.matchTeam, {
          [style.matchTeamWinner]: winner(match) === match.homeTeam.name,
        })}
        >
          <span>{match.homeTeam.name}</span>
          <img className={style.matchTeamLogo} onError={addDefaultSrc} src={`/logos/${match.homeTeam.id}.webp`} alt="" />
        </div>
        <div className={cn(style.matchScore, { [style.matchScoreLive]: match.status === 'Live' }, { [style.matchScoreScheduled]: match.status === 'Заплановано' })}>
          {match.status === 'Заплановано' ? (
            '-:-'
          ) : (
            <>
              <span>{match.homeGoals}</span>
              <span>-</span>
              <span>{match.awayGoals}</span>
            </>
          )}
        </div>
        <div className={cn(style.matchTeam, style.matchTeamLast, {
          [style.matchTeamWinner]: winner(match) === match.awayTeam.name,
        })}
        >
          <img className={cn(style.matchTeamLogo, style.matchTeamLogoLast)} onError={addDefaultSrc} src={`/logos/${match.awayTeam.id}.webp`} alt="" />
          <span>{match.awayTeam.name}</span>
        </div>
        {myBet ? (
          <div className={style.matchPredict}>
            {myBet.homeBet} - {myBet.awayBet} ({match.status === 'Заплановано' ? 0 : myBet.points})
          </div>
        ) : (
          <div className={style.matchPredict}>-:-</div>
        )}
      </div>
    </button>
  );
};
MatchDesktop.propTypes = {
  match: PropTypes.object,
  myBet: PropTypes.object,
  handleMatchClick: PropTypes.func,
  winner: PropTypes.func,
};

export default MatchDesktop;
