import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'MoreBC2',
      description: 'Community-maintained, source-backed documentation for the BitcoinII (BC2) ecosystem.',
      lastUpdated: true,
      pagination: true,
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'MoreBC2', link: '/' },
            { label: 'What is BitcoinII?', link: '/documentation/what-is-bitcoinii/' },
            { label: 'Project status', link: '/project/project-status/' },
          ],
        },
        { label: 'Documentation', autogenerate: { directory: 'documentation' } },
        { label: 'Architecture', autogenerate: { directory: 'architecture' } },
        { label: 'Wallets', autogenerate: { directory: 'wallets' } },
        { label: 'Nodes', autogenerate: { directory: 'nodes' } },
        { label: 'Mining', autogenerate: { directory: 'mining' } },
        { label: 'Developers', autogenerate: { directory: 'developers' } },
        { label: 'API', autogenerate: { directory: 'api' } },
        { label: 'Infrastructure', autogenerate: { directory: 'infrastructure' } },
        { label: 'Releases', autogenerate: { directory: 'releases' } },
        { label: 'Compatibility', autogenerate: { directory: 'compatibility' } },
        { label: 'Exchange integration', autogenerate: { directory: 'exchange' } },
        { label: 'Ecosystem', autogenerate: { directory: 'ecosystem' } },
        { label: 'Research', autogenerate: { directory: 'research' } },
        { label: 'History', autogenerate: { directory: 'history' } },
        { label: 'Verification', autogenerate: { directory: 'verification' } },
        { label: 'Contribute & project', autogenerate: { directory: 'project' } },
      ],
    }),
  ],
});
