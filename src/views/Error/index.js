import { Link } from 'react-router-dom';
import Card from '../../components/Card';

const Error = () => (
  <Card style={{ textAlign: 'center' }}>
    <div>Error 404</div>
    <div>Помилка, такої сторінки не знайдено</div>
    <Link to="/">Перейти на головну</Link>
  </Card>
);

export default Error;
