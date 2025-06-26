import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './index.css';

// Suppress browser extension errors in development
declare const __DEV__: boolean;

if (typeof __DEV__ !== 'undefined' && __DEV__) {
  const originalError = console.error;
  console.error = (...args) => {
    // Filter out common browser extension errors
    const message = args[0]?.toString() || '';
    if (
      message.includes('message channel closed') ||
      message.includes('Extension context invalidated') ||
      message.includes('listener indicated an asynchronous response')
    ) {
      return; // Suppress these errors
    }
    originalError.apply(console, args);
  };
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);