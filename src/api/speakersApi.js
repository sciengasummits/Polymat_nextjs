const BASE_URL = '/api';

export async function fetchSpeakers(category) {
    const url = `${BASE_URL}/speakers?conference=polymat${category ? '&category=' + encodeURIComponent(category) : ''}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
}