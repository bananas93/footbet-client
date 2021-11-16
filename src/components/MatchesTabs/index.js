import PropTypes from 'prop-types';
import { Divider, Tabs } from 'antd';
import moment from 'moment';
import { normalizeTabName } from '../../helpers/normalizeTabName';
import SingleMatch from '../SingleMatch';
import Card from '../Card';

const { TabPane } = Tabs;

export default function MatchTabs({
  matches, tournament, loadMatches, activeTab, changeTabs,
}) {
  return (
    <Card title="Матчі">
      <Tabs defaultActiveKey={activeTab} onChange={changeTabs}>
        {Array.from(Array(tournament.groupTours).keys()).map((key) => (
          <TabPane tab={`${key + 1} тур`} key={key}>
            {
              matches.filter((group) => group.tour === `${key + 1} тур`)
                .map((group) => (
                  <div key={group.id}>
                    <Divider style={{ fontWeight: 'bold' }}>{moment(group.date).format('LL')}</Divider>
                    {
                      group.games.map((match) => (
                        <SingleMatch loadMatches={loadMatches} key={match.id} match={match} />))
                    }
                  </div>
                ))
            }
          </TabPane>
        ))}
        {Array.from(Array(tournament.playoffTours).keys()).reverse().map((key) => (
          <TabPane tab={normalizeTabName(key)} key={key + 10}>
            {
              matches.filter((group) => group.tour === normalizeTabName(key))
                .map((group) => (
                  <div key={group.id}>
                    <Divider style={{ fontWeight: 'bold' }}>{moment(group.date).format('LL')}</Divider>
                    {
                      group.games.map((match) => (
                        <SingleMatch loadMatches={loadMatches} key={match.id} match={match} />))
                    }
                  </div>
                ))
            }
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
}

MatchTabs.propTypes = {
  matches: PropTypes.array,
  tournament: PropTypes.object,
  loadMatches: PropTypes.func,
  activeTab: PropTypes.string,
  changeTabs: PropTypes.func,
};
