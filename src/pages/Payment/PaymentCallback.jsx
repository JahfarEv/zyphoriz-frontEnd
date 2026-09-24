import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';

export default function PaymentCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verify = async () => {
      const orderId = params.get('order_id');
      const businessId = sessionStorage.getItem('pendingBusinessId');
      const savedOrderId = sessionStorage.getItem('pendingOrderId');

      if (!orderId || !businessId || orderId !== savedOrderId) {
        setMessage('Payment details are missing. Please contact support.');
        return;
      }

      try {
        let lastError;

        for (let attempt = 0; attempt < 5; attempt += 1) {
          try {
            const result = await api.payments.checkout({
              businessId,
              orderId,
            });

            if (result.payment?.status === 'success') {
              sessionStorage.removeItem('pendingBusinessId');
              sessionStorage.removeItem('pendingOrderId');

              navigate('/payment/success', {
                replace: true,
                state: result,
              });
              return;
            }
          } catch (error) {
            lastError = error;
          }

          setMessage(
            'Payment received. Waiting for Cashfree to confirm it...'
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        setMessage(
          lastError?.message ||
          'Payment confirmation is taking longer than expected. Please refresh this page shortly.'
        );
      } catch (error) {
        setMessage(
          error.message || 'Unable to verify payment. Please try again.'
        );
      }
    };

    verify();
  }, [params, navigate]);

  return (
    <main style={{ padding: 40, textAlign: 'center' }}>
      <h2>Payment verification</h2>
      <p>{message}</p>
    </main>
  );
}