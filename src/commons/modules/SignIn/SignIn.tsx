import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImEyeBlocked, ImEye } from 'react-icons/im';
import { Button } from '../../components/Button/Button';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Input } from '../../components/Input/Input';
import { selectShowPassword, setShowPassword } from '../../redux/reducers/globalReducer';
import { setUser } from '../../redux/reducers/userReducer';
import { errorsToasts } from '../../utils/errorsToasts';
import { loginUser } from '../../utils/httpServices/loginServices';
import { isAllFilled, isAnyError, validate } from '../../utils/validations';
import { cookiesOptions, TOAST_TIMEOUT } from '../../utils/constants';
import styles from './SignIn.module.css';
import Spinner from '../../components/Spinner/Spinner';

export interface ISignIn {
  email: string;
  password: string;
}

const defaultFormValues: ISignIn = {
  email: '',
  password: '',
};

const iconStyle = { width: '24px', height: '24px', opacity: 0.6 };

export default function SignIn() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showPassword: boolean = useSelector(selectShowPassword);
  const [formData, setFormData] = useState(defaultFormValues);
  const [errors, setErrors] = useState(defaultFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsSubmitting(true);

    const fetchData = await loginUser(formData);
    if (typeof fetchData === 'string') {
      toast(fetchData, { type: 'error', autoClose: TOAST_TIMEOUT });
      setIsSubmitting(false);
      return false;
    }

    const { response, data } = fetchData;
    if (!response.ok) {
      errorsToasts(data);
      setIsSubmitting(false);
      return false;
    }

    const { token, ...user } = data.user;
    dispatch(setUser(user));
    cookies.set('token', token, cookiesOptions);
    const successMsg = `${data.user.username} Logged in`;
    toast(successMsg, { type: 'success', autoClose: TOAST_TIMEOUT });
    setIsSubmitting(false);
    return navigate('/');
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });

    const msg = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const toggleShowPassword = () => dispatch(setShowPassword(!showPassword));

  return (
    <main className={styles.container}>
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
        <div className={styles.row}>
          <Input
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            value={formData.password}
          />
          <button
            type="button"
            aria-label="show/hide password button"
            className={styles.pswdBtn}
            onClick={toggleShowPassword}
          >
            {showPassword ? <ImEye style={iconStyle} /> : <ImEyeBlocked style={iconStyle} />}
          </button>
        </div>
        <ErrorMsg>{errors.password}</ErrorMsg>
        <div className={styles.right}>
          <Button
            className={styles.submitBtn}
            type="submit"
            disabled={isAnyError(Object.values(errors)) || !isAllFilled(formData) || isSubmitting}
          >
            {isSubmitting ? <Spinner /> : 'Sign In'}
          </Button>
        </div>
      </form>
    </main>
  );
}
