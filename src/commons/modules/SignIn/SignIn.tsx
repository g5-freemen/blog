import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Input } from '../../components/Input/Input';
import { errorsToasts } from '../../utils/errorsToasts';
import { loginUser } from '../../utils/httpService';
import { validate } from '../../utils/validations';
import styles from './SignIn.module.css';

export interface ISignIn {
  email: string;
  password: string;
}

const defaultFormValues: ISignIn = {
  email: '',
  password: '',
};

export default function SignIn() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormValues);
  const [errors, setErrors] = useState(defaultFormValues);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const fetchData = await loginUser(formData);
    if (typeof fetchData === 'string') {
      toast(fetchData, { type: 'error' });
      return false;
    }

    const { response, data } = fetchData;
    if (!response.ok) {
      errorsToasts(data);
      return false;
    }

    const { token, ...user } = data.user;
    cookies.set('user', user);
    cookies.set('token', token);
    const successMsg = `${data.user.username} Logged in`;
    toast(successMsg, { type: 'success', autoClose: 2500 });
    return navigate('/');
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    const msg = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in</h1>
      <Link to={{ pathname: '/register' }} className={styles.link}>
        Need an account?
      </Link>
      <form noValidate className={styles.form} onSubmit={onSubmit}>
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
          placeholder="Password"
          name="password"
          onChange={handleInput}
          value={formData.password}
        />
        <ErrorMsg>{errors.password}</ErrorMsg>
        <div className={styles.right}>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </div>
  );
}
