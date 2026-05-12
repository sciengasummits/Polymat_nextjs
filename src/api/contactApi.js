const BASE_URL = '/api';

export async function submitContactMessage(payload) {
    const res = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'polymat' }),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
}