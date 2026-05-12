
import React from 'react';
import { Atom, Layers } from 'lucide-react';
import Link from 'next/link';
import './Logo.css';

const Logo = ({ className = '', linkTo = '/', onClick }) => {
    return (
        <Link href={linkTo} className={`app-logo ${className}`} onClick={onClick}>
            <div className="logo-icon-container">
                <Atom size={28} strokeWidth={2.5} className="logo-icon-primary" />
                <div className="logo-icon-heart-wrapper">
                    <div className="logo-icon-heart">
                        <Layers size={12} fill="currentColor" strokeWidth={0} />
                    </div>
                </div>
            </div>
            <div className="logo-text-container">
                <span className="logo-text-main">POLYMAT<br></br>SUMMIT2026</span>
            </div>
        </Link>
    );
};

export default Logo;
