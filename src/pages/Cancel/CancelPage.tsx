import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from "@/components/ui/button";
import { Layout } from '../../components';

export default function CancelPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get('order_id');

  useEffect(() => {
    // Acciones adicionales si son necesarias
  }, [orderId]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white text-black text-center">
        <div className="max-w-md mx-auto">
          <DotLottieReact
            autoplay
            loop={false}
            src="https://lottie.host/c90d155a-78dc-4863-8862-3c370e05541c/HLX9Hfk4jt.lottie" // Animación de cancelación
            style={{ width: '100%', height: '250px' }}
          />
          <h1 className="text-3xl font-bold mt-6 mb-4">
            Pago cancelado
          </h1>
          <p className="mb-6 text-gray-600">
            El pedido <span className="font-semibold">#{orderId}</span> no se ha completado.
          </p>
          <div className="flex flex-col gap-4">
            <Button 
              onClick={() => (window.location.href = '/cart')}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 text-lg"
            >
              Volver al carrito
            </Button>
            <Button 
              onClick={() => (window.location.href = '/')}
              variant="outline"
              className="px-8 py-4 text-lg"
            >
              Ir a la tienda
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}