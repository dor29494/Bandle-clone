// analytics.js
import Analytics from '@analytics/core';
import googleTagManager from '@analytics/google-tag-manager';

const analytics = Analytics({
  app: 'Shirdle',
  plugins: [
    googleTagManager({
      containerId: 'G-EZR4TGGMZB'
    })
  ]
});

export default analytics;
