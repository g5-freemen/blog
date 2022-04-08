import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Input } from '../../components/Input/Input';
import { errorsToasts } from '../../utils/errorsToasts';
import { loginUser } from '../../utils/httpService';
import { isValidEmail, isValidPassword } from '../../utils/validations';
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormValues);
  const [errors, setErrors] = useState(defaultFormValues);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { response, data } = await loginUser(formData);
    if (!response.ok) {
      errorsToasts(data);
      return false;
    }

    const successMsg = `${data.user.username} Logged in`;
    toast(successMsg, { type: 'success' });
    return navigate('/');
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    let msg: string;
    if (name === 'email') {
      msg = isValidEmail(value).msg;
    } else if (name === 'password') {
      msg = isValidPassword(value).msg;
    }
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
