import PropTypes from 'prop-types';
import moment from 'moment';
import style from './index.module.scss';

export default function MatchMobile({
  match,
  checkMinute,
  myBet,
  handleMatchClick,
  winner,
}) {
  return (
    <button type="button" id={`match-${match.id}`} onClick={handleMatchClick} className={style.match}>
      <div className={style.matchInfo}>
        <div>{match.group ? `Група ${match.group}` : match.tour}</div>
        <div className={style.matchInfoStatus}>
          {match.status !== 'Live' ? (
            <span>
              {match.status === 'Заплановано' ? (
                moment(match.datetime).format('HH:mm')
              ) : (
                'FT'
              )}
            </span>
          ) : (
            <span className="match-minute">{checkMinute()}</span>
          )}
        </div>
      </div>
      <div className={style.matchTeams}>
        <div className={`${style.matchTeam} ${winner(match) === match.homeTeam.name ? style.matchTeamWinner : ''}`}>{match.homeTeam.name}</div>
        <div className={`${style.matchTeam} ${winner(match) === match.awayTeam.name ? style.matchTeamWinner : ''}`}>{match.awayTeam.name}</div>
      </div>
      <div className={style.matchScores}>
        {match.status !== 'Заплановано' && (
          <>
            <div className={match.status === 'Live' ? style.matchScoresLife : style.matchScoresRegular}>{match.homeGoals}</div>
            <div className={match.status === 'Live' ? style.matchScoresLife : style.matchScoresRegular}>{match.awayGoals}</div>
          </>
        )}
      </div>
      {myBet ? (
        <div className={style.matchPredicts}>
          <div className={style.matchUserBets}>
            <div className={style.matchScoresRegular}>{match.bets[0].homeBet}</div>
            <div className={style.matchScoresRegular}>{match.bets[0].awayBet}</div>
          </div>
          <div className={style.matchPoints}>
            (
            {match.status === 'Заплановано' ? 0 : myBet.points}
            )
          </div>
        </div>
      ) : (
        <div className={style.matchPredict}>
          -:-
        </div>
      )}
    </button>
  );
}

MatchMobile.propTypes = {
  match: PropTypes.object,
  checkMinute: PropTypes.func,
  handleMatchClick: PropTypes.func,
  winner: PropTypes.func,
  myBet: PropTypes.object,
};
