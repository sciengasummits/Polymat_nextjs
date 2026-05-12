import ThemeDetail from '../../../pages_orig/ThemeDetail/ThemeDetail';

// Generate dynamic metadata based on the URL parameter if needed
// Or use a generic one
export function generateMetadata({ params }) {
    // We would destructure themeId from Promise in Next.js 15
    // But since we are just wrapping, we set a generic title here
    return {
        title: 'Theme Details | POLYMAT2026',
        description: 'Details and information about specific themes and sessions.',
    };
}

export default function Page() {
    return <ThemeDetail />;
}
