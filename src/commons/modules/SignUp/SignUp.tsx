import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Input } from '../../components/Input/Input';
import {
  isAllFilled,
  isAnyError,
  isValidEmail,
  isValidPassword,
  required,
} from '../../utils/validations';
import { apiUrl } from '../../utils/constants';
import styles from '../SignIn/SignIn.module.css';

interface ISignUp {
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
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { ...formData } }),
    };
    const response = await fetch(`${apiUrl}/api/users`, requestOptions);
    const userdata = await response.json();

    if (!response.ok) {
      const errorsKeys = Object.keys(userdata.errors);
      const errorsValues = Object.values(userdata.errors);
      errorsKeys.forEach((key, i) => {
        const keyCap = key[0].toUpperCase() + key.slice(1);
        toast(`${keyCap} ${errorsValues[i]}`, { type: 'error' });
      });
      return false;
    }

    toast(`${userdata.user.username} Registered Successfully!`, {
      type: 'success',
    });
    return navigate('/');
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    let msg: string;
    if (name === 'username') {
      msg = required(value).msg;
    } else if (name === 'email') {
      msg = isValidEmail(value).msg;
    } else if (name === 'password') {
      msg = isValidPassword(value).msg;
    }
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
}
