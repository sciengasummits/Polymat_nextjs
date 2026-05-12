const BASE_URL = '/api';

export async function validateDiscountCode(coupon) {
    try {
        const res = await fetch(`${BASE_URL}/discounts/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coupon, conference: 'polymat' }),
        });
        if (!res.ok) throw new Error('Server error');
        return res.json();
    } catch (e) {
        console.warn('Discount validate failed:', e.message);
        return { valid: false, message: 'Could not reach server. Please try again.' };
    }
}