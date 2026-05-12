'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { fetchSpeakers } from '../../../api/speakersApi';
import { resolveImageUrl } from '../../../api/utilsApi';
import './SpeakersSection.css';

const SpeakersSection = ({ showViewAll }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [speakers, setSpeakers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDisplayCategory = (category) => {
        if (!category) return '';
        if (category === 'Student' || category === 'Students') return 'Student';
        if (category === 'Keynote' || category === 'Keynote Speaker') return 'Keynote Speaker';
        if (category === 'Plenary' || category === 'Plenary Speaker') return 'Plenary Speaker';
        if (category === 'Invited' || category === 'Invited Speaker') return 'Invited Speaker';
        if (category === 'Featured' || category === 'Featured Speaker') return 'Featured';
        return category;
    };

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const data = await fetchSpeakers(); // Fetches all visible speakers
                if (data && mounted) {
                    const mapped = data.filter(s => s.visible !== false).map(s => ({
                        id: s._id || s.id,
                        name: s.name,
                        title: s.title || s.designation || '',
                        affiliation: s.affiliation || s.institution || '',
                        category: s.category || 'Speakers',
                        image: s.image || s.photo || '',
                        bio: s.bio || '',
                    }));
                    setSpeakers(mapped);
                }
            } catch (err) {
                console.error('Failed to load speakers:', err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        setLoading(true);
        load();

        const interval = setInterval(load, 15000);

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    const filteredSpeakers = speakers.filter(speaker => {
        if (activeCategory === 'All') return true;
        const displayCat = getDisplayCategory(speaker.category);
        return displayCat === activeCategory;
    });

    const displaySpeakers = filteredSpeakers.slice(0, showViewAll ? 8 : filteredSpeakers.length);

    const openModal = (speaker) => {
        setSelectedSpeaker(speaker);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setSelectedSpeaker(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    return (
        <section className="speakers section-padding" id="speakers">
            <div className="container">
                <div className="text-center mb-5">
                    <h4 className="section-subtitle">Meet The Experts</h4>
                    <h2 className="section-title">Global Participants</h2>
                </div>

                <div className="speakers__filters">
                    {['All', 'Committee', 'Poster Presenter', 'Student', 'Delegate', 'Plenary Speaker', 'Keynote Speaker', 'Invited Speaker'].map((category) => (
                        <button
                            key={category}
                            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="speakers__grid">
                    {loading ? (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#666' }}>
                            <div className="loading-spinner" style={{ marginBottom: '1rem' }}></div>
                            <p>Loading global participants details...</p>
                        </div>
                    ) : displaySpeakers.length > 0 ? (
                        displaySpeakers.map((speaker) => (
                            <div className="speaker-card" key={speaker.id}>
                                <div className="speaker-img-wrapper">
                                    {speaker.image ? (
                                        <img src={resolveImageUrl(speaker.image)} alt={speaker.name} className="speaker-img" />
                                    ) : (
                                        <div className="speaker-img-placeholder">
                                            <User size={48} color="#cbd5e1" />
                                            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginTop: '0.5rem' }}>No Photo</span>
                                        </div>
                                    )}
                                    <div className="speaker-overlay">
                                        {/* Social icons could go here */}
                                    </div>
                                </div>
                                <div className="speaker-info">
                                    {speaker.category && <span className="speaker-category">{getDisplayCategory(speaker.category)}</span>}
                                    <h3 className="speaker-name">{speaker.name}</h3>
                                    <p className="speaker-title">{speaker.title}</p>
                                    <p className="speaker-affiliation">{speaker.affiliation}</p>
                                    <button className="btn-biograph" onClick={() => openModal(speaker)}>
                                        <User size={16} /> Biography
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#666' }}>
                            <p>No {activeCategory.toLowerCase()} found at the moment.</p>
                        </div>
                    )}
                </div>
                {showViewAll && (
                    <div className="text-center mt-5">
                        <Link
                            href="/speakers"
                            className="btn-biograph"
                            style={{ textDecoration: 'none', display: 'inline-flex', marginTop: '2rem' }}
                        >
                            Show More
                        </Link>
                    </div>
                )}
            </div>

            {/* Speaker Modal */}
            {
                selectedSpeaker && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeModal}>&times;</button>

                            <div className="modal-body">
                                {selectedSpeaker.category && <p className="modal-category">{getDisplayCategory(selectedSpeaker.category)}</p>}
                                <h3 className="modal-title">{selectedSpeaker.name}</h3>
                                <span className="modal-type">{selectedSpeaker.title}</span>
                                <p className="modal-affiliation-highlight">{selectedSpeaker.affiliation}</p>
                                <p className="modal-desc">{selectedSpeaker.bio || "A distinguished expert in the field of vortex dynamics and fluid mechanics, contributing significantly to research and computational analysis."}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    );
};

export default SpeakersSection;
