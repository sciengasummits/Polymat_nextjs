import React from 'react';
import './PreviousConferenceSection.css';

const conferenceImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800', alt: 'Polymers and Composite Materials 1' },
    { id: 2, src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', alt: 'Polymers and Composite Materials 2' },
    { id: 3, src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800', alt: 'Polymers and Composite Materials 3' },
    { id: 4, src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', alt: 'Polymers and Composite Materials 4' },
    { id: 5, src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800', alt: 'Polymers and Composite Materials 5' },
    { id: 6, src: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=800', alt: 'Polymers and Composite Materials 6' },
    { id: 7, src: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=800', alt: 'Polymers and Composite Materials 7' }
];

const MarqueeRow = ({ items, direction }) => (
    <div className={`conference-marquee-row ${direction}`}>
        {[...items, ...items, ...items].map((image, index) => (
            <div key={`${image.id}-${index}`} className="conference-marquee-item">
                <img
                    src={image.src.src || image.src}
                    alt={image.alt}
                    className="conference-image"
                />
            </div>
        ))}
    </div>
);

const PreviousConferenceSection = () => {
    const row1 = conferenceImages.slice(0, 5);
    const row2 = conferenceImages.slice(5);

    return (
        <section className="previous-conference-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Previous Conference Images</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="conference-marquee-wrapper">
                    <MarqueeRow items={row1} direction="scroll-left" />
                    <MarqueeRow items={row2} direction="scroll-right" />
                </div>
            </div>
        </section>
    );
};

export default PreviousConferenceSection;
