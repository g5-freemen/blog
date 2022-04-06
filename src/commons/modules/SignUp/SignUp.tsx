/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { apiUrl } from '../../utils/constants';
import styles from '../SignIn/SignIn.module.css';

interface ISignUp {
  username: string;
  email: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

export default function SignUp() {
  const navigate = useNavigate();

  const methods = useForm<ISignUp>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = methods;

  const onSubmit = async (data: ISignUp) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { ...data } }),
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

  const submit = handleSubmit(onSubmit);

  useEffect(() => {
    reset();
    return () => reset();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign up</h1>
      <Link to={{ pathname: '/login' }} className={styles.link}>
        Have an account?
      </Link>
      <FormProvider {...methods}>
        <form noValidate className={styles.form} onSubmit={submit}>
          <Input placeholder="Username" {...register('username')} />
          <ErrorMsg>{errors.username?.message}</ErrorMsg>
          <Input type="email" placeholder="Email" {...register('email')} />
          <ErrorMsg>{errors.email?.message}</ErrorMsg>
          <Input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            {...register('password')}
          />
          <ErrorMsg>{errors.password?.message}</ErrorMsg>
          <div className={styles.right}>
            <Button type="submit" disabled={!isValid}>
              Sign Up
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
