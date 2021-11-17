import PropTypes from 'prop-types';
import moment from 'moment';
import style from './index.module.scss';

export default function MatchDesktop({
  handleMatchClick,
  winner,
  match,
  MatchMinute,
  myBet,
}) {
  return (
    <button className={style.wrap} id={`match-${match.id}`} type="button" onClick={handleMatchClick}>
      <div className={style.match}>
        <div className={style.matchTime}>
          {match.group ? `Група ${match.group}` : match.tour}
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
            <MatchMinute />
          )}
        </div>
        <div className={`${style.matchTeam} ${winner(match) === match.homeTeam.name ? style.matchTeamWinner : ''}`}>
          <span>{match.homeTeam.name}</span>
          <img className={style.matchTeamLogo} src={`/logos/${match.homeTeam.id}.png`} alt={match.homeTeam.name} />
        </div>
        <div className={`${style.matchScore} ${match.status === 'Live' ? style.matchScoreLive : ''}`}>
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
        <div className={`${style.matchTeam} ${style.matchTeamLast} ${winner(match) === match.awayTeam.name ? style.matchTeamWinner : ''}`}>
          <img className={`${style.matchTeamLogo} ${style.matchTeamLogoLast}`} src={`/logos/${match.awayTeam.id}.png`} alt={match.awayTeam.name} />
          <span>{match.awayTeam.name}</span>
        </div>
        {
          myBet ? (
            <div className={style.matchPredict}>
              {myBet.homeBet}
              {' '}
              -
              {' '}
              {myBet.awayBet}
              {' '}
              (
              {match.status === 'Заплановано' ? 0 : myBet.points}
              )
            </div>
          ) : (
            <div className={style.matchPredict}>
              -:-
            </div>
          )
        }
      </div>
    </button>
  );
}

MatchDesktop.propTypes = {
  match: PropTypes.object,
  MatchMinute: PropTypes.node,
  myBet: PropTypes.object,
  handleMatchClick: PropTypes.func,
  winner: PropTypes.func,
};
