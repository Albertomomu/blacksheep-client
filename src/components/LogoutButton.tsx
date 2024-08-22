// src/components/LogoutButton.tsx
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/'); // Redirige al usuario a la página home
  };

  if (!user) {
    // No muestra el botón si el usuario no está logueado
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 font-barlow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
