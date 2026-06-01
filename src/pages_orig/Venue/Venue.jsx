'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../../components/common/Button/Button';
import { fetchContent } from '../../api/contentApi';
import './Venue.css';
import vortexImg from '../../assets/images/vortex.jpg';

const Venue = () => {

    const router = useRouter();
    const navigate = (path) => router.push(path);
    const [venueHtml, setVenueHtml] = useState('');
    const [mapLink, setMapLink] = useState('');
    const [cityInfo, setCityInfo] = useState({
        cityName: '',
        desc1: '',
        desc2: '',
        population: '',
        temperature: '',
        timezone: '',
        cityImageUrl: ''
    });
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        fetchContent('venueContent').then(data => {
            if (data) {
                if (data.html) setVenueHtml(data.html);
                if (data.mapLink) setMapLink(data.mapLink);
            }
        }).catch(() => { });

        fetchContent('hostCityAttractions').then(data => {
            if (data) {
                setCityInfo({
                    cityName: data.cityName || '',
                    desc1: data.desc1 || '',
                    desc2: data.desc2 || '',
                    population: data.population || '',
                    temperature: data.temperature || '',
                    timezone: data.timezone || '',
                    cityImageUrl: data.cityImageUrl || ''
                });
                if (Array.isArray(data.attractions) && data.attractions.length > 0) {
                    setAttractions(data.attractions);
                }
            }
        }).catch(() => { });
    }, []);

    const venueFeatures = [
        {
            title: 'World-Class Facilities',
            description: 'State-of-the-art conference halls equipped with the latest audio-visual technology'
        },
        {
            title: 'Catering Services',
            description: 'International cuisine and refreshments throughout the conference'
        },
        {
            title: 'Easy Access',
            description: 'Convenient location with excellent public transport connections'
        },
        {
            title: 'High-Speed WiFi',
            description: 'Complimentary high-speed internet access throughout the venue'
        },
        {
            title: 'Parking Available',
            description: 'Ample parking space for all attendees'
        },
        {
            title: 'Accessibility',
            description: 'Fully accessible facilities for all participants'
        }
    ];

    const defaultAttractions = [
        {
            name: 'Gardens by the Bay',
            distance: '1.5 km',
            image: "https://www.bing.com/th/id/OIP.d4BXWuPhEaobxhJHDsmpfgHaE8?w=238&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
        },
        {
            name: 'Marina Bay Sands',
            distance: '2.0 km',
            image: "https://www.bing.com/th/id/OIP.w-__LWQfcodvks2nfUOsdAHaEj?w=252&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
        },
        {
            name: 'Singapore Botanic Gardens',
            distance: '4.5 km',
            image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80"
        }
    ];

    const displayAttractions = attractions.length > 0 ? attractions : defaultAttractions;

    return (
        <div className="venue-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Event Venue</h1>
                    <p className="page-breadcrumb">Home / Venue</p>
                </div>
            </div>

            {/* About the City Section */}
            <section className="about-city section-padding" style={{ background: 'var(--color-bg-light)' }}>
                <div className="container">
                    <div className="about-city-content">
                        <div className="about-city-text">

                            <h2 className="section-title">About the Host City</h2>
                            {(cityInfo.desc1 || cityInfo.desc2) ? (
                                <>
                                    {cityInfo.desc1 && <p className="city-description">{cityInfo.desc1}</p>}
                                    {cityInfo.desc2 && <p className="city-description">{cityInfo.desc2}</p>}
                                </>
                            ) : venueHtml ? (
                                <div className="city-description" dangerouslySetInnerHTML={{ __html: venueHtml }} />
                            ) : (
                                <>
                                    <p className="city-description">
                                        Amsterdam is a global hub for education, innovation, and technology. Known for its
                                        stunning skyline, lush green spaces, and diverse cultural heritage, it offers a
                                        unique blend of tradition and modernity.
                                    </p>
                                    <p className="city-description">
                                        As one of the world's leading conference destinations, Amsterdam provides
                                        state-of-the-art facilities and world-class infrastructure. Located in the
                                        historical heart of the city, offers easy access to major business districts and
                                        iconic landmarks.
                                    </p>
                                </>
                            )}
                            <div className="city-stats" style={{ marginTop: '2rem' }}>
                                <div className="stat-box">
                                    <h3>{cityInfo.population || '5.6M+'}</h3>
                                    <p>Population</p>
                                </div>
                                <div className="stat-box">
                                    <h3>{cityInfo.temperature || '31°C'}</h3>
                                    <p>Avg. Temperature</p>
                                </div>
                                <div className="stat-box">
                                    <h3>{cityInfo.timezone || 'GMT+8'}</h3>
                                    <p>Time Zone</p>
                                </div>
                            </div>
                        </div>
                        <div className="about-city-image">
                            <img
                                src={cityInfo.cityImageUrl || "https://tse3.mm.bing.net/th/id/OIP.jJNZIfQn_INbB0uopJI_vgHaFH?w=1024&h=708&rs=1&pid=ImgDetMain&o=7&rm=3"}
                                alt={`${cityInfo.cityName || 'Singapore'} City Skyline`}
                                style={{ borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '100%', height: 'auto', display: 'block', maxHeight: '400px', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.src = "https://tse3.mm.bing.net/th/id/OIP.jJNZIfQn_INbB0uopJI_vgHaFH?w=1024&h=708&rs=1&pid=ImgDetMain&o=7&rm=3";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Venue Overview Section (Rich Text from Workflow) */}
            {venueHtml && (cityInfo.desc1 || cityInfo.desc2) && (
                <section className="venue-rich-text-section section-padding" style={{ background: 'var(--color-bg-white)', borderTop: '1px solid var(--color-border-light)' }}>
                    <div className="container">
                        <div className="text-center mb-5">
                            <h4 className="section-subtitle">Overview</h4>
                            <h2 className="section-title">Venue Details</h2>
                        </div>
                        <div className="venue-rich-content" style={{ maxWidth: '900px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: venueHtml }} />
                    </div>
                </section>
            )}

            {/* Nearby Attractions */}
            <section className="nearby-attractions section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <h4 className="section-subtitle">Explore</h4>
                        <h2 className="section-title">Nearby Attractions</h2>
                        <p className="section-desc">
                            Make the most of your visit with these must-see destinations
                        </p>
                    </div>

                    <div className="attractions-grid">
                        {displayAttractions.map((attraction, index) => (
                            <div className="attraction-card" key={index}>
                                <div className="attraction-image">
                                    <img
                                        src={attraction.imageUrl || attraction.image}
                                        alt={attraction.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = vortexImg;
                                        }}
                                    />
                                    <div className="attraction-distance">{attraction.distance}</div>
                                </div>
                                <div className="attraction-info">
                                    <h3>{attraction.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            {mapLink && (
                <section className="venue-map-section section-padding" style={{ background: 'var(--color-bg-light)', borderTop: '1px solid var(--color-border-light)' }}>
                    <div className="container">
                        <div className="text-center mb-5">
                            <h4 className="section-subtitle">Location</h4>
                            <h2 className="section-title">Venue Location Map</h2>
                        </div>
                        <div className="venue-map-container" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', height: '450px', width: '100%' }}>
                            <iframe
                                src={mapLink}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>
            )}

            {/* Venue Features Section */}
            <section className="venue-features section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <h4 className="section-subtitle">Venue Amenities</h4>
                        <h2 className="section-title">Why Choose Our Venue</h2>
                        <p className="section-desc">
                            Experience world-class facilities designed for international conferences
                        </p>
                    </div>

                    <div className="features-grid">
                        {venueFeatures.map((feature, index) => (
                            <div className="feature-card" key={index}>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-desc">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="venue-cta section-padding">
                <div className="container text-center">
                    <h2 className="cta-title">
                        Ready to Join Us?
                    </h2>
                    <p className="cta-desc">
                        Secure your spot at the International Conference on POLYMERS AND COMPOSITE MATERIALS and be part of this transformative event
                    </p>
                    <div className="cta-action">
                        <Button
                            onClick={() => navigate('/register')}
                        >
                            REGISTER NOW
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Venue;
