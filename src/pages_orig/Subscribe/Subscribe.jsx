'use client';
import React, { useState } from 'react';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import { submitSubscribe } from '../../api/newsletterApi';

import Button from '../../components/common/Button/Button';
import './Subscribe.css';
import usePageSEO from '../../hooks/usePageSEO';

const Subscribe = () => {
    usePageSEO({
        title: 'Subscribe',
        description: 'Subscribe to get the latest updates and news from the Polymat Summit 2026.',
        canonical: 'https://polymatvortexsummit.com/subscribe',
    });

    const [form, setForm] = useState({ name: '', email: '', number: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await submitSubscribe({ name: form.name, email: form.email, phone: form.number });
            setSuccess(true);
        } catch {
            setError('Failed to subscribe. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="subscribe-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Subscribe</h1>
                    <p className="page-breadcrumb">Home / Subscribe</p>
                </div>
            </div>

            <div className="container section-padding">
                <div className="subscribe-layout">
                    <div className="subscribe-form-wrapper">
                        {success ? (
                            <div className="subscribe-success">
                                <CheckCircle size={64} className="subscribe-success__icon" />
                                <h2>You're Subscribed!</h2>
                                <p>Thank you for subscribing. You'll receive the latest updates and news from Polymat Summit 2026.</p>
                                <Button onClick={() => { setSuccess(false); setForm({ name: '', email: '', number: '' }); }}>
                                    Subscribe Another
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="form-header">
                                    <h3>Subscribe for Updates</h3>
                                    <p>Get the latest news and announcements from Polymat Summit 2026.</p>
                                </div>

                                <form className="subscribe-form" onSubmit={handleSubmit}>
                                    {error && <p className="subscribe-error">{error}</p>}

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="sub-name">Full Name</label>
                                            <input
                                                id="sub-name"
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="John Doe"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="sub-email">Email Address</label>
                                            <input
                                                id="sub-email"
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="john@example.com"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="sub-number">Phone Number</label>
                                        <input
                                            id="sub-number"
                                            type="tel"
                                            name="number"
                                            className="form-control"
                                            placeholder="+1 234 567 8900"
                                            value={form.number}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-100"
                                        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        disabled={loading}
                                    >
                                        {loading
                                            ? <Loader2 size={18} className="animate-spin" style={{ marginRight: '8px' }} />
                                            : <Send size={18} style={{ marginRight: '8px' }} />
                                        }
                                        {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
