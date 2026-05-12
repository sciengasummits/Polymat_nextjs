'use client';
import React, { useState, useEffect } from 'react';
import { fetchContent } from '../../../api/contentApi';
import { fetchUniversities } from '../../../api/universitiesApi';
import { resolveImageUrl } from '../../../api/utilsApi';
import './UniversitiesMarquee.css';

const UniversitiesMarquee = () => {
    const [title, setTitle] = useState('Supporting Universities & Institutions');
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        // Fetch Title
        fetchContent('marquee').then(data => {
            if (data && data.title) setTitle(data.title);
        }).catch(() => {});

        // Fetch Universities dynamically like Speakers
        fetchUniversities().then(data => {
            if (data && Array.isArray(data)) {
                // filter visible ones (visible is true by default, but double-check)
                const visible = data.filter(u => u.visible !== false);
                setUniversities(visible);
            }
        }).catch(() => {});
    }, []);

    if (universities.length === 0) return null;

    const renderItem = (uni, uniqueKey) => {
        // uni now has .name and .image
        const resolvedUrl = uni.image ? resolveImageUrl(uni.image) : null;
        return (
            <div key={uniqueKey} className="university-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
                {resolvedUrl ? (
                    <img
                        src={resolvedUrl}
                        alt={uni.name}
                        style={{ height: '110px', objectFit: 'contain', maxWidth: '220px', display: 'block', background: 'transparent' }}
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <h4 style={{ margin: 0, whiteSpace: 'nowrap', color: '#1e293b', fontSize: '1.2rem', fontWeight: 'bold' }}>{uni.name}</h4>
                )}
            </div>
        );
    };

    const MIN_ITEMS = 8;
    const repeated = universities.length === 0 ? [] : Array.from(
        { length: Math.ceil(MIN_ITEMS / universities.length) },
        () => universities
    ).flat();

    return (
        <section className="universities-marquee">
            <div className="container" style={{ marginBottom: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.25rem)',
                        fontWeight: '800',
                        color: '#1e293b',
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }}>
                        {title}
                    </h2>
                    <div style={{
                        width: '60px', height: '4px',
                        background: 'var(--brand-gradient, linear-gradient(135deg, #0F172A 0%, #1E40AF 100%))',
                        margin: '0 auto', borderRadius: '2px',
                    }}></div>
                </div>
            </div>
            <div className="marquee-track">
                {/* Original Set */}
                {repeated.map((uni, idx) => renderItem(uni, `orig-${idx}`))}
                {/* Duplicate Set for Seamless Loop */}
                {repeated.map((uni, idx) => renderItem(uni, `dup-${idx}`))}
            </div>
        </section>
    );
};

export default UniversitiesMarquee;
