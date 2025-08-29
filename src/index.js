import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Performance monitoring (optional)
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Error boundary for production stability
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ORAC Error Boundary caught an error:', error, errorInfo);
    }
    
    // In production, you might want to log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-4">🔧</div>
            <h1 className="text-2xl font-bold mb-4">ORAC System Error</h1>
            <p className="text-gray-400 mb-6">
              The Operational Reality Architect encountered an unexpected error. 
              Our cognitive systems are working to resolve this issue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Restart ORAC System
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left bg-gray-800 p-4 rounded-lg">
                <summary className="cursor-pointer text-yellow-400 mb-2">
                  Development Error Details
                </summary>
                <pre className="text-xs text-gray-300 overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render with error boundary and strict mode for development
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Performance monitoring and reporting
function reportWebVitals(metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('ORAC Performance:', metric);
  }
  
  // In production, send to analytics service
  // Example: sendToAnalytics(metric);
}

// Report web vitals for performance monitoring
if (typeof reportWebVitals === 'function') {
  getCLS(reportWebVitals);
  getFID(reportWebVitals);
  getFCP(reportWebVitals);
  getLCP(reportWebVitals);
  getTTFB(reportWebVitals);
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ORAC Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('ORAC Service Worker registration failed:', error);
      });
  });
}

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('ORAC Unhandled Promise Rejection:', event.reason);
  
  // Prevent default browser error handling
  event.preventDefault();
  
  // In production, you might want to log this to an error service
  // logErrorToService(event.reason);
});

// Console branding for developers who inspect the code
if (process.env.NODE_ENV === 'development') {
  console.log(
    '%c🧠 ORAC - Operational Reality Architect & Command',
    'color: #3b82f6; font-size: 16px; font-weight: bold;'
  );
  console.log(
    '%cDeveloped by Dr. Michael Morales | Next-Generation Context Engineering',
    'color: #10b981; font-size: 12px;'
  );
  console.log(
    '%cExplore the future of AI at: https://github.com/yourusername/orac-prototype',
    'color: #f59e0b; font-size: 12px;'
  );
}
