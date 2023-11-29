import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';

const MatchCard = ({ match }) => (
  <div className={styles.match} key={match.id}>
    <span className={styles.matchTeam}>{match.homeTeam.name}</span>
    <span className={styles.matchScore}>
      <span className="single-match__score--data">
        {match.homeGoals}
        {' '}
        -
        {match.awayGoals}
      </span>
    </span>
    <span className={cn(styles.matchTeam, styles.matchTeamLast)}>{match.awayTeam.name}</span>
  </div>
);

MatchCard.propTypes = {
  match: PropTypes.object,
};

export default MatchCard;
