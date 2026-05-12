'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Tag, CheckCircle, XCircle, Loader, ShieldCheck, AlertCircle, PartyPopper } from 'lucide-react';
import './OnlineRegistration.css';
import { countries } from '../../assets/constants/countries';

import { fetchContent, fetchAllContent } from '../../api/contentApi';
import { submitAbstract, uploadAbstractFile } from '../../api/abstractsApi';
import { fetchSpeakers } from '../../api/speakersApi';
import { fetchUniversities } from '../../api/universitiesApi';
import { fetchSponsors } from '../../api/sponsorsApi';
import { submitRegistration } from '../../api/registrationsApi';
import { validateDiscountCode } from '../../api/discountsApi';
import { fetchPaymentKey, createPaymentOrder, verifyPayment } from '../../api/paymentApi';
import { submitSubscribe } from '../../api/newsletterApi';
import { submitContactMessage } from '../../api/contactApi';
import { submitProgramRequest } from '../../api/programRequestApi';
import { resolveImageUrl } from '../../api/utilsApi';

const siteApi = {
  fetchContent, fetchAllContent, submitAbstract, uploadAbstractFile,
  fetchSpeakers, fetchUniversities, fetchSponsors, submitRegistration,
  validateDiscountCode, fetchPaymentKey, createPaymentOrder, verifyPayment,
  submitSubscribe, submitContactMessage, submitProgramRequest, resolveImageUrl
};


import { PRICING_DEFAULTS as DEFAULTS } from '../../data/registrationPricing';

/* ── Apply discount % to a price ────────────────────────────── */
const applyPct = (price, pct) => Math.round(price * (1 - pct / 100));

