import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Row style={{ marginTop: '30px' }} gutter={16}>
      <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: '30px' }}>
        <Card>
          <Link to="/champions-league-2022/">
            <img style={{ objectFit: 'contain', width: '100%', height: '200px' }} alt="example" src="https://upload.wikimedia.org/wikipedia/commons/e/e2/UEFA_Champions_League_logo.png" />
          </Link>
        </Card>
      </Col>
    </Row>
  );
}
