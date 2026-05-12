/**
 * useRazorpay — Dynamically injects the Razorpay checkout script only when needed.
 * Prevents the script from loading on every page (which triggers device-access
 * permission popups from Chrome on non-payment pages).
 *
 * Usage:
 *   const razorpayReady = useRazorpay();
 *   // when razorpayReady === true, window.Razorpay is available
 */
import { useState, useEffect } from 'react';

const RAZORPAY_URL = 'https://checkout.razorpay.com/v1/checkout.js';
const SCRIPT_ID = 'razorpay-checkout-js';

export default function useRazorpay() {
    const [ready, setReady] = useState(
        // If already loaded (e.g. navigated back to the page), resolve immediately
        typeof window !== 'undefined' && typeof window.Razorpay === 'function'
    );

    useEffect(() => {
        // Already loaded
        if (typeof window.Razorpay === 'function') {
            setReady(true);
            return;
        }

        // Script tag already injected but not yet loaded
        if (document.getElementById(SCRIPT_ID)) {
            const existing = document.getElementById(SCRIPT_ID);
            const onLoad = () => setReady(true);
            existing.addEventListener('load', onLoad);
            return () => existing.removeEventListener('load', onLoad);
        }

        // Inject fresh script tag
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.src = RAZORPAY_URL;
        script.async = true;
        script.onload = () => setReady(true);
        script.onerror = () => console.error('[useRazorpay] Failed to load Razorpay script.');
        document.body.appendChild(script);
    }, []);

    return ready;
}
