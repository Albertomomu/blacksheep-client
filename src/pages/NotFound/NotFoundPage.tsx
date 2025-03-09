import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from "@/components/ui/button";
import { Layout } from '../../components';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white text-black text-center">
        <div className="max-w-md mx-auto">
          <DotLottieReact
            autoplay
            loop
            src="https://lottie.host/340a1a71-cdca-4033-a74e-2d8bf8ab4b1b/sK1348bxdk.lottie" // Animación de 404

          />
          <h1 className="text-3xl font-bold mt-6 mb-4">
            Página no encontrada
          </h1>
          <p className="mb-6 text-gray-600">
            Lo sentimos, la página que buscas no existe.
          </p>
          <Button 
            onClick={() => (window.location.href = '/')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 text-lg"
          >
            Volver a la tienda
          </Button>
        </div>
      </div>
    </Layout>
  );
}
