import Sessions from '../../pages_orig/Sessions/Sessions';

export const metadata = {
    title: 'Sessions | POLYMAT2026',
    description: 'Special sessions and themes for the POLYMAT2026 conference in Singapore.',
    alternates: {
        canonical: 'https://polymat2026.com/sessions',
    }
};

export default function Page() {
    return <Sessions />;
}
