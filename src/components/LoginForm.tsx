import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate(); // Inicializa el hook useNavigate
  const { setUser } = useUserStore();

  const validateEmail = (email: string) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formato del correo electrónico
    if (!validateEmail(email)) {
      setEmailError('El formato del email no es válido.');
      return;
    }
    setEmailError('');

    try {
      const response = await axios.post('https://server.blacksheepclothing.es/auth/login/', {
        email,
        password,
      }, {
        withCredentials: true, // Asegúrate de enviar las credenciales
      });
      const { accessToken, user } = response.data;
      setUser(user, accessToken);
      navigate('/profile');
    } catch (error) {
      setError('Email o contraseña incorrectos. Intentalo de nuevo.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md bg-white rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-barlow font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='tucorreo@gmail.com'
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {emailError && <p className="text-red-500 text-xs italic my-4">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='********'
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-gray-300 hover:text-black transition duration-300 text-white font-barlow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Iniciar sesión
            </button>
          </div>
          <div className='flex items-center justify-center mt-5'>
          <span className='font-barlow'>¿Todavía no tienes cuenta? <a className='text-blue-500 cursor-pointer underline' href='/register'>Crea una</a></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
