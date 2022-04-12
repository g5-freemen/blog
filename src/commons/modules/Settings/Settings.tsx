import React, { useCallback, useState } from 'react';
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

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    const cookieToken = cookies.get('token');
    ev.preventDefault();
    const obj: any = { ...formData };
    Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]);
    const { response, data } = await updateUser(obj, cookieToken);
    if (response.ok) {
      const { token, ...userdata } = data.user;
      toast('User has been successfully updated!', {
        type: 'success',
        autoClose: 2500,
      });
      cookies.set('token', token);
      dispatch(setUser(userdata));
    }
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    const msg = validate(name, value);
    setErrors((prev: SettingsType) => ({ ...prev, [name]: msg }));
  };

  const logOut = useCallback(() => {
    if (user) {
      toast('You have successfully logged out!', { autoClose: 2500 });
    }
    cookies.remove('token');
    dispatch(setUser(undefined));
    return navigate('/');
  }, [user]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Settings</h1>
      <form noValidate className={styles.form} onSubmit={onSubmit}>
        <Input
          small
          placeholder="URL of profile picture"
          name="image"
          autoComplete="image"
          onChange={handleInput}
          value={formData.image || ''}
        />
        <ErrorMsg>{errors.image}</ErrorMsg>
        <Input
          placeholder="Username"
          name="username"
          autoComplete="username"
          onChange={handleInput}
          value={formData.username}
        />
        <ErrorMsg>{errors.username}</ErrorMsg>
        <TextArea rows={8} placeholder="Short bio about you" />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          onChange={handleInput}
          value={formData.email}
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
        <div className={styles.right}>
          <Button type="submit">Update Settings</Button>
        </div>
        <hr className={styles.hr} />
        <Button
          type="button"
          red
          small
          onClick={logOut}
          className={styles.left}
        >
          Or click here to logout.
        </Button>
      </form>
    </div>
  );
}
