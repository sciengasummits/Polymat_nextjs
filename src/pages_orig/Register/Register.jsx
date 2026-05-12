'use client';
import React, { useState, useEffect } from 'react';
import './Register.css';
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

const Register = ({ isDiscounted = false }) => {
    // ── Pricing state loaded from backend ──
    const [regPricing, setRegPricing] = useState(DEFAULTS);

    useEffect(() => {
        siteApi.fetchContent('registration-prices')
            .then(data => {
                if (data && !data.error) {
                    setRegPricing(prev => ({ ...prev, ...data }));
                }
            })
            .catch(e => console.warn('[Register] Could not load pricing:', e.message));
    }, []);

    // State for form fields
    const [formData, setFormData] = useState({
        designation: '',
        fullName: '',
        email: '',
        telephone: '',
        country: '',
        company: '',
        address: ''
    });

    const [selectedAcademicCategory, setSelectedAcademicCategory] = useState(null);

    // State for Terms
    const [termsAccepted, setTermsAccepted] = useState(false);

    // State for Accommodation
    const [includeAccompanying, setIncludeAccompanying] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [selectedSponsorship, setSelectedSponsorship] = useState(null);

    // Submission state
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

    // Discount multiplier (20% off if discounted)
    const discountMultiplier = isDiscounted ? 0.8 : 1;
    const applyDiscount = (price) => Math.round(Number(price) * discountMultiplier);

    // ── Date Logic to determine active phase (driven by backend dates) ──
    const currentDate = new Date();
    const earlyBirdEnd = new Date(regPricing.earlyBirdEndDate || DEFAULTS.earlyBirdEndDate);
    const standardEnd = new Date(regPricing.standardEndDate || DEFAULTS.standardEndDate);

    let activePhase = 'early';
    if (currentDate <= earlyBirdEnd) {
        activePhase = 'early';
    } else if (currentDate <= standardEnd) {
        activePhase = 'standard';
    } else {
        activePhase = 'onspot';
    }

    // ── Derived pricing arrays from backend data ──
    const pricingData = (regPricing.categories || DEFAULTS.categories).map(cat => ({
        ...cat,
        early: applyDiscount(cat.early),
        standard: applyDiscount(cat.standard),
        onspot: applyDiscount(cat.onspot),
    }));

    const accommodationOptions = regPricing.accommodation || DEFAULTS.accommodation;

    const sponsorshipPricing = (regPricing.sponsorships || DEFAULTS.sponsorships).map(sp => ({
        ...sp,
        price: applyDiscount(sp.price),
    }));

    const accompanyingPersonPrice = Number(regPricing.accompanyingPersonPrice ?? DEFAULTS.accompanyingPersonPrice);

    // Helper to calculate total
    const calculateTotal = () => {
        let total = 0;

        if (selectedAcademicCategory) {
            const item = pricingData.find(p => p.id === selectedAcademicCategory);
            if (item) total += item[activePhase];
        }
        if (selectedSponsorship) {
            const item = sponsorshipPricing.find(p => p.id === selectedSponsorship);
            if (item) total += item.price;
        }
        if (includeAccompanying) total += accompanyingPersonPrice;
        if (selectedAccommodation) {
            const [nights, type] = selectedAccommodation.split('-');
            const option = accommodationOptions.find(o => o.nights === parseInt(nights));
            if (option) total += option[type];
        }

        return total;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email) {
            alert('Please fill in your Full Name and Email before submitting.');
            return;
        }

        const total = calculateTotal();
        if (total <= 0) {
            alert('Please select a registration category or sponsorship.');
            return;
        }

        // Build description string
        const descParts = [];
        if (selectedAcademicCategory) {
            const cat = pricingData.find(p => p.id === selectedAcademicCategory);
            if (cat) descParts.push(`${cat.label} : $${cat[activePhase]}`);
        }
        if (selectedSponsorship) {
            const sp = sponsorshipPricing.find(p => p.id === selectedSponsorship);
            if (sp) descParts.push(`${sp.label} : $${sp.price}`);
        }
        if (includeAccompanying) descParts.push(`Accompanying Person : $${accompanyingPersonPrice}`);
        if (selectedAccommodation) {
            const [nights, type] = selectedAccommodation.split('-');
            const accOpt = accommodationOptions.find(o => o.nights === parseInt(nights));
            const accPrice = accOpt ? accOpt[type] : '';
            descParts.push(`Accommodation (${nights} nights, ${type}) : $${accPrice}`);
        }

        const payload = {
            title: formData.designation,
            name: formData.fullName,
            email: formData.email,
            phone: formData.telephone,
            country: formData.country,
            company: formData.company,
            address: formData.address,
            registrationCategory: selectedAcademicCategory
                ? pricingData.find(p => p.id === selectedAcademicCategory)?.label || ''
                : '',
            accommodation: selectedAccommodation || '',
            sponsorship: selectedSponsorship
                ? sponsorshipPricing.find(p => p.id === selectedSponsorship)?.label || ''
                : '',
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
            const fullDescription = descParts.length > 0
                ? descParts.join(' | ')
                : 'POLYMAT Summit Registration';

            const { order } = await siteApi.createPaymentOrder({
                amount: total,
                registrationId: registration._id,
                description: `POLYMAT Registration: ${formData.fullName} — ${fullDescription}`
            });

            // 3. Open Razorpay Checkout
            const options = {
                key: key,
                amount: order.amount,
                currency: order.currency,
                name: 'POLYMAT Summit 2026',
                description: descParts.length > 0
                    ? descParts.join(' | ')
                    : `Registration for ${formData.fullName}`,
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

    const handleReset = () => {
        setFormData({
            designation: '', fullName: '', email: '', telephone: '',
            country: '', company: '', address: ''
        });
        setSelectedAcademicCategory(null);
        setTermsAccepted(false);
        setIncludeAccompanying(false);
        setSelectedAccommodation(null);
        setSelectedSponsorship(null);
    };

    return (
        <div className="register-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Registration</h1>
                    <p className="page-breadcrumb">Home / Register</p>
                </div>
            </div>

            <div className="container section-padding">

                <div className="registration-form-container">
                    <div className="form-section full-width-form">
                        <div className="form-row">
                            <div className="input-wrapper">
                                <select
                                    name="designation"
                                    className="form-control"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select Designation</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Ms">Ms</option>
                                    <option value="Dr">Dr</option>
                                    <option value="Prof">Prof</option>
                                    <option value="PhD">PhD</option>
                                </select>
                                <span className="required-star">*</span>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    className="form-control"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                                <span className="required-star">*</span>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <span className="required-star">*</span>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="tel"
                                    name="telephone"
                                    placeholder="Telephone Number"
                                    className="form-control"
                                    value={formData.telephone}
                                    onChange={handleInputChange}
                                />
                                <span className="required-star">*</span>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-wrapper">
                                <select
                                    name="country"
                                    className="form-control"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                                <span className="required-star">*</span>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company/University"
                                    className="form-control"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                />
                                <span className="required-star">*</span>
                            </div>
                        </div>
                        <div className="form-row full-width">
                            <textarea
                                name="address"
                                placeholder="Address"
                                className="form-control"
                                rows="3"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="pricing-section">
                    <h2 className="pricing-title">SELECT FROM VARIOUS CATEGORIES BELOW</h2>

                    <table className="pricing-table">
                        <thead>
                            <tr>
                                <th className="category-header">Types of Participation</th>
                                <th className={activePhase === 'early' ? 'active-header-early' : ''}>
                                    Early Bird Registration<br />
                                    <span className="date">{new Date(regPricing.earlyBirdEndDate || DEFAULTS.earlyBirdEndDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    {activePhase === 'early' && <span className="badge-active">ACTIVE</span>}
                                </th>
                                <th className={activePhase === 'standard' ? 'active-header-standard' : ''}>
                                    Standard Registration<br />
                                    <span className="date">{new Date(regPricing.standardEndDate || DEFAULTS.standardEndDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    {activePhase === 'standard' && <span className="badge-active">ACTIVE</span>}
                                </th>
                                <th className={activePhase === 'onspot' ? 'active-header-onspot' : ''}>
                                    OnSpot Registration<br />
                                    <span className="date">{new Date(regPricing.onspotEndDate || DEFAULTS.onspotEndDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    {activePhase === 'onspot' && <span className="badge-active">ACTIVE</span>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricingData.map(item => (
                                <tr key={item.id} className={selectedAcademicCategory === item.id ? 'selected-row' : ''}>
                                    <td className="item-cell">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="academicCategory"
                                                checked={selectedAcademicCategory === item.id}
                                                onChange={() => setSelectedAcademicCategory(item.id)}
                                            />
                                            {item.label}
                                        </label>
                                    </td>
                                    <td className={activePhase === 'early' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}>
                                        <span className={activePhase === 'early' ? 'price-active' : ''}>$ {item.early}</span>
                                    </td>
                                    <td className={activePhase === 'standard' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}>
                                        <span className={activePhase === 'standard' ? 'price-active' : ''}>$ {item.standard}</span>
                                    </td>
                                    <td className={activePhase === 'onspot' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}>
                                        <span className={activePhase === 'onspot' ? 'price-active' : ''}>$ {item.onspot}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Accommodation Section */}
                <div className="accommodation-section">
                    <div className="accompanying-checkbox">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={includeAccompanying}
                                onChange={(e) => setIncludeAccompanying(e.target.checked)}
                            />
                            <strong>{`Include Accompanying Person ( $${accompanyingPersonPrice} Extra)`}</strong>
                        </label>
                    </div>

                    <table className="accommodation-table">
                        <thead>
                            <tr>
                                <th>Accommodation</th>
                                <th>Single Occupancy</th>
                                <th>Double Occupancy</th>
                                <th>Triple Occupancy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accommodationOptions.map((option) => (
                                <tr key={option.nights}>
                                    <td className="nights-cell">For {option.nights} Nights</td>
                                    <td>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="accommodation"
                                                checked={selectedAccommodation === `${option.nights}-single`}
                                                onChange={() => setSelectedAccommodation(`${option.nights}-single`)}
                                            />
                                            ${option.single}
                                        </label>
                                    </td>
                                    <td>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="accommodation"
                                                checked={selectedAccommodation === `${option.nights}-double`}
                                                onChange={() => setSelectedAccommodation(`${option.nights}-double`)}
                                            />
                                            ${option.double}
                                        </label>
                                    </td>
                                    <td>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="accommodation"
                                                checked={selectedAccommodation === `${option.nights}-triple`}
                                                onChange={() => setSelectedAccommodation(`${option.nights}-triple`)}
                                            />
                                            ${option.triple}
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="sponsorship-section" style={{ marginTop: '2rem' }}>
                    <h2 className="pricing-title">SPONSORSHIP OPPORTUNITIES</h2>
                    <table className="pricing-table sponsorship-table">
                        <thead>
                            <tr>
                                {sponsorshipPricing.map(item => (
                                    <th key={item.id}>{item.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {sponsorshipPricing.map(item => (
                                    <td key={item.id}>
                                        <label className="radio-label" style={{ justifyContent: 'center' }}>
                                            <input
                                                type="radio"
                                                name="sponsorship"
                                                checked={selectedSponsorship === item.id}
                                                onChange={() => setSelectedSponsorship(item.id)}
                                            />
                                            ${item.price}
                                        </label>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="summary-section">
                    <div className="total-display">
                        <span className="total-label">TOTAL PRICE($) :</span>
                        <span className="total-amount">{calculateTotal()}</span>
                    </div>

                    <div className="terms-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            I've read and accept the <span className="terms-link">terms &amp; conditions</span>.
                        </label>
                    </div>

                    <p className="processing-fee">Note: {regPricing.processingFeePercent ?? 5}% of processing charges will be applicable.</p>

                    {submitStatus === 'success' && (
                        <div style={{ padding: '14px 20px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', color: '#15803d', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                            ✅ Registration submitted successfully! We will contact you shortly.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div style={{ padding: '14px 20px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                            ❌ Submission failed. Please check your connection and try again.
                        </div>
                    )}

                    <div className="action-buttons">
                        <button
                            className="btn-register"
                            onClick={handleSubmit}
                            disabled={submitting}
                            style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                        >
                            {submitting ? 'Submitting…' : 'REGISTER NOW'}
                        </button>
                        <button className="btn-reset" onClick={handleReset}>RESET</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
