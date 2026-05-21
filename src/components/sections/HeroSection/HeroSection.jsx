'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, MapPin, Calendar } from 'lucide-react';
import Button from '../../common/Button/Button';
import './HeroSection.css';
import { fetchContent } from '../../../api/contentApi';
import { resolveImageUrl } from '../../../api/utilsApi';

const DEFAULTS = {
    subtitle: 'ANNUAL INTERNATIONAL CONFERENCE ON',
    title: 'Polymers and Composite Materials',
    description: 'Global Summit on Polymers and Composite Materials, where global experts unite to shape the future of material science. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
    conferenceDate: 'November 16-18, 2026',
    venue: 'Amsterdam, Netherlands',
    countdownTarget: '2026-11-16T09:00:00+01:00',
    showRegister: true,
    showAbstract: true,
    showBrochure: true,
    showAnnouncement: false,
    announcementUrl: '/pdfs/announcement.pdf',
};

const HeroSection = () => {
    const router = useRouter();
    const navigate = (path) => router.push(path);
    const [hero, setHero] = useState(DEFAULTS);
    const [chairs, setChairs] = useState(null);
    const calcTimeLeft = (target) => {
        const diff = new Date(target).getTime() - Date.now();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
        };
    };
    // Initialize to null to avoid SSR/client hydration mismatch.
    // The real value is set in useEffect (client-only).
    const [timeLeft, setTimeLeft] = useState(null);
    const [collaborations, setCollaborations] = useState([]);

    // resolveImageUrl from siteApi.js handles both local (localhost:5050) and
    // production (VITE_API_URL) — never hardcodes localhost for image paths.
    const resolveUrl = resolveImageUrl;

    // Fetch dynamic content from backend
    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('hero').then(data => {
                if (!cancelled && data) setHero(prev => ({ ...prev, ...data }));
            });

            fetchContent('heroChairs').then(data => {
                if (!cancelled) {
                    if (data && Array.isArray(data)) {
                        // Top-level array (ideal case)
                        const validChairs = data.filter(c => c && c.name);
                        setChairs(validChairs);
                    } else if (data && data._items && Array.isArray(data._items)) {
                        // ✅ Deployed backend stores array as data._items — most recent save wins
                        const validChairs = data._items.filter(c => c && c.name);
                        setChairs(validChairs);
                    } else if (data && (data.chair?.name || data.viceChair?.name || data.coChair?.name)) {
                        // Legacy schema migration
                        const migrated = [];
                        ['chair', 'viceChair', 'coChair'].forEach(k => {
                            if (data[k] && data[k].name) {
                                migrated.push({ id: k, ...data[k] });
                            }
                        });
                        setChairs(migrated);
                    } else if (data && typeof data === 'object') {
                        // Recover from corrupted save: { "0":{...}, "1":{...} }
                        const numKeys = Object.keys(data)
                            .filter(k => !isNaN(k))
                            .sort((a, b) => Number(a) - Number(b));
                        if (numKeys.length > 0) {
                            const recovered = numKeys.map(k => data[k]).filter(c => c && c.name);
                            setChairs(recovered);
                        } else {
                            setChairs([]);
                        }
                    } else if (data === null || data === undefined) {
                        // Fallback dummy data if nothing is saved yet
                        setChairs([
                            { id: 1, name: 'Dr. Chaoqun Liu', affiliation: 'University of Texas at Arlington', country: 'USA', title: 'Conference Chairman' },
                            { id: 2, name: 'Dr. Yiqian Wang', affiliation: 'Soochow University', country: 'China', title: 'Conference Co-chairman' },
                            { id: 3, name: 'Dr. James Chen', affiliation: 'Singapore Food Agency', country: 'Singapore', title: 'Conference Co-chairman' }
                        ]);
                    } else {
                        setChairs([]);
                    }
                }
            }).catch(err => {
                console.error('Failed to fetch heroChairs:', err);
            });

            // Fetch Collaborations
            import('../../../api/index').then(api => {
                api.fetchSponsors('collaboration').then(data => {
                    if (!cancelled && data) setCollaborations(data);
                });
            });
        };

        load();

        // Polling every 15s to reflect dashboard changes live
        const interval = setInterval(load, 15000);

        // Also refresh when tab becomes visible
        const onVisible = () => {
            if (document.visibilityState === 'visible') load();
        };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    useEffect(() => {
        const target = hero.countdownTarget || DEFAULTS.countdownTarget;
        // Calculate immediately so countdown shows correct value on first render
        setTimeLeft(calcTimeLeft(target));

        const interval = setInterval(() => {
            const tl = calcTimeLeft(target);
            setTimeLeft(tl);
            if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [hero.countdownTarget]);

    // Parse date for info-card (expects "Month Day-Day, Year" or similar)
    const monthStr = hero.conferenceDate?.split(' ')[0] || 'December';
    const daysStr = hero.conferenceDate?.split(' ').slice(1).join(' ') || '14-16, 2026';

    const renderTitle = () => {
        if (!hero.title) return DEFAULTS.title;
        const lines = hero.title.trim().split('\n');
        return lines.map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i !== lines.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    const bgUrl = resolveUrl(hero.bgImage);
    const heroBgStyle = bgUrl
        ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${bgUrl}')` }
        : {};

    return (
        <section className="hero" style={heroBgStyle}>
            <div className="hero__overlay"></div>
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-sub">{hero.subtitle}</span>
                        {renderTitle()}
                    </h1>

                    <div className="hero__countdown-wrapper">
                        <span className="days-to-go-label">Days To Go</span>
                        <div className="hero__countdown">
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft?.days ?? '--'}</span>
                                <span className="countdown-label">Days</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft?.hours ?? '--'}</span>
                                <span className="countdown-label">Hours</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft?.minutes ?? '--'}</span>
                                <span className="countdown-label">Minutes</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft?.seconds ?? '--'}</span>
                                <span className="countdown-label">Seconds</span>
                            </div>
                        </div>
                    </div>

                    <p className="hero__desc">{hero.description}</p>

                    <div className="hero-actions-container">
                        <div className="hero__actions">
                            {hero.showBrochure !== false && (
                                <Button className="hero-btn-small" onClick={() => navigate('/brochure')}>DOWNLOAD BROCHURE</Button>
                            )}
                            {hero.showAbstract !== false && (
                                <Button className="hero-btn-small" onClick={() => navigate('/abstract-submission')}>SUBMIT ABSTRACT</Button>
                            )}
                            {hero.showRegister !== false && (
                                <Button className="btn-elevate hero-btn-small" onClick={() => navigate('/register')}>REGISTER NOW</Button>
                            )}
                            {hero.showAnnouncement && (
                                <Button className="btn-elevate hero-btn-small" onClick={() => window.open(resolveUrl(hero.announcementUrl || '/pdfs/announcement.pdf'), '_blank')}>CONFERENCE ANNOUNCEMENT</Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="hero__right">
                    <div className="hero__info-cards">
                        <div className="info-card date-card">
                            <h3>{monthStr}</h3>
                            <p><Calendar size={18} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-block', marginBottom: '2px' }} /> {daysStr}</p>
                        </div>
                        <div className="info-card venue-card">
                            <h3>Venue</h3>
                            <p><MapPin size={18} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-block', marginBottom: '2px' }} /> {hero.venue}</p>
                        </div>
                    </div>

                    {/* Chairs section hidden per user request */}
                </div>
            </div>

            {collaborations.length > 0 && (
                <div className="hero__collaborations">
                    <div className="collab-container">
                        <div className="collab-group">
                            <span className="collab-label">Collaboration / Sponsor</span>
                            <div className="collab-logos">
                                {collaborations.map(c => (
                                    <div key={c._id} className="collab-logo-item">
                                        <a href={c.link || '/'} target="_blank" rel="noopener noreferrer" className="collab-logo-link">
                                            <img src={resolveUrl(c.logo)} alt={c.name} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    ); 
};

export default HeroSection;
//
