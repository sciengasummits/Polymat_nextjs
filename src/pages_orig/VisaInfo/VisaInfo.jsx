'use client';
import React, { useState, useEffect } from 'react';

import Button from '../../components/common/Button/Button';

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

import './VisaInfo.css';
import usePageSEO from '../../hooks/usePageSEO';

/* ── Default fallback content ── */
const DEFAULTS = {
    pageTitle: 'Visa Information',
    intro: 'The INTERNATIONAL CONFERENCE ON POLYMERS AND COMPOSITE MATERIALS welcomes speakers & delegates from all over the world. Below is essential visa-related information to assist with your travel planning.',
    sections: [
        {
            id: 'visa_need',
            title: '1. Do You Need a Visa?',
            points: [
                'Check if you require a Schengen visa to enter Germany using the Federal Foreign Office website or your local German Embassy.',
                'Nationals of many countries (including USA, UK, Canada, Australia, Japan, and most EU countries) may enter Germany for short-term visits (up to 90 days) without applying for a visa in advance.',
                'All visitors from non-visa-exempt countries must apply for a Schengen Visa (Type C) for conference attendance.',
            ],
        },
        {
            id: 'visa_types',
            title: '2. Visa Types',
            points: [
                'Schengen Visa: For business/conference purposes, valid for stays up to 90 days within a 180-day period.',
                'Airport Transit Visa: Required for certain nationalities even if they don\'t leave the airport transit area.',
            ],
        },
        {
            id: 'visa_docs',
            title: '3. Required Documents',
            points: [
                'Valid passport (minimum 6 months validity from your planned date of arrival).',
                'Proof of onward travel (confirmed return flight ticket).',
                'Proof of accommodation (hotel booking confirmation).',
                'Proof of sufficient financial means for the duration of stay.',
                'Letter of Invitation (provided by the Summit Committee upon registration).',
            ],
        },
        {
            id: 'visa_invite',
            title: '4. Invitation Letter',
            points: [
                'Registered participants can request an official invitation letter to support their visa application. This letter confirms your registration and participation in the congress.',
            ],
        },
    ],
    contactEmail: 'info@polymatsummit2026.sciengasummits.com',
    note: 'Please ensure you apply for your visa well in advance of the conference date. We recommend applying at least 8 weeks before your intended travel date.',
};

const VisaInfo = () => {
    usePageSEO({
        title: 'Visa Information',
        description: 'Visa information for international participants attending POLYMAT2026 in Singapore. Learn about visa requirements, required documents, and how to request an official invitation letter.',
        canonical: 'https://polymat2026.com/visa-info',
    });
    const [visaData, setVisaData] = useState(DEFAULTS);
    const [email, setEmail] = useState('');
    const [submitMsg, setSubmitMsg] = useState(null);

    useEffect(() => {
        siteApi.fetchContent('visa-info')
            .then(data => { if (data && !data.error) setVisaData(prev => ({ ...prev, ...data })); })
            .catch(e => console.warn('[VisaInfo] Could not load content:', e.message));
    }, []);

    const handleInviteRequest = async (e) => {
        e.preventDefault();
        setSubmitMsg('Sending...');
        try {
            // Send invitation letter request via registration API
            await siteApi.submitRegistration({
                name: 'Invitation Letter Request',
                email,
                registrationCategory: 'Invitation Letter Request',
                status: 'Invitation Request',
                description: `Invitation letter requested for visa application by ${email}`,
            });
            setSubmitMsg('success');
            setEmail('');
        } catch (err) {
            console.error(err);
            setSubmitMsg('error');
        }
        setTimeout(() => setSubmitMsg(null), 5000);
    };

    return (
        <div className="visa-page">
            <header className="page-header">
                <div className="container text-center">
                    <h1 className="page-title">{visaData.pageTitle}</h1>
                    <div className="page-breadcrumb">Home / Visa Info</div>
                </div>
            </header>

            <section className="section-padding visa-text-section">
                <div className="container">
                    <div className="visa-content-wrapper">
                        <h2 className="visa-main-title">VISA INFORMATION FOR INTERNATIONAL PARTICIPANTS</h2>

                        {visaData.intro && (
                            <p className="visa-intro-text">{visaData.intro}</p>
                        )}

                        {(visaData.sections || []).map((section, idx) => (
                            <div className="visa-info-block" key={section.id || idx}>
                                <h3 className="visa-block-title">{section.title}</h3>
                                {section.points && section.points.length > 0 && (
                                    <ul className="visa-list">
                                        {section.points.map((point, pIdx) => (
                                            <li key={pIdx}>{point}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                        {/* Invitation Letter Request Form */}
                        <div className="visa-info-block">
                            <div className="simple-invite-form">
                                <p><strong>Request your Invitation Letter:</strong></p>
                                <form onSubmit={handleInviteRequest} className="text-invite-form">
                                    <input
                                        type="email"
                                        placeholder="Enter your registered email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Button type="submit" className="btn-send-request">Send Request</Button>
                                </form>
                                {submitMsg === 'success' && (
                                    <p style={{ color: '#16a34a', marginTop: '8px', fontWeight: 600 }}>
                                        ✅ Your invitation letter request has been submitted successfully!
                                    </p>
                                )}
                                {submitMsg === 'error' && (
                                    <p style={{ color: '#dc2626', marginTop: '8px', fontWeight: 600 }}>
                                        ❌ Something went wrong. Please try again or email us directly.
                                    </p>
                                )}
                            </div>
                        </div>

                        {visaData.note && (
                            <div className="visa-info-block" style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                                    <strong>⚠️ Note:</strong> {visaData.note}
                                </p>
                            </div>
                        )}

                        {visaData.contactEmail && (
                            <div className="visa-info-block">
                                <p>For visa support or queries, contact us at: <a href={`mailto:${visaData.contactEmail}`} style={{ color: '#6366f1', fontWeight: 600 }}>{visaData.contactEmail}</a></p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisaInfo;

