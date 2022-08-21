import { NextPage } from 'next';

import { AuthLayout } from '../../components/layouts';
import { LoginForm } from '../../components/auth';
import styles from '../../styles/auth/Login.module.css';

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title='SC - Register'>
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}

export default LoginPage;