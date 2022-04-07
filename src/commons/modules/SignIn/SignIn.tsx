import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import styles from './SignIn.module.css';

export default function SignIn() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in</h1>
      <Link to={{ pathname: '/register' }} className={styles.link}>
        Need an account?
      </Link>
      <form className={styles.form}>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <div className={styles.right}>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </div>
  );
}
