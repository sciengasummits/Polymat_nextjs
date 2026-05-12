const BASE_URL = '/api';

export async function submitRegistration(payload) {
    const res = await fetch(`${BASE_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'polymat' }),
    });
    if (!res.ok) throw new Error('Server error');
    return res.json();
}