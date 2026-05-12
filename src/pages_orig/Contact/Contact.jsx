'use client';
import React, { useState, useEffect } from 'react';

import Button from '../../components/common/Button/Button';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Loader2 } from 'lucide-react';
import { fetchContent } from '../../api/contentApi';
import { submitContactMessage } from '../../api/contactApi';
import './Contact.css';

const Contact = () => {

    const [contactInfo, setContactInfo] = useState({
        email: 'contact@polymatsummit.com',
        phone: '+91 7842090097',
        whatsapp: '+91 7842090097',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // ── Fetch contact info from API (dashboard-driven) ──────────────────────
    useEffect(() => {
        fetchContent('contact').then(data => {
            if (data) {
                setContactInfo(prev => ({
                    email: data.email || prev.email,
                    phone: data.phone || prev.phone,
                    whatsapp: data.whatsapp || prev.whatsapp,
                }));
            }
        }).catch(() => {
            // Keep defaults on failure
        });
    }, []);

    return (
        <div className="contact-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Contact Us</h1>
                    <p className="page-breadcrumb">Home / Contact Us</p>
                </div>
            </div>

            <div className="container section-padding">
                <div className="contact__grid">
                    <div className="contact__info">
                        <h2 className="section-title">Get In Touch</h2>
                        <p className="mb-4">
                            Have questions about registration, abstract submission, or the conference schedule?
                            Our team is here to help. Reach out to us using the form or contact details below.
                        </p>

                        <div className="info-item">
                            <div className="info-icon">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4>Address</h4>
                                <p>Amsterdam, Netherlands</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4>Phone</h4>
                                <p>{contactInfo.phone}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{contactInfo.email}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h4>WhatsApp</h4>
                                <p>{contactInfo.whatsapp}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h4>Working Hours</h4>
                                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact__form-wrapper">
                        <div className="form-header">
                            <h3>Send Us a Message</h3>
                            <p>We'd love to hear from you!</p>
                        </div>
                        <form className="contact__form" onSubmit={async (e) => {
                            e.preventDefault();
                            setIsSubmitting(true);
                            setSubmitStatus(null);
                            const formData = new FormData(e.target);
                            try {
                                await submitContactMessage({
                                    name: formData.get('name'),
                                    email: formData.get('email'),
                                    subject: formData.get('subject'),
                                    message: formData.get('message'),
                                });
                                setSubmitStatus('success');
                                e.target.reset();
                            } catch (err) {
                                setSubmitStatus('error');
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}>
                            {submitStatus === 'success' && <p style={{ color: 'green', fontSize: '0.9rem', marginBottom: '10px' }}>Your message was sent successfully!</p>}
                            {submitStatus === 'error' && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '10px' }}>Failed to send message. Please try again later.</p>}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" className="form-control" placeholder="John Doe" required disabled={isSubmitting} />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" className="form-control" placeholder="john@example.com" required disabled={isSubmitting} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" name="subject" className="form-control" placeholder="Inquiry about..." required disabled={isSubmitting} />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea name="message" rows="5" className="form-control" placeholder="How can we help you?" required disabled={isSubmitting}></textarea>
                            </div>
                            <Button type="submit" className="w-100" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" style={{ marginRight: '8px' }} /> : <Send size={18} style={{ marginRight: '8px' }} />}
                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
