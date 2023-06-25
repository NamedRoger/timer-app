import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import { ConfigurationTimerProvider } from './contexts/ConfigurationTimerContext';

function render() {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(
    <ConfigurationTimerProvider>
      <App />
    </ConfigurationTimerProvider>
  );
}

render();
