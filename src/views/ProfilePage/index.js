import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import { getUserDetails, updateUserDetails } from '../../api/auth';
import { TitleContext } from '../../utils/contexts';
import styles from './index.module.scss';
import Card from '../../components/Card';
import { logout } from '../../helpers/authHelper';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);
  const [formValues, setFormValues] = useState(['', '', '', '']);
  const [formErrors, setFormErrors] = useState(['', '', '', '']);
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('Профіль');
  }, [setTitle]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const res = await getUserDetails();
        if (res.status && res.status === 200) {
          setFormValues([res.data.email, res.data.name, '', '']);
        }
      } catch (error) {
        toast.error(error.message, 3000);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const isValid = () => {
    const formErrorsNew = [...formErrors];

    const isConfirmPassValid = formValues[2] === formValues[3];

    if (!isConfirmPassValid) {
      formErrorsNew[2] = ' ';
      formErrorsNew[3] = 'Паролі не співпадають';
    }
    if (!formValues[1]) formErrorsNew[1] = 'Ім\'я обов\'язкове';

    formErrorsNew.length && setFormErrors(formErrorsNew);

    return !formErrorsNew.some((i) => i);
  };

  const changeProfile = async (e) => {
    e.preventDefault();
    if (isValid()) {
      setSave(true);
      const values = {
        email: formValues[0],
        name: formValues[1],
        password: formValues[2],
      };
      try {
        const res = await updateUserDetails(values);
        if (res.status && res.status === 201) {
          setFormValues([res.data.email, res.data.name, '', '']);
          toast.success('Профіль успішно оновлено', 3000);
        }
      } catch (error) {
        toast.error(error.message, 3000);
      } finally {
        setSave(false);
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
    <div className={styles.row}>
      <div className={styles.col}>
        <Card
          titleStyle={{ marginBottom: '30px' }}
          title="Оновити профіль"
          action={
            <Button type="button" style={{ fontWeight: '400', color: '#4169b8' }} variant="link" onClick={logout}>Вийти</Button>
          }
        >
          {loading ? (
            <Loading />
          ) : (
            <form method="POST" onSubmit={changeProfile} noValidate>
              <div className={styles.inputWrap}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  label="Введіть email"
                  value={formValues[0]}
                  readOnly
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
              <Divider />
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
                  id="new-password"
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
                <Button type="submit" variant="primary" isLoading={save}>
                  {save ? ' Зберігання...' : 'Зберегти'}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
