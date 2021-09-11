import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Home({ tournaments }) {
  return (
    <Row style={{ marginTop: '30px' }} gutter={16}>
      {tournaments.length && (
        tournaments.map((tournament) => (
          <Col key={tournament.id} className="gutter-row" xs={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: '30px' }}>
            <Card>
              <Link to={`/${tournament.slug}`}>
                <img style={{ objectFit: 'contain', width: '100%', height: '150px' }} alt={tournament.name} src={tournament.logo} />
              </Link>
            </Card>
          </Col>
        )))}
    </Row>
  );
}

Home.propTypes = {
  tournaments: PropTypes.array,
};
