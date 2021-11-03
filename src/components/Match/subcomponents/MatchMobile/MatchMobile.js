import PropTypes from 'prop-types';
import { Button } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import style from './index.module.scss';

export default function MatchMobile({
  match,
  checkMinute,
  myBet,
  toggleShowPredictsModal,
  toggleShowAddPredictModal,
}) {
  return (
    <div className={style.match}>
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
        <div>{match.homeTeam.name}</div>
        <div>{match.awayTeam.name}</div>
      </div>
      <div className={style.matchScores}>
        {match.status !== 'Заплановано' && (
          <>
            <div className={match.status === 'Live' ? style.matchScoresLife : style.matchScoresRegular}>{match.homeGoals}</div>
            <div className={match.status === 'Live' ? style.matchScoresLife : style.matchScoresRegular}>{match.awayGoals}</div>
          </>
        )}
      </div>
      <div className={style.matchActions}>
        {match.status === 'Заплановано' ? (
          <Button type="text" title="Змінити прогноз" onClick={toggleShowAddPredictModal}>
            {myBet ? (
              <EditOutlined />
            ) : (
              <PlusOutlined />
            )}
          </Button>
        ) : (
          <Button type="text" title="Подивитися прогнози" onClick={toggleShowPredictsModal}><PlusOutlined /></Button>
        )}
      </div>
    </div>
  );
}

MatchMobile.propTypes = {
  match: PropTypes.object,
  checkMinute: PropTypes.func,
  toggleShowPredictsModal: PropTypes.func,
  toggleShowAddPredictModal: PropTypes.func,
  myBet: PropTypes.object,
};
