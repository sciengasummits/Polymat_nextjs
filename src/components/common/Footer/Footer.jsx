'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../Logo/Logo';
import { fetchContent } from '../../../api/contentApi';
import './Footer.css';

const Footer = () => {
    const [contactInfo, setContactInfo] = useState({ email: 'contact@polymatsummit.com', phone: '+91 7842090097' });

    useEffect(() => {
        fetchContent('contact').then(data => {
            if (data) {
                setContactInfo(prev => ({
                    email: data.email || prev.email,
                    phone: data.phone || prev.phone
                }));
            }
        }).catch(() => {});
    }, []);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__col">
                        <div className="footer__coll-logo" style={{ marginBottom: '1.5rem' }}>
                            <Logo />
                        </div>
                        <p className="footer__desc">
                            Global experts unite to shape the future of polymer and composite materials science. Discover ground-breaking technologies and connect with top researchers and professionals.
                        </p>
                        <div className="footer__socials">
                            <a href="https://www.facebook.com/profile.php?id=61588065033161" target="_blank" rel="noopener noreferrer" className="social-icon">FB</a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">IN</a>
                            <a href="https://www.instagram.com/sciengasummits/" target="_blank" rel="noopener noreferrer" className="social-icon">IG</a>
                        </div>
                    </div>

                    <div className="footer__col">
                        <h4>Important Links</h4>
                        <ul className="footer__links">
                            <li><Link href="/abstract-submission">Abstract Submission</Link></li>
                            <li><Link href="/register">Registration</Link></li>
                            <li><Link href="/sessions">Sessions</Link></li>
                            <li><Link href="/program">Program</Link></li>
                            <li><Link href="/speakers">Speakers</Link></li>
                            <li><Link href="/subscribe">Subscribe</Link></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4>Policies</h4>
                        <ul className="footer__links">
                            <li><a href="https://www.sciengasummits.com/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a></li>
                            <li><a href="https://www.sciengasummits.com/refund-cancellation" target="_blank" rel="noopener noreferrer">Refund &amp; Cancellations</a></li>
                            <li><a href="https://www.sciengasummits.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4>Contact Info</h4>
                        <ul className="footer__contact">
                            <li>
                                <MapPin size={18} />
                                <div>
                                    <span style={{ display: 'block', fontWeight: 'bold', color: 'white' }}>Venue:</span>
                                    <span> Amsterdam, Netherlands</span>
                                </div>
                            </li>

                            <li>
                                <Mail size={18} />
                                <span>{contactInfo.email}</span>
                            </li>
                            <li>
                                <Phone size={18} />
                                <span>{contactInfo.phone}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} Annual International Conference on Polymers and Composite Materials. All Rights Reserved by SCIENGA SUMMITS</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
