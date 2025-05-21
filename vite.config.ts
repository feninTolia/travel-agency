import { reactRouter } from '@react-router/dev/vite';
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from '@sentry/react-router';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const sentryConfig: SentryReactRouterBuildOptions = {
  org: 'ftoe',
  project: 'travel-agency',
  // An auth token is required for uploading source maps.
  authToken:
    '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',
};

export default defineConfig((config) => {
  return {
    plugins: [
      tsconfigPaths(),
      reactRouter(),
      sentryReactRouter(sentryConfig, config),
      tailwindcss(),
    ],
    sentryConfig,
    ssr: { noExternal: [/@syncfusion/] },
  };
});