const OnlineRegistration = () => {
    /* ── Live pricing loaded from backend (same source as Register page) ── */
    const [regPricing, setRegPricing] = useState(DEFAULTS);

    useEffect(() => {
        siteApi.fetchContent('registration-prices')
            .then(data => {
                if (data && !data.error) {
                    setRegPricing(prev => ({ ...prev, ...data }));
                }
            })
            .catch(e => console.warn('[OnlineRegistration] Could not load pricing:', e.message));
    }, []);

    /* ── Derive active phase from live backend dates ─────────── */
    const getActivePhase = () => {
        const now = new Date();
        const earlyBirdEnd = new Date(regPricing.earlyBirdEndDate || DEFAULTS.earlyBirdEndDate);
        const standardEnd = new Date(regPricing.standardEndDate || DEFAULTS.standardEndDate);
        if (now <= earlyBirdEnd) return 'early';
        if (now <= standardEnd) return 'standard';
        return 'onspot';
    };
    const activePhase = getActivePhase();

    /* ── Discount state ──────────────────────────────────────── */
    const [couponInput, setCouponInput] = useState('');
    const [couponStatus, setCouponStatus] = useState('idle'); // 'idle' | 'checking' | 'valid' | 'invalid'
    const [discount, setDiscount] = useState(null); // { percentage, category, coupon }
    const [couponMsg, setCouponMsg] = useState('');

    /* ── Registration form state ─────────────────────────────── */
    const [formData, setFormData] = useState({
        designation: '',
        fullName: '',
        email: '',
        telephone: '',
        country: '',
        company: '',
        address: '',
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [selectedSponsorship, setSelectedSponsorship] = useState(null);
    const [includeAccompanying, setIncludeAccompanying] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
    const [successInfo, setSuccessInfo] = useState(null); // { name, email, category, total }

    /* ── Derived pricing with discount applied (base from live backend) ── */
    const regDiscount = discount && (discount.category === 'registration' || discount.category === 'both')
        ? discount.percentage : 0;
    const accomDiscount = discount && (discount.category === 'accommodation' || discount.category === 'both')
        ? discount.percentage : 0;

    // Use live backend categories as the base — same source as Register page
    const basePricing = regPricing.categories || DEFAULTS.categories;
    const pricingData = basePricing.map(item => ({
        ...item,
        early: applyPct(Number(item.early), regDiscount),
        standard: applyPct(Number(item.standard), regDiscount),
        onspot: applyPct(Number(item.onspot), regDiscount),
    }));

    const baseSponsorships = regPricing.sponsorships || DEFAULTS.sponsorships;
    const sponsorshipPricing = baseSponsorships.map(item => ({
        ...item,
        price: applyPct(Number(item.price), regDiscount),
    }));

    const accommodationOptions = regPricing.accommodation || DEFAULTS.accommodation;
    const accompanyingPersonPrice = Number(regPricing.accompanyingPersonPrice ?? DEFAULTS.accompanyingPersonPrice);

    /* ── Validate coupon ─────────────────────────────────────── */
    const handleValidateCoupon = useCallback(async () => {
        const code = couponInput.trim().toUpperCase();
        if (!code) {
            setCouponMsg('Please enter a discount code.');
            setCouponStatus('invalid');
            return;
        }
        setCouponStatus('checking');
        setCouponMsg('');
        const result = await siteApi.validateDiscountCode(code);
        if (result.valid) {
            setDiscount(result);
            setCouponStatus('valid');
            setCouponMsg(`✅ "${result.coupon}" applied — ${result.percentage}% off ${result.category === 'both' ? 'registration & accommodation'
                : result.category === 'accommodation' ? 'accommodation'
                    : 'registration'
                }!`);
        } else {
            setDiscount(null);
            setCouponStatus('invalid');
            setCouponMsg(result.message || 'Invalid or expired code.');
        }
    }, [couponInput]);

    const handleRemoveCoupon = () => {
        setDiscount(null);
        setCouponInput('');
        setCouponStatus('idle');
        setCouponMsg('');
    };

    /* ── Total calculation (uses live backend prices) ──────── */
    const calculateTotal = () => {
        let total = 0;
        if (selectedCategory) {
            const item = pricingData.find(p => p.id === selectedCategory);
            if (item) total += item[activePhase];
        }
        if (selectedSponsorship) {
            const item = sponsorshipPricing.find(p => p.id === selectedSponsorship);
            if (item) total += item.price;
        }
        if (includeAccompanying) total += accompanyingPersonPrice;
        if (selectedAccommodation) {
            const [nights, type] = selectedAccommodation.split('-');
            const opt = accommodationOptions.find(o => o.nights === parseInt(nights));
            if (opt) total += accomDiscount > 0 ? applyPct(Number(opt[type]), accomDiscount) : Number(opt[type]);
        }
        return total;
    };

    /* ── Form handlers ───────────────────────────────────────── */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({ designation: '', fullName: '', email: '', telephone: '', country: '', company: '', address: '' });
        setSelectedCategory(null);
        setSelectedAccommodation(null);
        setSelectedSponsorship(null);
        setIncludeAccompanying(false);
        setTermsAccepted(false);
        setSubmitStatus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email) {
            alert('Please fill in your Full Name and Email before submitting.');
            return;
        }
        if (!termsAccepted) {
            alert('Please accept the terms & conditions.');
            return;
        }

        const total = calculateTotal();

        const descParts = [];
        if (selectedCategory) {
            const cat = pricingData.find(p => p.id === selectedCategory);
            if (cat) descParts.push(`${cat.label} : $${cat[activePhase]}`);
        }
        if (selectedSponsorship) {
            const sp = sponsorshipPricing.find(p => p.id === selectedSponsorship);
            if (sp) descParts.push(`${sp.label} : $${sp.price}`);
        }
        if (includeAccompanying) descParts.push(`Accompanying Person : $${accompanyingPersonPrice}`);
        if (selectedAccommodation) descParts.push(`Accommodation : ${selectedAccommodation}`);
        if (discount) descParts.push(`Discount Code: ${discount.coupon} (${discount.percentage}% off)`);

        const payload = {
            title: formData.designation,
            name: formData.fullName,
            email: formData.email,
            phone: formData.telephone,
            country: formData.country,
            company: formData.company,
            address: formData.address,
            registrationCategory: selectedCategory
                ? pricingData.find(p => p.id === selectedCategory)?.label || '' : '',
            accommodation: selectedAccommodation || '',
            sponsorship: selectedSponsorship
                ? sponsorshipPricing.find(p => p.id === selectedSponsorship)?.label || '' : '',
            accompanyingPerson: includeAccompanying,
            totalAmount: total,
            description: descParts.join('\n'),
            status: 'Pending',
        };

        setSubmitting(true);
        setSubmitStatus(null);
        try {
            // 1. Create registration record (Pending)
            const registration = await siteApi.submitRegistration(payload);
            if (!registration || registration.error) throw new Error(registration?.error || 'Failed to save registration.');

            // 2. Fetch Razorpay key & Create order
            const { key } = await siteApi.fetchPaymentKey();
            const { order } = await siteApi.createPaymentOrder({
                amount: total,
                registrationId: registration._id,
                description: `POLYMAT Online Reg: ${formData.fullName}`
            });

            // 3. Open Razorpay Checkout
            const options = {
                key: key,
                amount: order.amount,
                currency: order.currency,
                name: 'POLYMAT Summit 2026',
                description: `Payment for ${formData.fullName}`,
                order_id: order.id,
                prefill: {
                    name: formData.fullName,
                    email: formData.email,
                    contact: formData.telephone,
                },
                theme: { color: '#2563eb' },
                handler: async (response) => {
                    // 4. Verify Payment
                    try {
                        const verifyResult = await siteApi.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            registrationId: registration._id,
                        });

                        if (verifyResult.success) {
                            // Capture details BEFORE handleReset() wipes form state
                            const catLabel = pricingData.find(p => p.id === selectedCategory)?.label || selectedCategory || 'N/A';
                            setSuccessInfo({
                                name: formData.fullName,
                                email: formData.email,
                                category: catLabel,
                                total,
                                paymentId: response.razorpay_payment_id,
                            });
                            setSubmitStatus('success');
                            handleReset();
                        } else {
                            throw new Error(verifyResult.message || 'Payment verification failed.');
                        }
                    } catch (err) {
                        alert('Payment success but verification failed: ' + err.message);
                        setSubmitStatus('error');
                    }
                },
                modal: {
                    ondismiss: () => {
                        setSubmitting(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error('Registration/Payment error:', err);
            setSubmitStatus('error');
            alert(err.message || 'An error occurred during registration.');
        } finally {
            setSubmitting(false);
        }
    };

    /* ── Render ──────────────────────────────────────────────── */

    /* ── Full-page Success Screen ────────────────────────────── */
    if (submitStatus === 'success') {
        return (
            <div className="online-reg-page">
                <div className="page-header">
                    <div className="container">
                        <h1 className="page-title">Registration Complete</h1>
                        <p className="page-breadcrumb">Home / Register / Discount / Confirmed</p>
                    </div>
                </div>
                <div className="container section-padding">
                    <div className="or-success-screen">
                        {/* Animated checkmark */}
                        <div className="or-success-icon-wrap">
                            <div className="or-success-circle">
                                <CheckCircle size={56} className="or-success-check" />
                            </div>
                        </div>

                        <h2 className="or-success-headline">Registration Confirmed! 🎉</h2>
                        <p className="or-success-sub">
                            Thank you, <strong>{successInfo?.name}</strong>. Your payment was verified
                            and your registration is now <span className="or-success-badge">PAID</span>.
                        </p>

                        {/* Summary card */}
                        <div className="or-success-card">
                            <div className="or-success-row">
                                <span className="or-success-label">Name</span>
                                <span className="or-success-value">{successInfo?.name}</span>
                            </div>
                            <div className="or-success-row">
                                <span className="or-success-label">Email</span>
                                <span className="or-success-value">{successInfo?.email}</span>
                            </div>
                            <div className="or-success-row">
                                <span className="or-success-label">Category</span>
                                <span className="or-success-value">{successInfo?.category}</span>
                            </div>
                            <div className="or-success-row or-success-row--total">
                                <span className="or-success-label">Total Paid</span>
                                <span className="or-success-value or-success-amount">${successInfo?.total} USD</span>
                            </div>
                            {successInfo?.paymentId && (
                                <div className="or-success-row">
                                    <span className="or-success-label">Payment ID</span>
                                    <span className="or-success-value or-success-pid">{successInfo.paymentId}</span>
                                </div>
                            )}
                        </div>

                        {/* What's next */}
                        <div className="or-success-next">
                            <h3 className="or-success-next-title">What happens next?</h3>
                            <ul className="or-success-steps">
                                <li>📧 A confirmation email will be sent to <strong>{successInfo?.email}</strong></li>
                                <li>📋 Your registration details are being processed by the organizing team</li>
                                <li>🗓️ You'll receive agenda and venue details closer to the event</li>
                                <li>❓ Questions? Contact us at <a href="mailto:polymat@sciengasummits.com">polymat@sciengasummits.com</a></li>
                            </ul>
                        </div>

                        <a href="/" className="or-success-home-btn">← Back to Home</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="online-reg-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Discount Registration</h1>
                    <p className="page-breadcrumb">Home / Register / Discount</p>
                </div>
            </div>

            <div className="container section-padding">
                <div className="online-reg-container">

                    {/* ── Stripe Badge ── */}
                    <div className="stripe-badge-wrapper">
                        <div className="stripe-badge">
                            <div className="stripe-header">
                                <span className="stripe-logo">stripe</span>
                                <span className="stripe-text">Secure<br />Payments</span>
                            </div>
                            <div className="stripe-cards">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg" alt="JCB" />
                            </div>
                        </div>
                    </div>

                    {/* ── Discount Code Section ── */}
                    <div className="discount-code-section">
                        <div className="discount-code-header">
                            <Tag size={18} className="discount-icon" />
                            <h3 className="discount-code-title">Have a Discount Code?</h3>
                        </div>
                        <p className="discount-code-desc">
                            Enter the discount code provided by the organizers to get reduced pricing.
                        </p>
                        <div className="discount-input-row">
                            <input
                                type="text"
                                className={`discount-code-input${couponStatus === 'valid' ? ' discount-input--valid' : couponStatus === 'invalid' ? ' discount-input--invalid' : ''}`}
                                placeholder="Enter discount code (e.g. SAVE20)"
                                value={couponInput}
                                onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponStatus('idle'); setDiscount(null); setCouponMsg(''); }}
                                onKeyDown={e => e.key === 'Enter' && handleValidateCoupon()}
                                disabled={couponStatus === 'valid'}
                                maxLength={30}
                            />
                            {couponStatus !== 'valid' ? (
                                <button
                                    className="discount-apply-btn"
                                    onClick={handleValidateCoupon}
                                    disabled={couponStatus === 'checking' || !couponInput.trim()}
                                >
                                    {couponStatus === 'checking'
                                        ? <><Loader size={15} className="spin-icon" /> Checking…</>
                                        : <><ShieldCheck size={15} /> Apply Code</>}
                                </button>
                            ) : (
                                <button className="discount-remove-btn" onClick={handleRemoveCoupon}>
                                    <XCircle size={15} /> Remove
                                </button>
                            )}
                        </div>
                        {couponMsg && (
                            <div className={`discount-msg ${couponStatus === 'valid' ? 'discount-msg--valid' : 'discount-msg--invalid'}`}>
                                {couponStatus === 'valid' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                <span>{couponMsg}</span>
                            </div>
                        )}
                    </div>

                    {/* ── Personal Details Form ── */}
                    <form className="online-reg-form" onSubmit={handleSubmit}>

                        <div className="or-section-label">Personal Details</div>
                        <div className="reg-form-grid">
                            <div className="form-group">
                                <select name="designation" value={formData.designation} onChange={handleChange} className="reg-control">
                                    <option value="">Select Title</option>
                                    <option value="Mr">Mr.</option>
                                    <option value="Mrs">Mrs.</option>
                                    <option value="Ms">Ms.</option>
                                    <option value="Dr">Dr.</option>
                                    <option value="Prof">Prof.</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ position: 'relative' }}>
                                <input
                                    type="text" name="fullName" placeholder="Full Name"
                                    value={formData.fullName} onChange={handleChange}
                                    className="reg-control" required
                                />
                                <span className="or-required-star">*</span>
                            </div>
                            <div className="form-group" style={{ position: 'relative' }}>
                                <input
                                    type="email" name="email" placeholder="Email Address"
                                    value={formData.email} onChange={handleChange}
                                    className="reg-control" required
                                />
                                <span className="or-required-star">*</span>
                            </div>
                            <div className="form-group" style={{ position: 'relative' }}>
                                <input
                                    type="tel" name="telephone" placeholder="Phone Number"
                                    value={formData.telephone} onChange={handleChange}
                                    className="reg-control" required
                                />
                                <span className="or-required-star">*</span>
                            </div>
                            <div className="form-group">
                                <select name="country" value={formData.country} onChange={handleChange} className="reg-control">
                                    <option value="">Select Country</option>
                                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text" name="company" placeholder="Company / University"
                                    value={formData.company} onChange={handleChange}
                                    className="reg-control"
                                />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <textarea
                                    name="address" placeholder="Address"
                                    value={formData.address} onChange={handleChange}
                                    className="reg-control" rows="3"
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                        </div>

                        {/* ── Registration Category Table ── */}
                        <div className="or-section-label" style={{ marginTop: '2rem' }}>
                            Select Registration Category
                            {discount && regDiscount > 0 && (
                                <span className="or-discount-badge">
                                    {discount.percentage}% OFF applied
                                </span>
                            )}
                        </div>

                        <table className="or-pricing-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th className={activePhase === 'early' ? 'or-active-col' : ''}>
                                        Early Bird<br /><span className="or-date">{new Date(regPricing.earlyBirdEndDate || DEFAULTS.earlyBirdEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        {activePhase === 'early' && <span className="or-active-badge">ACTIVE</span>}
                                    </th>
                                    <th className={activePhase === 'standard' ? 'or-active-col' : ''}>
                                        Standard<br /><span className="or-date">{new Date(regPricing.standardEndDate || DEFAULTS.standardEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        {activePhase === 'standard' && <span className="or-active-badge">ACTIVE</span>}
                                    </th>
                                    <th className={activePhase === 'onspot' ? 'or-active-col' : ''}>
                                        On-Spot<br /><span className="or-date">{new Date(regPricing.onspotEndDate || DEFAULTS.onspotEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        {activePhase === 'onspot' && <span className="or-active-badge">ACTIVE</span>}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pricingData.map(item => (
                                    <tr
                                        key={item.id}
                                        className={selectedCategory === item.id ? 'or-selected-row' : ''}
                                        onClick={() => setSelectedCategory(item.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>
                                            <label className="or-radio-label">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={selectedCategory === item.id}
                                                    onChange={() => setSelectedCategory(item.id)}
                                                />
                                                {item.label}
                                            </label>
                                        </td>
                                        <td className={activePhase === 'early' && selectedCategory === item.id ? 'or-selected-price' : ''}>
                                            <span className={activePhase === 'early' ? 'or-price-active' : ''}>
                                                ${item.early}
                                                {regDiscount > 0 && (
                                                    <span className="or-original-price">${basePricing.find(b => b.id === item.id)?.early}</span>
                                                )}
                                            </span>
                                        </td>
                                        <td className={activePhase === 'standard' && selectedCategory === item.id ? 'or-selected-price' : ''}>
                                            <span className={activePhase === 'standard' ? 'or-price-active' : ''}>
                                                ${item.standard}
                                                {regDiscount > 0 && (
                                                    <span className="or-original-price">${basePricing.find(b => b.id === item.id)?.standard}</span>
                                                )}
                                            </span>
                                        </td>
                                        <td className={activePhase === 'onspot' && selectedCategory === item.id ? 'or-selected-price' : ''}>
                                            <span className={activePhase === 'onspot' ? 'or-price-active' : ''}>
                                                ${item.onspot}
                                                {regDiscount > 0 && (
                                                    <span className="or-original-price">${basePricing.find(b => b.id === item.id)?.onspot}</span>
                                                )}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* ── Sponsorship Table ── */}
                        <div className="or-section-label" style={{ marginTop: '2rem' }}>Sponsorship Opportunities</div>
                        <table className="or-pricing-table or-sponsorship-table">
                            <thead>
                                <tr>
                                    {sponsorshipPricing.map(item => <th key={item.id}>{item.label}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {sponsorshipPricing.map(item => (
                                        <td key={item.id}>
                                            <label className="or-radio-label" style={{ justifyContent: 'center' }}>
                                                <input
                                                    type="radio"
                                                    name="sponsorship"
                                                    checked={selectedSponsorship === item.id}
                                                    onChange={() => setSelectedSponsorship(item.id)}
                                                />
                                                ${item.price}
                                                {regDiscount > 0 && (
                                                    <span className="or-original-price">${baseSponsorships.find(b => b.id === item.id)?.price}</span>
                                                )}
                                            </label>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>

                        {/* ── Accommodation ── */}
                        <div className="or-section-label" style={{ marginTop: '2rem' }}>
                            Accommodation
                            {discount && accomDiscount > 0 && (
                                <span className="or-discount-badge">{discount.percentage}% OFF applied</span>
                            )}
                        </div>
                        <div className="accompanying-check">
                            <label className="or-check-label">
                                <input
                                    type="checkbox"
                                    checked={includeAccompanying}
                                    onChange={e => setIncludeAccompanying(e.target.checked)}
                                />
                                <strong>{`Include Accompanying Person ($${accompanyingPersonPrice} extra)`}</strong>
                            </label>
                        </div>
                        <table className="or-pricing-table">
                            <thead>
                                <tr>
                                    <th>Nights</th>
                                    <th>Single Occupancy</th>
                                    <th>Double Occupancy</th>
                                    <th>Triple Occupancy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accommodationOptions.map(opt => (
                                    <tr key={opt.nights}>
                                        <td><strong>{opt.nights} Nights</strong></td>
                                        {['single', 'double', 'triple'].map(type => {
                                            const basePrice = opt[type];
                                            const discountedPrice = accomDiscount > 0 ? applyPct(basePrice, accomDiscount) : basePrice;
                                            return (
                                                <td key={type}>
                                                    <label className="or-radio-label">
                                                        <input
                                                            type="radio"
                                                            name="accommodation"
                                                            checked={selectedAccommodation === `${opt.nights}-${type}`}
                                                            onChange={() => setSelectedAccommodation(`${opt.nights}-${type}`)}
                                                        />
                                                        ${discountedPrice}
                                                        {accomDiscount > 0 && (
                                                            <span className="or-original-price">${basePrice}</span>
                                                        )}
                                                    </label>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* ── Total & Submit ── */}
                        <div className="or-summary">
                            <div className="or-total-row">
                                <span className="or-total-label">TOTAL AMOUNT (USD):</span>
                                <span className="or-total-value">${calculateTotal()}</span>
                            </div>
                            {discount && (
                                <div className="or-savings-note">
                                    🎉 You're saving with code <strong>{discount.coupon}</strong> — {discount.percentage}% discount applied!
                                </div>
                            )}
                            <div className="or-terms">
                                <label className="or-check-label">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={e => setTermsAccepted(e.target.checked)}
                                    />
                                    I've read and accept the <span className="or-terms-link">terms &amp; conditions</span>.
                                </label>
                            </div>
                            <p className="or-processing-note">Note: {regPricing.processingFeePercent ?? 5}% processing charges will be applicable.</p>

                            {submitStatus === 'success' && (
                                <div className="or-status or-status--success">
                                    ✅ Registration submitted successfully! We will contact you shortly.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="or-status or-status--error">
                                    ❌ Submission failed. Please check your connection and try again.
                                </div>
                            )}

                            <div className="or-action-buttons">
                                <button
                                    type="submit"
                                    className="btn-online-register"
                                    disabled={submitting}
                                    style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                                >
                                    {submitting ? 'Submitting…' : 'REGISTER NOW'}
                                </button>
                                <button type="button" className="btn-or-reset" onClick={handleReset}>RESET</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OnlineRegistration;
