import PropTypes from 'prop-types';
import { Button } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function MatchDesktop({
  match,
  checkMinute,
  myBet,
  toggleShowPredictsModal,
  toggleShowAddPredictModal,
}) {
  return (
    <>
      <span className="single-match__time">
        {match.group ? `Група ${match.group}` : match.tour}
        <br />
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
      {
        myBet ? (
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
        )
      }
      {
        match.status === 'Заплановано' ? (
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
        )
      }
    </>
  );
}

MatchDesktop.propTypes = {
  match: PropTypes.object,
  checkMinute: PropTypes.func,
  toggleShowPredictsModal: PropTypes.func,
  toggleShowAddPredictModal: PropTypes.func,
  myBet: PropTypes.object,
};
