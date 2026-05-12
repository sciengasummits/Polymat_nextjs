'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, Phone, MessageCircle } from 'lucide-react';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import { fetchContent } from '../../../api/contentApi';
import './Navbar.css';


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [contactInfo, setContactInfo] = useState({ email: '', phone: '', whatsapp: '' });
    const pathname = usePathname();

    // ── Fetch contact info from API (dashboard-driven) ──────────────────────
    useEffect(() => {
        fetchContent('contact').then(data => {
            if (data) {
                setContactInfo({
                    email: data.email || 'contact@polymatsummit.com',
                    phone: data.phone || '+91 7842090097',
                    whatsapp: data.whatsapp || '+91 7842090097',
                });
            }
        }).catch(() => {
            // Keep defaults on failure
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'PROGRAM', path: '/program' },
        { name: 'SESSIONS', path: '/sessions' },
        { name: 'BROCHURE', path: '/brochure' },
        { name: 'ABSTRACT', path: '/abstract-submission' },
        { name: 'SPEAKERS', path: '/speakers' },
        { name: 'SPONSORSHIP', path: '/sponsors' },
        { name: 'REGISTER', path: '/register' },
        { name: 'CONTACT', path: '/contact' },
        {
            name: 'MORE',
            path: '#',
            dropdown: [
                { name: "FAQ'S", path: '/faqs' },
                { name: 'Venue', path: '/venue' },
                { name: 'Visa Info', path: '/visa-info' },
                { name: 'Subscribe', path: '/subscribe' }
            ]
        },

    ];

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__container">
                <div className="navbar__top">
                    <Logo onClick={closeMobileMenu} />

                    <div className="navbar__contact">
                        <a
                            className="contact-item"
                            href={`mailto:${contactInfo.email}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Mail size={18} className="contact-icon" />
                            <div className="contact-info">
                                <span className="contact-label">SEND US AN EMAIL</span>
                                <span className="contact-value">{contactInfo.email}</span>
                            </div>
                        </a>
                        <a
                            className="contact-item"
                            href={`tel:${contactInfo.phone}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Phone size={18} className="contact-icon" />
                            <div className="contact-info">
                                <span className="contact-label">CALL US NOW</span>
                                <span className="contact-value">{contactInfo.phone}</span>
                            </div>
                        </a>
                        <a
                            className="contact-item"
                            href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <MessageCircle size={18} className="contact-icon" />
                            <div className="contact-info">
                                <span className="contact-label">WHATSAPP</span>
                                <span className="contact-value">{contactInfo.whatsapp}</span>
                            </div>
                        </a>
                    </div>

                    <button className="navbar__toggle" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>



                <div className="navbar__bottom">
                    <div className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--active' : ''}`}>
                        {navLinks.map((link) => (
                            link.dropdown ? (
                                <div className="navbar__dropdown" key={link.name}>
                                    <span className={`navbar__link ${pathname === link.path ? 'active' : ''}`}>
                                        {link.name}
                                    </span>
                                    <div className="navbar__dropdown-menu">
                                        {link.dropdown.map((subLink) => (
                                            <Link
                                                key={subLink.name}
                                                href={subLink.path}
                                                className="navbar__dropdown-item"
                                                onClick={closeMobileMenu}
                                            >
                                                {subLink.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`navbar__link ${pathname === link.path ? 'active' : ''}`}
                                    onClick={closeMobileMenu}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
