const BASE_URL = '/api';

export async function fetchSponsors(type) {
    const url = `${BASE_URL}/sponsors?conference=polymat${type ? '&type=' + encodeURIComponent(type) : ''}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
}