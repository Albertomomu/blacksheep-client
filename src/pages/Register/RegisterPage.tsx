// LoginPage.tsx
import { RegisterForm } from '../../components';
import heroImage from '../../assets/images/hero2.jpeg';
import logo from '../../assets/images/logo.png';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen w-full'>
    <div className='w-[100%] md:w-[30%] h-screen flex flex-col items-center justify-center'>
      <div className='w-full h-full flex flex-col items-center justify-end'>
        <img src={logo} alt="" width={150} height="auto" className='absolute left-5 top-5'/>
        <RegisterForm />
      </div>
    </div>
    <div className='w-[100%] md:w-[70%] h-screen hidden md:block'>
      <img className='login-image' src={heroImage} alt="" />
    </div>
  </div>
  );
};

export default RegisterPage;