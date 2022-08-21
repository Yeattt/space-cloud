import { NextPage } from 'next';

import { AuthLayout } from '../../components/layouts';
import { RegisterForm } from '../../components/auth';
import styles from '../../styles/auth/Register.module.css';

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title='SC - Register'>
      <div className={styles.formContainer}>
        <RegisterForm />
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;