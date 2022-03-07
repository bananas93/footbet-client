import { useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import { login } from '../../../api/auth';
import { checkIsEmailValid, setCookie } from '../../../helpers/authHelper';
import Input from '../../../components/Input';
import styles from './index.module.scss';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onInputChange = (type, value) => {
    if (type === 'email') {
      setEmail(value);
    }
    if (type === 'password') {
      setPassword(value);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    const isEmailValid = checkIsEmailValid(email);
    if (!isEmailValid) {
      setEmailError('Некоректна email адреса');
      return;
    }
    if (!emailError && !passwordError) {
      try {
        setLoading(true);
        const res = await login({ email, password });
        if (res.status && res.status === 200) {
          const { token } = res.data;
          setCookie('JWToken', token, {
            expires: new Date(Date.now() + 10 * 604800000),
            path: '/',
          });
          setLoading(false);
          window.location.href = `https://${window.location.origin}/profile`;
        }
      } catch (error) {
        setLoading(false);
        if (error.response.data === 'Користувача не знайдено') {
          setEmailError('Користувача не знайдено');
        }
        if (error.response.data === 'Невірний пароль') {
          setPasswordError('Невірний пароль');
        } else {
          const err = error.response.data || error.message;
          toast.error(err, 3000);
        }
      }
    }
  };

  return (
    <Card title="Вхід">
      <div className={styles.google}>
        <a className="sign-google" href={`${process.env.REACT_APP_BASE_URL}/api/auth/google`}>
          <span className={styles.googleImg}><img width="30" src="/google.svg" alt="google" /></span>
          <span className={styles.googleText}>Увійти за допомогою Google</span>
        </a>
      </div>
      <form method="POST" noValidate onSubmit={signIn}>
        <div className={styles.inputWrap}>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            label="Введіть email"
            error={emailError}
            value={email}
            onChange={(e) => onInputChange('email', e.target.value)}
            onFocus={() => setEmailError('')}
          />
        </div>
        <div className={styles.inputWrap}>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            label="Введіть пароль"
            error={passwordError}
            value={password}
            onChange={(e) => onInputChange('password', e.target.value)}
            onFocus={() => setPasswordError('')}
          />
        </div>
        <div className={styles.inputWrap}>
          <Button type="submit" variant="primary" isLoading={loading} isDisabled={!email && !password}>
            {loading ? 'Вхід...' : 'Вхід'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SignIn;
