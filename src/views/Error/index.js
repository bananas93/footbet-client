import { Result, Button } from 'antd';

export default function Error() {
  const goToHome = () => {
    window.location.href = process.env.REACT_APP_LOCAL_API;
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
