import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Home({ tournaments }) {
  return (
    <Row style={{ marginTop: '30px' }} gutter={16}>
      <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: '30px' }}>
        <Card>
          {tournaments.length && (
            tournaments.map((tournament) => (
              <Link to={`/${tournament.slug}`}>
                <img style={{ objectFit: 'contain', width: '100%', height: '200px' }} alt={tournament.name} src={tournament.logo} />
              </Link>
            )))}
        </Card>
      </Col>
    </Row>
  );
}

Home.propTypes = {
  tournaments: PropTypes.array,
};
