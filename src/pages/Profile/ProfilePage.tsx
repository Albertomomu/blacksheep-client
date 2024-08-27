// src/components/LoginPage.tsx
import React from 'react';
import useUserStore from '../../store/userStore';

const LoginPage: React.FC = () => {
  // Usa el hook de Zustand para acceder al estado global
  const { user } = useUserStore();

  return (
    <div className="login-page">
      <h1>Bienvenido a Black Sheep</h1>
      {user ? (
        <>
          <p>Hola, {user.firstName} {user.lastName}!</p>
          <a className='bg-black text-white font-barlow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-12' href="/products">Visitar tienda</a>
        </>
      ) : (
        <p>Por favor, inicia sesión para ver tu información.</p>
      )}
      {/* Puedes agregar más contenido aquí, como enlaces, imágenes, etc. */}
    </div>
  );
};

export default LoginPage;