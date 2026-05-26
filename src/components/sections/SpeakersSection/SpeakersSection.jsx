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
    const [flippedId, setFlippedId] = useState(null);

    const handleCardClick = (speaker) => {
        // On touch devices, first tap flips, second tap opens modal
        if (flippedId === speaker.id) {
            openModal(speaker);
            setFlippedId(null);
        } else {
            setFlippedId(speaker.id);
        }
    };

    const getDisplayCategory = (category) => {
        if (!category) return '';
        const cat = category.trim();
        if (cat === 'Student' || cat === 'Students') return 'Student';
        if (cat === 'Keynote' || cat === 'Keynote Speaker') return 'Keynote Speaker';
        if (cat === 'Plenary' || cat === 'Plenary Speaker') return 'Plenary Speaker';
        if (cat === 'Delegate' || cat === 'Delegates') return 'Delegates';
        if (cat === 'Poster Presenter' || cat === 'Poster' || cat === 'Posters') return 'Posters';
        if (cat === 'Speakers' || cat === 'Speaker' || cat === 'Invited' || cat === 'Invited Speaker') return 'Speakers';
        if (cat === 'Committee' || cat === 'Committees') return 'Committee';
        return cat;
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

    const displaySpeakers = filteredSpeakers.slice(0, showViewAll ? 12 : filteredSpeakers.length);

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
                    <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Global Participants</h2>
                    <div className="section-title-underline"></div>
                </div>

                <div className="speakers__filters">
                    {['All', 'Committee', 'Speakers', 'Plenary Speaker', 'Keynote Speaker', 'Delegates', 'Posters', 'Student'].map((category) => (
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
                            <p>Loading speakers...</p>
                        </div>
                    ) : displaySpeakers.length > 0 ? (
                        displaySpeakers.map((speaker) => (
                            <div
                                className={`sc-flip${flippedId === speaker.id ? ' is-flipped' : ''}`}
                                key={speaker.id}
                                onClick={() => handleCardClick(speaker)}
                            >
                                <div className="sc-flip__inner">

                                    {/* FRONT */}
                                    <div className="sc-front">
                                        {speaker.image ? (
                                            <img
                                                src={resolveImageUrl(speaker.image)}
                                                alt={speaker.name}
                                                className="sc-front__img"
                                            />
                                        ) : (
                                            <div className="sc-front__fallback">
                                                <User size={52} color="#94a3b8" />
                                            </div>
                                        )}
                                        <div className="sc-front__overlay">
                                            {speaker.category && (
                                                <span className="sc-badge">{getDisplayCategory(speaker.category)}</span>
                                            )}
                                            <h3 className="sc-front__name">{speaker.name}</h3>
                                            {speaker.affiliation && (
                                                <p className="sc-front__org">{speaker.affiliation}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* BACK */}
                                    <div className="sc-back">
                                        <div className="sc-back__avatar-wrap">
                                            {speaker.image ? (
                                                <img
                                                    src={resolveImageUrl(speaker.image)}
                                                    alt={speaker.name}
                                                    className="sc-back__avatar"
                                                />
                                            ) : (
                                                <div className="sc-back__avatar-fallback">
                                                    <User size={32} color="var(--color-primary-end)" />
                                                </div>
                                            )}
                                        </div>
                                        {speaker.category && (
                                            <span className="sc-badge sc-badge--light">{getDisplayCategory(speaker.category)}</span>
                                        )}
                                        <h3 className="sc-back__name">{speaker.name}</h3>
                                        {speaker.title && <p className="sc-back__role">{speaker.title}</p>}
                                        {speaker.affiliation && <p className="sc-back__org">{speaker.affiliation}</p>}
                                        <button className="sc-back__btn" onClick={(e) => { e.stopPropagation(); openModal(speaker); }}>
                                            View Biography
                                        </button>
                                    </div>

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
