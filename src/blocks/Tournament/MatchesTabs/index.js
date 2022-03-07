/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import moment from 'moment';
import Divider from '../../../components/Divider';
import { normalizeTabName } from '../../../helpers/normalizeTabName';
import SingleMatch from '../SingleMatch';
import Card from '../../../components/Card';

const MatchesTabs = ({
  matches, tournament, loadMatches, activeTab, changeTabs,
}) => (
  <Card title="Матчі">
    <Tabs defaultIndex={Number(activeTab)} onSelect={changeTabs}>
      <TabList>
        {Array.from(Array(tournament.groupTours).keys()).map((key) => (
          <Tab key={key}>{`${key + 1} тур`}</Tab>
        ))}
        {Array.from(Array(tournament.playoffTours).keys()).reverse().map((key) => (
          <Tab key={key}>{normalizeTabName(key)}</Tab>
        ))}
      </TabList>
      {Array.from(Array(tournament.groupTours).keys()).map((key) => (
        <TabPanel key={key}>
          {matches.filter((group) => group.tour === `${key + 1} тур`).map((group) => (
            <div key={group.id}>
              <Divider>{moment(group.date).format('LL')}</Divider>
              {group.games.map((match) => (
                <SingleMatch loadMatches={loadMatches} key={match.id} match={match} />
              ))}
            </div>
          ))}
        </TabPanel>
      ))}
      {Array.from(Array(tournament.playoffTours).keys()).reverse().map((key) => (
        <TabPanel key={key}>
          {matches.filter((group) => group.tour === normalizeTabName(key)).map((group) => (
            <div key={group.id}>
              <Divider>{moment(group.date).format('LL')}</Divider>
              {group.games.map((match) => (
                <SingleMatch loadMatches={loadMatches} key={match.id} match={match} />
              ))}
            </div>
          ))}
        </TabPanel>
      ))}
    </Tabs>
  </Card>
);

MatchesTabs.propTypes = {
  matches: PropTypes.array,
  tournament: PropTypes.object,
  loadMatches: PropTypes.func,
  activeTab: PropTypes.number,
  changeTabs: PropTypes.func,
};

export default MatchesTabs;
