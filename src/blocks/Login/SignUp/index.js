import { useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../../../components/Card';
import { register } from '../../../api/auth';
import Button from '../../../components/Button';
import { checkIsEmailValid } from '../../../helpers/authHelper';
import Input from '../../../components/Input';
import styles from './index.module.scss';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(['', '', '', '']);
  const [formErrors, setFormErrors] = useState(['', '', '', '']);

  const isValid = () => {
    const formErrorsNew = [...formErrors];

    const isEmailValid = checkIsEmailValid(formValues[0]);
    const isConfirmPassValid = formValues[3] && formValues[2] === formValues[3];

    if (!isEmailValid) formErrorsNew[0] = 'Некоректна email адреса';
    if (!isConfirmPassValid) {
      formErrorsNew[2] = ' ';
      formErrorsNew[3] = 'Паролі не співпадають';
    }
    if (!formValues[1]) formErrorsNew[1] = 'Ім\'я обов\'язкове';

    formErrorsNew.length && setFormErrors(formErrorsNew);

    return !formErrorsNew.some((i) => i);
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const values = {
        email: formValues[0],
        name: formValues[1],
        password: formValues[2],
      };
      try {
        const res = await register(values);
        if (res && res.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        setLoading(false);
        const err = error.response.data || error.message;
        toast.error(err, 3000);
      }
    }
  };

  const onInputChange = (value, index) => {
    const formValuesNew = formValues.map((i, ind) => (index === ind ? value.trim() : i));
    setFormValues(formValuesNew);
  };

  const onClearError = (index) => {
    if (!formErrors[index]) return;
    const formErrorsNew = formErrors.map((i, ind) => (ind === index ? '' : i));
    setFormErrors(formErrorsNew);
  };

  return (
    <Card title="Реєстрація">
      <div className={styles.google}>
        <a className="sign-google" href={`${process.env.REACT_APP_BASE_URL}/api/auth/google`}>
          <span className={styles.googleImg}><img width="30" src="/google.svg" alt="google" /></span>
          <span className={styles.googleText}>Увійти за допомогою Google</span>
        </a>
      </div>
      <form method="POST" noValidate onSubmit={signUp}>
        <div className={styles.inputWrap}>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            label="Введіть email"
            error={formErrors[0]}
            value={formValues[0]}
            onChange={(e) => onInputChange(e.target.value, 0)}
            onFocus={() => onClearError(0)}
          />
        </div>
        <div className={styles.inputWrap}>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Ім'я"
            label="Введіть ім'я"
            error={formErrors[1]}
            value={formValues[1]}
            onChange={(e) => onInputChange(e.target.value, 1)}
            onFocus={() => onClearError(1)}
          />
        </div>
        <div className={styles.inputWrap}>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            label="Введіть пароль"
            error={formErrors[2]}
            value={formValues[2]}
            onChange={(e) => onInputChange(e.target.value, 2)}
            onFocus={() => onClearError(2)}
          />
        </div>
        <div className={styles.inputWrap}>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Підтведити пароль"
            label="Підтведіть пароль"
            error={formErrors[3]}
            value={formValues[3]}
            onChange={(e) => onInputChange(e.target.value, 3)}
            onFocus={() => onClearError(3)}
          />
        </div>
        <div className={styles.inputWrap}>
          <Button type="submit" variant="primary" isLoading={loading}>
            {loading ? 'Реєстрація...' : 'Реєстрація'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SignUp;
