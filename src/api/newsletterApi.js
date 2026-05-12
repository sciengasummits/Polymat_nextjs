const BASE_URL = '/api';

export async function submitSubscribe(payload) {
    const res = await fetch(`${BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'polymat' }),
    });
    if (!res.ok) throw new Error('Failed to subscribe');
    return res.json();
}