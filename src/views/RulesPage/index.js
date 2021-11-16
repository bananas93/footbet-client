import { useContext, useEffect } from 'react';
import styles from './index.module.scss';
import { TitleContext } from '../../utils/contexts';
import Card from '../../components/Card';

export default function RulesPage() {
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('Правила');
  }, [setTitle]);

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Card title="Нарахування очок">
          <ul className={styles.list}>
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
      </div>
      <div className={styles.col}>
        <Card title="При одинаковій кількості очок, позиції учасників визначаються">
          <ul className={styles.list}>
            <li>Кількість точних прогнозів</li>
            <li>Кількість вгаданих результатів</li>
            <li>Кількість вгаданих різниць рахунку</li>
            <li>Кількість вгаданих 5+ рахунків</li>
            <li>Менша кількість матчів</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
