import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://lijrjyan.github.io',
  base: '/turnkey-site/',
  integrations: [
    starlight({
      title: 'Turnkey',
      description: 'Build, run, debug, and audit jailbreak detectors.',
      logo: { src: './src/assets/turnkey-mark.svg' },
      favicon: '/turnkey-site/favicon.svg',
      social: [
        { icon: 'github', label: 'Turnkey on GitHub', href: 'https://github.com/lijrjyan/turnkey' },
      ],
      editLink: {
        baseUrl: 'https://github.com/lijrjyan/turnkey-site/edit/main/',
      },
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      pagefind: true,
      sidebar: [
        { label: 'Home', slug: 'index' },
        {
          label: 'Start here',
          items: [
            { label: 'Install', slug: 'start/install' },
            { label: 'Five-minute run', slug: 'start/five-minute-run' },
            { label: 'Choose your path', slug: 'start/choose-your-path' },
          ],
        },
        {
          label: 'Learn',
          items: [
            { label: 'Course overview', slug: 'learn' },
            { label: '1 · First auditable run', slug: 'learn/quickstart' },
            { label: '2 · Build a detector', slug: 'learn/build-your-own-detector' },
            { label: '3 · Debug a missed case', slug: 'learn/debug-a-missed-case' },
            { label: '4 · Work with typed signals', slug: 'learn/typed-signals' },
          ],
        },
        {
          label: 'Tutorials',
          items: [
            { label: 'Tutorial map', slug: 'tutorials' },
            { label: 'Inspect run artifacts', slug: 'tutorials/inspect-artifacts' },
            { label: 'Calibrate a threshold', slug: 'tutorials/calibrate-threshold' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Guide map', slug: 'guides' },
            { label: 'External components', slug: 'guides/external-components' },
            { label: 'Reproducible runs', slug: 'guides/reproducible-runs' },
            { label: 'Troubleshooting', slug: 'guides/troubleshooting' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'System model', slug: 'concepts/system-model' },
            { label: 'Artifacts and audit', slug: 'concepts/artifacts-and-audit' },
            { label: 'Detector signals', slug: 'concepts/detector-signals' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Reference index', slug: 'reference' },
            { label: 'CLI', slug: 'reference/cli' },
            { label: 'Configuration', slug: 'reference/configuration' },
            { label: 'Artifact schema', slug: 'reference/artifact-schema' },
            { label: 'Release status', slug: 'reference/release-status' },
          ],
        },
        {
          label: 'Project',
          items: [
            { label: 'Contributing', slug: 'project/contributing' },
            { label: 'Documentation policy', slug: 'project/documentation-policy' },
            { label: 'Security', slug: 'project/security' },
          ],
        },
      ],
    }),
  ],
});
