import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/TextArea/TextArea';
import { UserType } from '../../redux/reducers/types';
import { selectUser, setUser } from '../../redux/reducers/userReducer';
import { TOAST_TIMEOUT } from '../../utils/constants';
import { updateUser } from '../../utils/httpServices/loginServices';
import { validate } from '../../utils/validations';
import styles from './Settings.module.css';

type SettingsType = UserType & { password: string };

export default function Settings() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const defaultFormValues: SettingsType = { ...user, password: '' };

  const defaultErrors = { ...user, password: '' };
  Object.keys(defaultErrors).forEach((key) => {
    defaultErrors[key] = '';
  });

  const [formData, setFormData] = useState(defaultFormValues);
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: '' });
    }
  }, [user]);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const cookieToken = cookies.get('token');
    const obj: any = { ...formData };
    Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]);
    obj.bio = formData.bio || ' ';
    obj.image = obj.image ? obj.image.replace(/\s/g, '') : '';

    if (Object.values(errors).find((el) => el)) return;

    const fetchData = await updateUser(obj, cookieToken);

    if (typeof fetchData !== 'string') {
      const { response, data } = fetchData;
      if (response.ok) {
        const { token } = data.user;
        toast('User has been successfully updated!', {
          type: 'success',
          autoClose: TOAST_TIMEOUT,
        });
        cookies.set('token', token);

        dispatch(setUser(formData));
      }
    } else {
      toast(fetchData, { type: 'warning', autoClose: TOAST_TIMEOUT });
    }
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    const msg = validate(name, value);
    setErrors((prev: SettingsType) => ({ ...prev, [name]: msg }));
  };

  const logOut = useCallback(() => {
    if (user) {
      toast('You have successfully logged out!', { autoClose: TOAST_TIMEOUT });
    }
    cookies.remove('token');
    dispatch(setUser(null));
    return navigate('/');
  }, [user, dispatch]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Your Settings</h1>
      <form noValidate className={styles.form} onSubmit={onSubmit}>
        <Input
          small
          placeholder="URL of profile picture"
          name="image"
          autoComplete="photo"
          onChange={handleInput}
          value={formData.image || ''}
        />
        <ErrorMsg>{errors.image}</ErrorMsg>
        <Input
          placeholder="Username"
          name="username"
          autoComplete="username"
          onChange={handleInput}
          value={formData.username || ''}
        />
        <ErrorMsg>{errors.username}</ErrorMsg>
        <TextArea
          rows={8}
          placeholder="Short bio about you"
          name="bio"
          onChange={handleInput}
          value={formData.bio || ''}
        />
        <br />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          onChange={handleInput}
          value={formData.email || ''}
        />
        <ErrorMsg>{errors.email}</ErrorMsg>
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="New Password"
          name="password"
          onChange={handleInput}
          value={formData.password}
        />
        <ErrorMsg>{errors.password}</ErrorMsg>
        <div className={styles.row}>
          <Button type="button" red onClick={logOut}>
            Logout
          </Button>
          <Button type="submit">Update Settings</Button>
        </div>
      </form>
    </main>
  );
}
