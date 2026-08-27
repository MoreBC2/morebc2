import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const generatedSection = (label, directory) => ({
  label,
  items: [{ autogenerate: { directory } }],
});

export default defineConfig({
  site: 'https://morebc2-preview.pages.dev',
  integrations: [
    starlight({
      title: 'MoreBC2',
      description: 'Community-maintained, source-backed documentation for the BitcoinII (BC2) ecosystem.',
      disable404Route: true,
      lastUpdated: true,
      pagination: true,
      customCss: ['./src/styles/morebc2.css'],
      // This deployment is a review preview, not the public launch. Keep a
      // site-wide robots directive in the rendered HTML in addition to the
      // Cloudflare header and robots.txt protections in public/.
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'robots',
            content: 'noindex, nofollow, noarchive, nosnippet',
          },
        },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'MoreBC2', link: '/' },
            { label: 'What is BitcoinII?', link: '/documentation/what-is-bitcoinii/' },
            { label: 'Project status', link: '/project/project-status/' },
          ],
        },
        generatedSection('Documentation', 'documentation'),
        generatedSection('Architecture', 'architecture'),
        generatedSection('Configuration', 'configuration'),
        generatedSection('Encyclopedia', 'encyclopedia'),
        generatedSection('Wallets', 'wallets'),
        generatedSection('Nodes', 'nodes'),
        generatedSection('Mining', 'mining'),
        generatedSection('Developers', 'developers'),
        generatedSection('API', 'api'),
        generatedSection('Infrastructure', 'infrastructure'),
        generatedSection('Releases', 'releases'),
        generatedSection('Compatibility', 'compatibility'),
        generatedSection('Exchange integration', 'exchange'),
        generatedSection('Ecosystem', 'ecosystem'),
        generatedSection('Research', 'research'),
        generatedSection('History', 'history'),
        generatedSection('Verification', 'verification'),
        generatedSection('Contribute & project', 'project'),
      ],
    }),
  ],
});
