import { UILayoutDefinition } from '@fylib/core';

export const AppLayoutDefinition: UILayoutDefinition = {
  name: 'app-layout',
  version: '1.0.0',
  slots: [
    { name: 'header', required: false },
    { name: 'sidebar', required: false },
    { name: 'content', required: true },
    { name: 'footer', required: false }
  ]
};
