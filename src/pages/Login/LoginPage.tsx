// LoginPage.tsx
import { LoginForm } from '../../components';
import heroImage from '../../assets/images/hero2.jpeg';
import logo from '../../assets/images/logo.png';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen w-full'>
    <div className='w-[100%] md:w-[30%] h-screen flex flex-col items-center justify-center'>
      <div className='w-full'>
        <a href="/">
          <img src={logo} alt="" width={150} height="auto" className='absolute left-5 top-5'/>
        </a>
        <LoginForm />
      </div>
    </div>
    <div className='w-[100%] md:w-[70%] h-screen hidden md:block'>
      <img className='login-image' src={heroImage} alt="" />
    </div>
  </div>
  );
};

export default LoginPage;