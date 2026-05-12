const BASE_URL = '/api';

export async function submitAbstract(payload) {
    const res = await fetch(`${BASE_URL}/abstracts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'polymat' }),
    });
    if (!res.ok) throw new Error('Server error');
    return res.json();
}

export async function uploadAbstractFile(file) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`${BASE_URL}/upload-file`, { method: 'POST', body: fd });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || errData.message || 'Upload failed');
    }
    return res.json();
}