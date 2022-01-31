import { Result, Button } from 'antd';

export default function Error() {
  const goToHome = () => {
    window.location.href = 'https://footbet.pp.ua';
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Помилка, такої сторінки не знайдено"
      extra={<Button onClick={goToHome} type="primary">На головну</Button>}
    />
  );
}
