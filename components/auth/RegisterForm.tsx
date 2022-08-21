import { useState, useContext, ChangeEvent } from 'react';
import Link from 'next/link';

import styles from '../../styles/auth/RegisterForm.module.css';
import { AuthContext } from '../../context/auth';

export const RegisterForm = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const { register } = useContext(AuthContext);

  const onInputEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  }

  const onInputPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  }

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    register(inputEmail, inputPassword);
  }

  return (
    <form className={styles.registerForm} onSubmit={() => onFormSubmit(event)}>
      <label className={styles.registerLabel}>Email</label> <br />
      <input
        onChange={onInputEmailChange}
        value={inputEmail}
        type='email'
        placeholder='Email...'
        name='email'
        className={styles.registerInput}
      />
      <br /> <br />

      <label className={styles.registerLabel}>Password</label>
      <input
        onChange={onInputPasswordChange}
        value={inputPassword}
        type='password'
        placeholder='Password...'
        name='password'
        className={styles.registerInput}
      />

      <button type='submit' className={styles.registerButton}>Register</button> <br />

      <Link href='/auth/login' passHref>
        <span className={styles.spanLink}>Already have an account?</span>
      </Link>
    </form>
  );
}