'use client';
import React, { useState, useEffect } from 'react';

import './Brochure.css';
import { useRouter } from 'next/navigation';
import { Download, FileText, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import { fetchContent } from '../../api/contentApi';
import usePageSEO from '../../hooks/usePageSEO';

const DEFAULTS = {
    pdfUrl: '',
    title: 'International Conference on Polymers and Composite Materials',
    description: 'Download the official conference brochure to get comprehensive information about the International Conference on Polymers and Composite Materials. It serves as your complete guide to the event, featuring detailed schedules, speaker profiles, and venue information.',
    note: '* PDF will be available soon. Format: PDF',
    features: [
        'Complete 3-Day Program Schedule',
        'Keynote Speaker Biographies & Topics',
        'Workshop & Breakout Session Details',
        'Venue Maps & Accommodation Guide',
        'Sponsorship & Exhibition Opportunities',
    ],
};

const Brochure = () => {
    usePageSEO({
        title: 'Conference Brochure',
        description: 'Download the official POLYMAT2026 conference brochure – program schedule, keynote speaker profiles, workshop details, venue maps, and sponsorship opportunities.',
        canonical: 'https://polymat2026.com/brochure',
    });
    const router = useRouter();
    const navigate = (path) => router.push(path);

    const [brochureData, setBrochureData] = useState(DEFAULTS);
    const [formFilled, setFormFilled] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', number: '' });
    const [submitting, setSubmitting] = useState(false);

    /* ── Load from backend ── */
    useEffect(() => {
        fetchContent('brochure').then(data => {
            if (data) {
                setBrochureData(prev => ({
                    ...DEFAULTS,
                    ...data,
                    features: (data.features && data.features.length > 0) ? data.features : DEFAULTS.features,
                }));
            }
        }).catch(() => { /* Keep defaults on error */ });
    }, []);

    const handleDownloadClick = (e) => {
        e.preventDefault();
        if (brochureData.pdfUrl) {
            window.open(brochureData.pdfUrl, '_blank', 'noreferrer');
        } else {
            alert("The full PDF brochure is currently being updated for the 2026 Edition. Please use the 'View Online' button to see the digital version.");
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.number) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/brochure-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    number: formData.number,
                    conference: 'polymat',
                }),
            });
            const data = await res.json();
            if (data.success) {
                setFormFilled(true);
            } else {
                alert(data.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Brochure form error:', err);
            alert('Failed to submit. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="brochure-page pt-5">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Conference Brochure</h1>
                    <p className="page-breadcrumb">Home / Brochure</p>
                </div>
            </div>

            <section className="brochure-content section-padding">
                <div className="container">
                    <div className="brochure-grid">
                        <div className="brochure-preview">
                            <div className="preview-card">
                                <div className="preview-header">
                                    <div className="preview-logo-placeholder">POLYMAT</div>
                                    <div className="preview-badge">2026 Edition</div>
                                </div>
                                <div className="preview-main">
                                    <div className="vortex-accent"></div>
                                    <h3 className="preview-title">{brochureData.title}</h3>
                                    <div className="preview-divider"></div>
                                    <p className="preview-subtitle">Official Conference Brochure</p>
                                </div>
                                <div className="preview-footer">
                                    <p>December 14-17, 2026</p>
                                    <p>Amsterdam, Netherlands</p>
                                </div>
                            </div>
                        </div>

                        <div className="brochure-details">
                            <h2 className="mb-4">Inside the Brochure</h2>
                            <p className="mb-4 text-muted">
                                {brochureData.description}
                            </p>

                            <ul className="brochure-features mb-5">
                                {(brochureData.features || []).map((feat, i) => (
                                    <li key={i}>
                                        <CheckCircle size={20} className="feature-icon" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="brochure-actions">
                                {!formFilled ? (
                                    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                                        <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                        <input type="email" placeholder="Your Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                        <input type="tel" placeholder="Your Number" required value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                        <Button type="submit" disabled={submitting}>
                                            {submitting ? 'Submitting...' : 'Submit to Access'}
                                        </Button>
                                    </form>
                                ) : (
                                    <>
                                        <Button onClick={handleDownloadClick}>
                                            <Download size={20} style={{ marginRight: '8px' }} />
                                            {brochureData.pdfUrl ? 'Download Brochure' : 'PDF Coming Soon'}
                                        </Button>
                                        <Button variant="secondary" onClick={() => navigate('/digital-brochure')}>
                                            <FileText size={20} style={{ marginRight: '8px' }} />
                                            View Online
                                        </Button>
                                    </>
                                )}
                            </div>
                            <p className="download-note mt-3">{brochureData.note}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Brochure;
