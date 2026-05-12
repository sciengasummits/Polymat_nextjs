import { useEffect } from 'react';
import { fetchContent } from '../api/contentApi';

const SITE_NAME = 'POLYMAT2026';
const BASE_URL = 'https://polymat2026.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_DESC =
  'INTERNATIONAL CONFERENCE ON POLYMERS AND COMPOSITE MATERIALS. December 14–16, 2026 · Outram, Singapore.';

// Cache so we only fetch once per session
let _metaCache = null;
let _metaFetch = null;

function getMetaTags() {
    if (_metaCache) return Promise.resolve(_metaCache);
    if (_metaFetch) return _metaFetch;
    _metaFetch = fetchContent('meta_tags')
        .then(data => { _metaCache = data || {}; return _metaCache; })
        .catch(() => { _metaCache = {}; return _metaCache; });
    return _metaFetch;
}

/**
 * usePageSEO – sets <title>, meta description, Open Graph and Twitter
 * tags dynamically per page. Pulls values from the dashboard DB first,
 * falling back to the provided props, then site-wide defaults.
 *
 * @param {{ pageKey?: string, title?: string, description?: string, image?: string, canonical?: string }} options
 *   pageKey – matches the key used in the workflow MetaTags page (e.g. 'home', 'contact', 'registration', 'speakers', 'venue', 'abstract')
 */
const usePageSEO = ({ pageKey, title, description, image, canonical } = {}) => {
    useEffect(() => {
        const apply = (dbData) => {
            const db = (pageKey && dbData?.[pageKey]) || {};

            const rawTitle = db.title || title;
            const fullTitle = rawTitle
                ? (rawTitle.includes(SITE_NAME) ? rawTitle : `${rawTitle} | ${SITE_NAME}`)
                : `${SITE_NAME} | INTERNATIONAL CONFERENCE ON POLYMERS AND COMPOSITE MATERIALS – Singapore`;

            const desc = db.description || description || DEFAULT_DESC;
            const keywords = db.keywords || '';
            const img = image || DEFAULT_IMAGE;
            const canon = canonical || BASE_URL + '/';

            // ── <title>
            document.title = fullTitle;

            const setMeta = (selector, attr, value) => {
                let el = document.querySelector(selector);
                if (!el) {
                    el = document.createElement('meta');
                    const [key, val] = selector.replace(/[\[\]]/g, '').split('=');
                    el.setAttribute(key, val.replace(/"/g, ''));
                    document.head.appendChild(el);
                }
                el.setAttribute(attr, value);
            };

            // ── Primary
            setMeta('meta[name="description"]', 'content', desc);
            if (keywords) setMeta('meta[name="keywords"]', 'content', keywords);

            // ── Open Graph
            setMeta('meta[property="og:title"]', 'content', fullTitle);
            setMeta('meta[property="og:description"]', 'content', desc);
            setMeta('meta[property="og:image"]', 'content', img);
            setMeta('meta[property="og:url"]', 'content', canon);

            // ── Twitter
            setMeta('meta[name="twitter:title"]', 'content', fullTitle);
            setMeta('meta[name="twitter:description"]', 'content', desc);
            setMeta('meta[name="twitter:image"]', 'content', img);

            // ── Canonical
            let canonEl = document.querySelector('link[rel="canonical"]');
            if (!canonEl) {
                canonEl = document.createElement('link');
                canonEl.setAttribute('rel', 'canonical');
                document.head.appendChild(canonEl);
            }
            canonEl.setAttribute('href', canon);
        };

        // Apply static props immediately so the page title is never blank
        apply({});

        // Then fetch from DB and override if data exists
        getMetaTags().then(apply);
    }, [pageKey, title, description, image, canonical]);
};

export default usePageSEO;
