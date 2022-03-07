import PropTypes from 'prop-types';

const MatchCard = ({ match }) => (
  <div className="single-match single-match--details" key={match.id}>
    <span className="single-match__team single-match__team--left">{match.homeTeam.name}</span>
    <span className="single-match__score">
      <span className="single-match__score--data">
        {match.homeGoals}
        {' '}
        -
        {match.awayGoals}
      </span>
    </span>
    <span className="single-match__team single-match__right">{match.awayTeam.name}</span>
    <span className="single-match__mypredict">
      {match.bet.homeBet}
      {' '}
      -
      {' '}
      {match.bet.awayBet}
    </span>
  </div>
);

MatchCard.propTypes = {
  match: PropTypes.object,
};

export default MatchCard;
