import axios from 'axios';

// Detect if we are running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// For local dev, use the proxy defined in vite.config.js
// For production (if deployed on a real server), use the server URL
// For GitHub Pages demo, we might want to mock things, but for now we'll just set the base URL
const API_URL = isGitHubPages
    ? 'https://corralon-backend-demo.onrender.com/api' // Placeholder for a real backend if you deploy it
    : '/api';

const api = axios.create({
    baseURL: API_URL
});

export default api;
