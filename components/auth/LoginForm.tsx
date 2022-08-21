import { useState, useContext, ChangeEvent } from 'react';
import Link from 'next/link';

import styles from '../../styles/auth/LoginForm.module.css';
import { AuthContext } from '../../context/auth';

export const LoginForm = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const { login } = useContext(AuthContext);

  const onInputEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  }
  
  const onInputPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  }

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    login(inputEmail, inputPassword);
  }

  return (
    <form className={styles.loginForm} onSubmit={() => onFormSubmit(event)}>
      <label className={styles.loginLabel}>Email</label> <br />
      <input
        onChange={onInputEmailChange}
        value={inputEmail}
        type='email'
        placeholder='Email...'
        name='email'
        className={styles.loginInput}
      />
      <br /> <br />

      <label className={styles.loginLabel}>Password</label>
      <input
        onChange={onInputPasswordChange}
        value={inputPassword}
        type='password'
        placeholder='Password...'
        name='password'
        className={styles.loginInput}
      />

      <button type='submit' className={styles.loginButton}>Login</button> <br />

      <Link href='/auth/register' passHref>
        <span className={styles.spanLink}>Don't have an account?</span>
      </Link>
    </form>
  );
}