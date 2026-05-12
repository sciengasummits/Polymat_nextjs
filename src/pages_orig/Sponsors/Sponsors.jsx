'use client';
import React from 'react';

import './Sponsors.css';
import Button from '../../components/common/Button/Button';
import { useRouter } from 'next/navigation';
import '../../components/sections/PricingSection/PricingSection.css';
import usePageSEO from '../../hooks/usePageSEO';

const Sponsors = () => {
    usePageSEO({
        title: 'Sponsorship Opportunities',
        description: 'Sponsor POLYMAT2026 – Platinum, Gold, Silver, and Exhibitor packages available. Showcase your brand to global fluid mechanics researchers and engineers in Singapore, December 2026.',
        canonical: 'https://polymat2026.com/sponsors',
    });
    const router = useRouter();
    const navigate = (path) => router.push(path);
    const packages = [
        {
            title: "Platinum Sponsor",
            price: "$4999",
            features: [
                "4 Complimentary registrations",
                "Complementary workshop",
                "Complimentary Lunch and Coffee Break",
                "Acknowledgement during the opening and closing ceremony",
                "Logo in website with hyperlink",
                "Logo in social media publication for the event",
                "Logo in email campaigns to all attendees",
                "Logo in booklets, flyers, and proceedings",
                "Logo in main poster for the conference",
                "15 Minutes presentation opportunity about company's products or services in the congress"
            ]
        },
        {
            title: "Diamond Sponsor",
            price: "$3999",
            features: [
                "3 Complimentary registrations",
                "Complimentary Lunch and Coffee Break",
                "Acknowledgement during the opening and closing ceremony",
                "Logo in website with hyperlink",
                "Logo in social media publication for the event",
                "Logo in email campaigns to all attendees",
                "Logo in booklets, flyers, and proceedings",
                "Logo in main poster for the conference"
            ]
        },
        {
            title: "Gold Sponsor",
            price: "$2999",
            features: [
                "2 Complimentary registrations",
                "Complimentary Lunch and Coffee Break",
                "Acknowledgement during the opening and closing ceremony",
                "Logo in website with hyperlink",
                "Logo in social media publication for the event",
                "Logo in email campaigns to all attendees",
                "Logo in booklets, flyers, and proceedings",
                "Logo in main poster for the conference"
            ]
        },
        {
            title: "Exhibitor",
            price: "$1999",
            features: [
                "1 Table in exhibition area",
                "2 Complimentary conference registrations",
                "Complimentary Lunch and Coffee Break",
                "Acknowledgement during the opening and closing ceremony",
                "Logo in website with hyperlink",
                "Logo in social media publication for the event",
                "Logo in email campaigns to all attendees",
                "Logo in booklets, flyers, and proceedings",
                "Logo in main poster for the conference",
                "Direct interactions with participants"
            ]
        }
    ];

    return (
        <div className="pt-5">
            <div className="page-header" style={{ marginTop: '0' }}>
                <div className="container">
                    <h1 className="page-title">SPONSORSHIPS</h1>
                    <p className="page-breadcrumb">Home / Sponsorships</p>
                </div>
            </div>

            <div className="container section-padding sponsorship-packages">
                <div className="pricing-cards-container" style={{ marginTop: '2rem' }}>
                    {packages.map((pkg, index) => (
                        <div className="pricing-card-home" key={index}>
                            <div className="pricing-card-header">
                                <h3 className="pkg-title">{pkg.title}</h3>
                                <div className="pkg-price">
                                    <span className="currency">$</span>
                                    <span className="amount">{pkg.price.replace('$', '')}</span>
                                </div>
                            </div>
                            <div className="pricing-card-body">
                                <ul className="pkg-features">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <span style={{ color: 'var(--color-primary-start)', marginRight: '10px' }}>✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Info Box */}
                <div className="sponsorship-info-box">
                    <div className="info-text">
                        <p>
                            The exhibit provides a platform for companies and institutions to present their products and distribute brochures and business cards. The exhibit also
                            provides a unique networking opportunity with many experts and researchers.
                        </p>
                        <p>
                            For more information about sponsorship/exhibitor <a href="#" className="info-link">click here</a>.
                        </p>
                        <p>
                            If you are interested in sponsoring this event, please write an email to: <strong>sciengasummits@gmail.com</strong>
                        </p>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Button onClick={() => navigate('/register')}>Pay Now</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sponsors;
