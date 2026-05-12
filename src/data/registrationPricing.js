/* ── Shared Pricing Defaults for Register and Online Registration ── */
export const PRICING_DEFAULTS = {
    earlyBirdEndDate: '2026-09-25',
    standardEndDate: '2026-10-30',
    onspotEndDate: '2026-12-14',
    categories: [
        { id: 'speaker', label: 'Speaker Registration', early: 599, standard: 699, onspot: 799 },
        { id: 'delegate', label: 'Delegate Registration', early: 699, standard: 799, onspot: 899 },
        { id: 'poster', label: 'Poster Registration', early: 399, standard: 499, onspot: 599 },
        { id: 'student', label: 'Student', early: 299, standard: 399, onspot: 499 },
        { id: 'virtual', label: 'Virtual (Online)', early: 200, standard: 300, onspot: 400 },
    ],
    sponsorships: [
        { id: 'platinum', label: 'Platinum Sponsor', price: 4999 },
        { id: 'diamond', label: 'Diamond Sponsor', price: 3999 },
        { id: 'gold', label: 'Gold Sponsor', price: 2999 },
        { id: 'exhibitor', label: 'Exhibitor', price: 1999 },
    ],
    accommodation: [
        { nights: 2, single: 360, double: 400, triple: 440 },
        { nights: 3, single: 540, double: 600, triple: 660 },
        { nights: 4, single: 720, double: 800, triple: 880 },
        { nights: 5, single: 900, double: 1000, triple: 1100 },
    ],
    accompanyingPersonPrice: 249,
    processingFeePercent: 5,
};
