import React, { useState, useEffect, useCallback } from 'react';
import { Brain, Activity, Database, Zap, Globe, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const OracPrototype = () => {
  const [activeMode, setActiveMode] = useState('assistant');
  const [memory, setMemory] = useState([]);
  const [realTimeData, setRealTimeData] = useState({
    market: { status: 'Loading...', timestamp: null },
    weather: { status: 'Loading...', timestamp: null },
    news: { status: 'Loading...', timestamp: null }
  });
  const [context, setContext] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated real-time data sources
  const fetchMarketData = useCallback(async () => {
    try {
      // Simulate specific stock data
      const stocks = {
        AAPL: { price: 185 + Math.random() * 20 - 10, change: (Math.random() - 0.5) * 10 },
        TSLA: { price: 240 + Math.random() * 30 - 15, change: (Math.random() - 0.5) * 15 },
        MSFT: { price: 420 + Math.random() * 25 - 12, change: (Math.random() - 0.5) * 8 },
        GOOGL: { price: 140 + Math.random() * 15 - 7, change: (Math.random() - 0.5) * 6 },
        NVDA: { price: 880 + Math.random() * 50 - 25, change: (Math.random() - 0.5) * 20 }
      };

      const sp500 = 4200 + Math.random() * 100 - 50;
      const trend = Math.random() > 0.5 ? 'up' : 'down';
      const volatility = Math.random() * 2 + 1;
      
      setRealTimeData(prev => ({
        ...prev,
        market: {
          status: `S&P 500: ${sp500.toFixed(2)} (${trend})`,
          timestamp: new Date(),
          data: { sp500, trend, volatility, stocks }
        }
      }));
    } catch (error) {
      console.error('Market data fetch failed:', error);
    }
  }, []);

  const fetchWeatherData = useCallback(async () => {
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Clear'];
    const temp = Math.floor(Math.random() * 30 + 50);
    
    setRealTimeData(prev => ({
      ...prev,
      weather: {
        status: `${temp}°F, ${conditions[Math.floor(Math.random() * conditions.length)]}`,
        timestamp: new Date()
      }
    }));
  }, []);

  const fetchNewsData = useCallback(async () => {
    const headlines = [
      'Tech stocks surge on AI breakthrough',
      'Global markets react to Fed announcement',
      'Climate summit reaches key agreement',
      'Crypto regulation updates pending'
    ];
    
    setRealTimeData(prev => ({
      ...prev,
      news: {
        status: headlines[Math.floor(Math.random() * headlines.length)],
        timestamp: new Date()
      }
    }));
  }, []);

  // Real-time data polling
  useEffect(() => {
    // Initial fetch
    fetchMarketData();
    fetchWeatherData();
    fetchNewsData();

    const interval = setInterval(() => {
      fetchMarketData();
      fetchWeatherData();
      fetchNewsData();
    }, 8000); // Update every 8 seconds to be less aggressive

    return () => clearInterval(interval);
  }, [fetchMarketData, fetchWeatherData, fetchNewsData]);

  // Extract stock symbols from query
  const extractStockSymbols = useCallback((query) => {
    const stockMentions = {
      'apple': 'AAPL',
      'aapl': 'AAPL',
      'tesla': 'TSLA', 
      'tsla': 'TSLA',
      'microsoft': 'MSFT',
      'msft': 'MSFT',
      'google': 'GOOGL',
      'googl': 'GOOGL',
      'alphabet': 'GOOGL',
      'nvidia': 'NVDA',
      'nvda': 'NVDA'
    };

    const words = query.toLowerCase().split(/\s+/);
    const symbols = [];
    
    words.forEach(word => {
      if (stockMentions[word]) {
        symbols.push(stockMentions[word]);
      }
    });

    return [...new Set(symbols)]; // Remove duplicates
  }, []);
  const assembleContext = useCallback((query) => {
    const relevantMemory = memory.filter(item => 
      item.content.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(tag => query.toLowerCase().includes(tag))
    );

    const contextItems = [
      { type: 'realtime', source: 'market', data: realTimeData.market },
      { type: 'realtime', source: 'weather', data: realTimeData.weather },
      { type: 'realtime', source: 'news', data: realTimeData.news },
      ...relevantMemory.map(item => ({ type: 'memory', data: item }))
    ];

    return contextItems;
  }, [memory, realTimeData]);

  // Predictive logic simulation with mode awareness
  const generatePrediction = useCallback((query, contextData, mode) => {
    const marketData = contextData.find(c => c.source === 'market')?.data;
    const weatherData = contextData.find(c => c.source === 'weather')?.data;
    const newsData = contextData.find(c => c.source === 'news')?.data;
    
    // Extract specific stocks mentioned
    const stockSymbols = extractStockSymbols(query);
    const hasSpecificStocks = stockSymbols.length > 0;

    // Mode-specific responses
    if (mode === 'strategist') {
      if (hasSpecificStocks) {
        const stockData = stockSymbols.map(symbol => ({
          symbol,
          ...marketData?.data?.stocks[symbol]
        })).filter(stock => stock.price);

        if (stockData.length > 0) {
          const stockInfo = stockData.map(stock => 
            `${stock.symbol}: $${stock.price.toFixed(2)} (${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)})`
          ).join(', ');

          return {
            scenario: `Strategic Analysis: ${stockSymbols.join(', ')}`,
            confidence: Math.floor(Math.random() * 25 + 75),
            prediction: `Current positions - ${stockInfo}. Strategic outlook: ${stockData[0].change >= 0 ? 'Positive momentum suggests accumulation strategy' : 'Pullback presents strategic entry opportunity'}. Consider ${stockData.length > 1 ? 'diversification across' : 'position sizing for'} ${stockSymbols.join(' and ')} based on ${marketData?.data?.volatility > 1.5 ? 'high volatility environment' : 'stable market conditions'}.`,
            reasoning: `Strategic analysis of ${stockSymbols.join(', ')} with real-time pricing and market context`
          };
        }
      }

      if (query.toLowerCase().includes('invest') || query.toLowerCase().includes('stock') || query.toLowerCase().includes('market')) {
        return {
          scenario: 'Strategic Investment Analysis',
          confidence: Math.floor(Math.random() * 25 + 75),
          prediction: `Strategic recommendation: ${marketData?.data?.trend === 'up' ? 'Capitalize on momentum with 60% allocation' : 'Defensive positioning with value plays'}. Market volatility at ${marketData?.data?.volatility?.toFixed(1)}x suggests ${marketData?.data?.volatility > 1.5 ? 'high-risk, high-reward' : 'stable growth'} environment.`,
          reasoning: `Strategic analysis considering market trend (${marketData?.data?.trend}), volatility patterns, and news sentiment`
        };
      }
    }

    if (mode === 'analyst') {
      if (hasSpecificStocks) {
        const stockData = stockSymbols.map(symbol => ({
          symbol,
          ...marketData?.data?.stocks[symbol]
        })).filter(stock => stock.price);

        if (stockData.length > 0) {
          const analysis = stockData.map(stock => {
            const momentum = stock.change >= 0 ? 'BULLISH' : 'BEARISH';
            const volatility = Math.abs(stock.change) > 5 ? 'HIGH' : 'NORMAL';
            return `${stock.symbol}: $${stock.price.toFixed(2)} | Change: ${stock.change.toFixed(2)} | Momentum: ${momentum} | Volatility: ${volatility}`;
          }).join(' || ');

          return {
            scenario: `Technical Analysis: ${stockSymbols.join(', ')}`,
            confidence: Math.floor(Math.random() * 20 + 80),
            prediction: `Real-time analysis: ${analysis}. Market correlation factor: ${marketData?.data?.volatility?.toFixed(2)}. Risk assessment: ${marketData?.data?.volatility > 1.5 ? 'HIGH RISK' : 'MODERATE RISK'} environment.`,
            reasoning: `Quantitative analysis of ${stockSymbols.join(', ')} with technical indicators and market correlation`
          };
        }
      }

      if (query.toLowerCase().includes('invest') || query.toLowerCase().includes('stock') || query.toLowerCase().includes('market')) {
        return {
          scenario: 'Technical Market Analysis',
          confidence: Math.floor(Math.random() * 20 + 80),
          prediction: `Analysis indicates: S&P at ${marketData?.data?.sp500?.toFixed(2)} with ${marketData?.data?.trend} momentum. Volatility index: ${marketData?.data?.volatility?.toFixed(2)}. Risk assessment: ${marketData?.data?.volatility > 1.5 ? 'HIGH' : 'MODERATE'}.`,
          reasoning: `Quantitative analysis of real-time market data, technical indicators, and risk metrics`
        };
      }
    }

    // Default assistant mode
    if (hasSpecificStocks) {
      const stockData = stockSymbols.map(symbol => ({
        symbol,
        ...marketData?.data?.stocks[symbol]
      })).filter(stock => stock.price);

      if (stockData.length > 0) {
        const stockSummary = stockData.map(stock => 
          `${stock.symbol} is currently at $${stock.price.toFixed(2)} (${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} change)`
        ).join(', ');

        return {
          scenario: `Stock Analysis: ${stockSymbols.join(', ')}`,
          confidence: Math.floor(Math.random() * 30 + 70),
          prediction: `Here's the latest on ${stockSymbols.join(' and ')}: ${stockSummary}. Given current market volatility of ${marketData?.data?.volatility?.toFixed(1)}x, I recommend ${marketData?.data?.volatility > 1.5 ? 'cautious position sizing' : 'standard allocation'} for these positions.`,
          reasoning: `Real-time stock price analysis with market context for ${stockSymbols.join(', ')}`
        };
      }
    }

    if (query.toLowerCase().includes('invest') || query.toLowerCase().includes('stock')) {
      return {
        scenario: 'Investment Guidance',
        confidence: Math.floor(Math.random() * 30 + 70),
        prediction: `Based on current market conditions (${marketData?.data?.trend} trend, ${marketData?.data?.volatility?.toFixed(1)}x volatility), I recommend ${marketData?.data?.volatility > 1.5 ? 'cautious' : 'moderate'} positioning.`,
        reasoning: 'Real-time market data analysis with risk consideration'
      };
    }

    if (query.toLowerCase().includes('travel') || query.toLowerCase().includes('trip')) {
      return {
        scenario: 'Travel Planning',
        confidence: 85,
        prediction: `Weather shows: ${weatherData?.status}. Good conditions for travel planning. Consider flexible arrangements.`,
        reasoning: 'Weather data integration for optimal travel timing'
      };
    }

    if (query.toLowerCase().includes('weather') || query.toLowerCase().includes('conditions')) {
      return {
        scenario: 'Weather Analysis',
        confidence: 90,
        prediction: `Current conditions: ${weatherData?.status}. Plan accordingly for outdoor activities.`,
        reasoning: 'Real-time weather data analysis'
      };
    }

    return {
      scenario: 'General Analysis',
      confidence: 75,
      prediction: `Based on current real-time data streams and context analysis, I've processed your query using ${contextData.length} data sources.`,
      reasoning: `Multi-source analysis in ${mode} mode`
    };
  }, [extractStockSymbols]);

  // Main processing function
  const processQuery = async () => {
    if (!userQuery.trim()) return;

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const assembledContext = assembleContext(userQuery);
    setContext(assembledContext);

    const prediction = generatePrediction(userQuery, assembledContext, activeMode);
    setPrediction(prediction);

    // Add to memory
    const newMemoryItem = {
      id: Date.now(),
      content: userQuery,
      timestamp: new Date(),
      context: assembledContext.length,
      mode: activeMode,
      tags: userQuery.toLowerCase().split(' ').filter(word => word.length > 3)
    };
    setMemory(prev => [...prev, newMemoryItem].slice(-50)); // Keep last 50 items

    // Generate mode-specific response
    let response;
    if (prediction) {
      switch(activeMode) {
        case 'strategist':
          response = `🎯 Strategic Analysis: ${prediction.prediction}`;
          break;
        case 'analyst':
          response = `📊 Data Analysis: ${prediction.prediction}`;
          break;
        default:
          response = `🤖 ORAC Analysis: ${prediction.prediction}`;
      }
    } else {
      response = `I've analyzed your query using ${assembledContext.length} real-time context sources in ${activeMode} mode.`;
    }

    // Add to conversation
    setConversation(prev => [
      ...prev,
      { type: 'user', content: userQuery, timestamp: new Date(), mode: activeMode },
      { type: 'orac', content: response, timestamp: new Date(), mode: activeMode }
    ].slice(-20)); // Keep last 20 messages

    setUserQuery('');
    setIsProcessing(false);
  };

  const modeConfigs = {
    assistant: { icon: Brain, color: 'blue', name: 'Assistant' },
    strategist: { icon: TrendingUp, color: 'green', name: 'Strategist' },
    analyst: { icon: Activity, color: 'purple', name: 'Analyst' }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Zap className="text-yellow-400" />
          ORAC Prototype
        </h1>
        <p className="text-gray-300">Operational Reality Architect & Command - Real-Time Intelligence</p>
      </div>

      {/* Mode Selector */}
      <div className="mb-6 flex gap-4">
        {Object.entries(modeConfigs).map(([mode, config]) => {
          const Icon = config.icon;
          return (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                activeMode === mode && config.color === 'blue'
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : activeMode === mode && config.color === 'green'
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : activeMode === mode && config.color === 'purple'
                  ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <Icon size={18} />
              {config.name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real-Time Data Panel */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="text-green-400" />
            Real-Time Streams
          </h2>
          <div className="space-y-4">
            {Object.entries(realTimeData).map(([source, data]) => (
              <div key={source} className="border border-gray-700 rounded-lg p-3 hover:border-gray-600 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="capitalize font-medium text-gray-300 flex items-center gap-2">
                    {source === 'market' && '📈'}
                    {source === 'weather' && '🌤️'}
                    {source === 'news' && '📰'}
                    {source}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {data.timestamp ? data.timestamp.toLocaleTimeString() : 'Loading...'}
                  </span>
                </div>
                <div className="text-sm text-white font-mono bg-gray-900/50 p-2 rounded">{data.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Interface */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="text-blue-400" />
            Query Interface
          </h2>
          
          <div className="mb-4">
            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  processQuery();
                }
              }}
              placeholder="Ask about investments, travel, decisions... (Press Enter to send)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
              rows="3"
            />
            <button
              onClick={processQuery}
              disabled={isProcessing || !userQuery.trim()}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors font-medium"
            >
              {isProcessing ? 'Processing Context & Real-Time Data...' : 'Process Query'}
            </button>
          </div>

          {/* Conversation */}
          <div className="space-y-3 max-h-80 overflow-y-auto border border-gray-700 rounded-lg p-3">
            {conversation.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                Start a conversation to see ORAC's real-time analysis...
              </div>
            ) : (
              conversation.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${
                  msg.type === 'user' ? 'bg-blue-900/30 border-l-2 border-blue-500' : 'bg-green-900/30 border-l-2 border-green-500'
                }`}>
                  <div className="text-xs text-gray-300 mb-2 flex items-center justify-between">
                    <span className="font-medium flex items-center gap-1">
                      {msg.type === 'user' ? '👤 You' : '🧠 ORAC'}
                      {msg.mode && (
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                          {msg.mode}
                        </span>
                      )}
                    </span>
                    <span>{msg.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="text-sm">{msg.content}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Context & Memory Panel */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Database className="text-purple-400" />
            Context & Memory
          </h2>
          
          {prediction && (
            <div className="mb-4 p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={18} className="text-yellow-400" />
                <span className="font-medium">Prediction</span>
              </div>
              <div className="text-sm space-y-1">
                <div><strong>Scenario:</strong> {prediction.scenario}</div>
                <div><strong>Confidence:</strong> {prediction.confidence}%</div>
                <div><strong>Prediction:</strong> {prediction.prediction}</div>
                <div className="text-gray-400"><strong>Reasoning:</strong> {prediction.reasoning}</div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-300 mb-2">Active Context ({context.length})</h3>
              <div className="text-sm space-y-1">
                {context.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="text-gray-400">
                    {item.type === 'realtime' ? `📡 ${item.source}` : `💾 ${item.data.content?.substring(0, 30)}...`}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-300 mb-2">Memory ({memory.length})</h3>
              <div className="text-sm space-y-1 max-h-32 overflow-y-auto">
                {memory.slice(-5).map((item) => (
                  <div key={item.id} className="text-gray-400">
                    <Clock size={12} className="inline mr-1" />
                    {item.content.substring(0, 40)}...
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Try these specific queries (results change based on active mode):</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "What's Apple stock doing today?",
              "Should I buy Tesla stock?",
              "How is Microsoft performing?",
              "Give me analysis on Google and Apple",
              "What's the NVDA outlook?",
              "Plan a weekend trip based on weather",
              "What's the current market outlook?"
            ].map((query) => (
              <button
                key={query}
                onClick={() => setUserQuery(query)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors border border-gray-600 hover:border-gray-500"
              >
                {query}
              </button>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-400">
            💡 Try asking about: Apple, Tesla, Microsoft, Google, Nvidia, or use stock symbols like AAPL, TSLA, MSFT, GOOGL, NVDA
          </div>
        </div>
    </div>
  );
};

export default OracPrototype;
