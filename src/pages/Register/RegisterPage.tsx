// LoginPage.tsx
import { RegisterForm } from '../../components';
import heroImage from '../../assets/images/hero2.jpeg';
import logo from '../../assets/images/logo.png';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen w-full'>
      <div className='w-[100%] md:w-[30%] h-screen flex flex-col  justify-between'>
          <div className='mt-8 pl-8'>
              <a href="/">
                  <img src={logo} alt="" width={150} height="auto"/>
              </a>
          </div>
          <div className='flex-1 flex items-center justify-center'>
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