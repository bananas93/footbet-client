import { Card } from 'antd';

export default function Rules() {
  return (
    <>
      <h1 className="site-title">Правила</h1>
      <Card>
        <ul>
          <li>
            Вгаданий переможець матчу –
            {' '}
            <strong>2 очки</strong>
          </li>
          <li>
            Вгаданий переможець + вгадана різниця –
            {' '}
            <strong>3 очки</strong>
          </li>
          <li>
            Вгаданий точний рахунок –
            {' '}
            <strong>5 очок</strong>
          </li>
          <li>
            Вгаданий точний рахунок + в матчі забито 5+ голів –
            {' '}
            <strong>6 очок</strong>
          </li>
        </ul>
      </Card>
      <Card>
        <strong>При одинаковій кількості очок, позиції учасників визначаються:</strong>
        <ul style={{ listStyle: 'number', paddingLeft: '20px' }}>
          <li>Кількість точних прогнозів</li>
          <li>Кількість вгаданих результатів</li>
          <li>Кількість вгаданих різниць рахунку</li>
          <li>Кількість вгаданих 5+ рахунків</li>
          <li>Менша кількість матчів</li>
        </ul>
      </Card>
    </>
  );
}
