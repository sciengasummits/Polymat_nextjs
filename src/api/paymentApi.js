const BASE_URL = '/api';

export async function fetchPaymentKey() {
    const res = await fetch(`${BASE_URL}/payment/key`);
    if (!res.ok) return null;
    return res.json();
}

export async function createPaymentOrder(payload) {
    const res = await fetch(`${BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'polymat' }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create payment order.');
    }
    return res.json();
}

export async function verifyPayment(payload) {
    const res = await fetch(`${BASE_URL}/payment/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Payment verification failed.');
    }
    return res.json();
}