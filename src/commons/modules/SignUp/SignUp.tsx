import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import styles from '../SignIn/SignIn.module.css';

export default function SignUp() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign up</h1>
      <Link to={{ pathname: '/login' }} className={styles.link}>
        Have an account?
      </Link>
      <form className={styles.form}>
        <Input placeholder="Username" name="username" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <div className={styles.right}>
          <Button className={styles.button} type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
