import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import { getInitialTheme, applyTheme } from './lib/theme';
import App from './App.jsx';

applyTheme(getInitialTheme());

createRoot(document.getElementById('root')).render(<App />);
