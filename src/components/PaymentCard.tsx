import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PaymentCard = ({ onPaymentMethodCreated }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (cardError) {
      setError(cardError.message);
      onPaymentMethodCreated(null); // Limpiar el método de pago en caso de error
    } else {
      setError(null);
      onPaymentMethodCreated(paymentMethod); // Establecer el método de pago válido
    }
  };

  return (
    <>
      {/* Formulario para enviar los datos de la tarjeta */}
      <form onSubmit={handleSubmit}>
        {/* Elemento de tarjeta de Stripe */}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {/* Mostrar mensaje de error si hay alguno */}
        {error && (<div className="text-red-500 mt-2">{error}</div>)}
      </form> 
    </>
  );
};

export default PaymentCard;
