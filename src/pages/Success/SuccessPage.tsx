import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from "@/components/ui/button";
import { Layout } from '../../components';

export default function SuccessPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get('order_id');

  useEffect(() => {
    // Aquí puedes realizar alguna acción adicional si es necesario
  }, [orderId]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white text-black text-center">
        <div className="max-w-md mx-auto">
          <DotLottieReact
            autoplay
            src="https://lottie.host/74cbe8f2-fac2-437f-ba12-6678beb9dc22/hd0rpFuA7V.json" // Animación de éxito
            style={{ width: '100%', height: '300px' }}
          />
          <h1 className="text-3xl font-bold mt-6 mb-4">
            ¡Pago completado con éxito!
          </h1>
          <p className="mb-6 text-gray-600">
            Tu pedido <span className="font-semibold">#{orderId}</span> ha sido procesado correctamente.
          </p>
          <Button 
            onClick={() => (window.location.href = '/')}
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </Layout>
  );
}