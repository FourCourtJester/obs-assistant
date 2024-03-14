import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run obs-assistant:serve',
        production: 'nx run obs-assistant:preview',
      },
      ciWebServerCommand: 'nx run obs-assistant:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
