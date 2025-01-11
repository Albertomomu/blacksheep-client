import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Loader from './Loader';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate(); // Inicializa el hook useNavigate
  const setUser = useUserStore((state) => state.setUser);

  const validateEmail = (email: string) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validar el formato del correo electrónico
    if (!validateEmail(email)) {
      setLoading(false);
      setEmailError('El formato del email no es válido.');
      return;
    }
    setEmailError('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login/', {
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const { accessToken, user } = response.data;
      if (user && accessToken) {
        setUser(user, accessToken);
        navigate('/profile');
      } else {
        throw new Error('Respuesta del servidor incompleta');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          if (error.response.status === 401) {
            setError('Email o contraseña incorrectos. Inténtalo de nuevo.');
          } else {
            setError(`Error del servidor: ${error.response.data.message || 'Algo salió mal'}`);
          }
        } else if (error.request) {
          // La solicitud se hizo pero no se recibió respuesta
          setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        } else {
          // Algo ocurrió al configurar la solicitud
          setError(`Error de configuración: ${error.message}`);
        }
        console.error('Error de inicio de sesión:', error.message);
      } else {
        // Error no relacionado con Axios
        setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
        console.error('Error inesperado:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {loading && (
        <Loader />
      )}
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
