'use client';
import React, { useState, useEffect } from 'react';
import { fetchContent } from '../../../api/contentApi';
import './VenueSection.css';

// Default venue images — Polymers & Composite Materials / Singapore related
const DEFAULT_VENUE_IMAGES = [
    { id: 1, src: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80', alt: 'Singapore Venue 1' },
    { id: 2, src: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80', alt: 'Polymer Lab Venue 2' },
    { id: 3, src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', alt: 'Materials Venue 3' },
    { id: 4, src: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&q=80', alt: 'Singapore Venue 4' },
    { id: 5, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80', alt: 'Conference Hall 5' },
    { id: 6, src: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80', alt: 'Materials Lab 6' },
    { id: 7, src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80', alt: 'Composite Venue 7' },
    { id: 8, src: 'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=800&q=80', alt: 'Singapore Venue 8' },
];

const MarqueeRow = ({ items, direction }) => (
    <div className={`venue-marquee-row ${direction}`}>
        {[...items, ...items, ...items].map((image, index) => (
            <div key={`${image.id}-${index}`} className="venue-marquee-item">
                <img
                    src={image.src?.src || image.src}
                    alt={image.alt}
                    className="venue-marquee-image"
                    onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_VENUE_IMAGES[0].src; }}
                />
            </div>
        ))}
    </div>
);

const VenueSection = () => {
    const [venueImages, setVenueImages] = useState(DEFAULT_VENUE_IMAGES);

    useEffect(() => {
        let cancelled = false;
        const load = () => {
            fetchContent('venue').then(d => {
                if (!cancelled && d && d.images && d.images.length >= 2) {
                    setVenueImages(d.images.map((src, i) => ({ id: i + 1, src, alt: `Venue ${i + 1}` })));
                }
            }).catch(() => {});
        };
        load();
        const interval = setInterval(load, 30000);
        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);
        return () => { cancelled = true; clearInterval(interval); document.removeEventListener('visibilitychange', onVisible); };
    }, []);

    const row1 = venueImages.slice(0, Math.ceil(venueImages.length / 2));
    const row2 = venueImages.slice(Math.ceil(venueImages.length / 2));

    return (
        <section className="venue-gallery-section">
            <div className="container">
                <div className="venue-gallery-header">
                    <h2 className="venue-gallery-title">Venues</h2>
                    <div className="venue-gallery-underline"></div>
                </div>
            </div>
            <div className="venue-marquee-wrapper">
                <MarqueeRow items={row1} direction="scroll-left" />
                {row2.length > 0 && <MarqueeRow items={row2} direction="scroll-right" />}
            </div>
        </section>
    );
};

export default VenueSection;
