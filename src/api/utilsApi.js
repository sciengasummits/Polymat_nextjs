const BASE_URL = '/api';

export const resolveImageUrl = (url) => {
    if (!url) return '';
    const backendOrigin = BASE_URL.replace(/\/api$/, '');
    let secureUrl = url;
    // Only replace localhost origins if we have a defined backend origin to replace it with
    if (backendOrigin && (secureUrl.includes('localhost:5050') || secureUrl.includes('localhost:5000'))) {
        secureUrl = secureUrl.replace(/https?:\/\/localhost:(5050|5000)/g, backendOrigin);
    }
    if (typeof window !== 'undefined' && secureUrl.includes('localhost:5173')) {
        secureUrl = secureUrl.replace(/https?:\/\/localhost:5173/g, window.location.origin);
    }
    if (secureUrl.startsWith('http://') || secureUrl.startsWith('https://')) {
        return secureUrl;
    }
    if (secureUrl.startsWith('/uploads') || secureUrl.startsWith('uploads/')) {
        return secureUrl.startsWith('/') ? `${backendOrigin}${secureUrl}` : `${backendOrigin}/${secureUrl}`;
    }
    return secureUrl;
};