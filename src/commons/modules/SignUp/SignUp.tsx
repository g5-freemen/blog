import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Input } from '../../components/Input/Input';
import { errorsToasts } from '../../utils/errorsToasts';
import { registerUser } from '../../utils/httpServices/loginServices';
import { isAllFilled, isAnyError, validate } from '../../utils/validations';
import { TOAST_TIMEOUT } from '../../utils/constants';
import styles from '../SignIn/SignIn.module.css';

export interface ISignUp {
  username: string;
  email: string;
  password: string;
}

const defaultFormValues: ISignUp = {
  username: '',
  email: '',
  password: '',
};

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormValues);
  const [errors, setErrors] = useState(defaultFormValues);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fetchData = await registerUser(formData);
    if (typeof fetchData === 'string') {
      toast(fetchData, { type: 'error', autoClose: TOAST_TIMEOUT });
      return false;
    }

    const { response, data } = fetchData;

    if (!response.ok) {
      errorsToasts(data);
      return false;
    }

    const successMsg = `${data.user.username} Registered Successfully!`;
    toast(successMsg, { type: 'success', autoClose: TOAST_TIMEOUT });
    return navigate('/');
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    const msg = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Sign up</h1>
      <Link to={{ pathname: '/login' }} className={styles.link}>
        Have an account?
      </Link>
      <form noValidate className={styles.form} onSubmit={onSubmit}>
        <Input
          placeholder="Username"
          name="username"
          autoComplete="username"
          onChange={handleInput}
          value={formData.username}
        />
        <ErrorMsg>{errors.username}</ErrorMsg>
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
          <Button
            type="submit"
            disabled={
              isAnyError(Object.values(errors)) || !isAllFilled(formData)
            }
          >
            Sign Up
          </Button>
        </div>
      </form>
    </main>
  );
}
