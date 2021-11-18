import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
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
        <div className={cn(style.matchTeam, {
          [style.matchTeamWinner]: winner(match) === match.homeTeam.name,
        })}
        >
          <img className={style.matchTeamLogo} src={`/logos/${match.homeTeam.id}.png`} alt={match.homeTeam.name} />
          <span>{match.homeTeam.name}</span>
        </div>
        <div className={cn(style.matchTeam, {
          [style.matchTeamWinner]: winner(match) === match.awayTeam.name,
        })}
        >
          <img className={style.matchTeamLogo} src={`/logos/${match.awayTeam.id}.png`} alt={match.awayTeam.name} />
          <span>{match.awayTeam.name}</span>
        </div>
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
