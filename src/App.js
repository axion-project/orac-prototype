import React, { useState, useEffect } from 'react';
import OracPrototype from './components/OracPrototype';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showWelcome, setShowWelcome] = useState(true);
  const [systemStatus, setSystemStatus] = useState('initializing');

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // System initialization simulation
  useEffect(() => {
    const initSequence = async () => {
      setSystemStatus('initializing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSystemStatus('loading_models');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSystemStatus('connecting_streams');
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setSystemStatus('ready');
      
      // Auto-hide welcome after a delay
      setTimeout(() => {
        setShowWelcome(false);
      }, 2000);
    };

    initSequence();
  }, []);

  const getStatusMessage = (status) => {
    switch (status) {
      case 'initializing':
        return 'Initializing ORAC Systems...';
      case 'loading_models':
        return 'Loading Cognitive Models...';
      case 'connecting_streams':
        return 'Connecting Real-Time Streams...';
      case 'ready':
        return 'ORAC Systems Online';
      default:
        return 'System Status Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
        return 'text-green-400';
      case 'initializing':
      case 'loading_models':
      case 'connecting_streams':
        return 'text-yellow-400';
      default:
        return 'text-red-400';
    }
  };

  // Welcome screen component
  const WelcomeScreen = () => (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        <div className="text-8xl mb-8 animate-pulse">⚡</div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
          ORAC
        </h1>
        
        <h2 className="text-xl text-gray-300 mb-8">
          Operational Reality Architect & Command
        </h2>
        
        <div className="mb-8">
          <p className={`text-lg mb-4 ${getStatusColor(systemStatus)}`}>
            {getStatusMessage(systemStatus)}
          </p>
          
          {systemStatus !== 'ready' && (
            <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: systemStatus === 'initializing' ? '25%' :
                         systemStatus === 'loading_models' ? '60%' :
                         systemStatus === 'connecting_streams' ? '85%' : '100%'
                }}
              />
            </div>
          )}
        </div>

        {systemStatus === 'ready' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-green-400 text-lg">
              <Wifi size={20} />
              <span>Real-Time Streams Active</span>
            </div>
            
            <button
              onClick={() => setShowWelcome(false)}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Enter ORAC Interface
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Experience next-generation AI with real-time context engineering
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Network status banner
  const NetworkBanner = () => (
    !isOnline && (
      <div className="fixed top-0 left-0 right-0 z-40 bg-red-600 text-white px-4 py-2 text-center text-sm">
        <div className="flex items-center justify-center gap-2">
          <WifiOff size={16} />
          <span>ORAC Operating in Offline Mode - Real-time streams unavailable</span>
        </div>
      </div>
    )
  );

  // App header with status
  const AppHeader = () => (
    <div className="fixed top-0 left-0 right-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl">⚡</div>
          <div>
            <h1 className="text-lg font-bold">ORAC</h1>
            <p className="text-xs text-gray-400">Operational Reality Architect</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* System Status Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              systemStatus === 'ready' ? 'bg-green-400' : 'bg-yellow-400'
            } animate-pulse`} />
            <span className="text-xs text-gray-400">
              {systemStatus === 'ready' ? 'Online' : 'Initializing'}
            </span>
          </div>
          
          {/* Network Status */}
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi size={16} className="text-green-400" />
            ) : (
              <WifiOff size={16} className="text-red-400" />
            )}
            <span className="text-xs text-gray-400">
              {isOnline ? 'Connected' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App min-h-screen bg-gray-900 text-white">
      {/* Welcome Screen */}
      {showWelcome && <WelcomeScreen />}
      
      {/* Network Status Banner */}
      <NetworkBanner />
      
      {/* Main App */}
      {!showWelcome && (
        <>
          <AppHeader />
          
          {/* Main Content */}
          <div className="pt-20">
            {systemStatus === 'ready' ? (
              <OracPrototype />
            ) : (
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔄</div>
                  <p className="text-gray-400">ORAC Systems Loading...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <footer className="border-t border-gray-800 py-6 mt-8">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-gray-500 text-sm">
                © 2025 Dr. Michael Morales, DIT | ORAC Framework - Next-Generation Context Engineering
              </p>
              <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-600">
                <span>Real-Time AI</span>
                <span>•</span>
                <span>Predictive Modeling</span>
                <span>•</span>
                <span>Context Engineering</span>
              </div>
            </div>
          </footer>
        </>
      )}
      
      {/* Global Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
