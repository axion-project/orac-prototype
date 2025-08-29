/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // ORAC Brand Colors
      colors: {
        orac: {
          // Primary blues
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6', // Main ORAC blue
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554'
          },
          // Secondary greens
          secondary: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981', // Main ORAC green
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
            950: '#022c22'
          },
          // Accent amber
          accent: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b', // Main ORAC accent
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
            950: '#451a03'
          },
          // Enhanced grays for better contrast
          gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b', // Main ORAC dark
            850: '#1a2332', // Custom intermediate
            900: '#0f172a', // ORAC darker
            925: '#0c1420', // Custom deeper
            950: '#020617'  // Deepest
          }
        }
      },
      
      // Typography
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          'Monaco',
          '"Cascadia Code"',
          '"Roboto Mono"',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace'
        ]
      },
      
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      
      // Spacing for ORAC components
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem'
      },
      
      // Enhanced shadows for depth
      boxShadow: {
        'orac-sm': '0 1px 2px 0 rgba(59, 130, 246, 0.05)',
        'orac': '0 1px 3px 0 rgba(59, 130, 246, 0.1), 0 1px 2px 0 rgba(59, 130, 246, 0.06)',
        'orac-md': '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
        'orac-lg': '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)',
        'orac-xl': '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)',
        'orac-2xl': '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
        'orac-glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'orac-glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
        'data-stream': '0 0 15px rgba(16, 185, 129, 0.4)',
        'status-online': '0 0 10px rgba(16, 185, 129, 0.6)',
        'status-warning': '0 0 10px rgba(245, 158, 11, 0.6)',
        'status-error': '0 0 10px rgba(239, 68, 68, 0.6)'
      },
      
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      
      // Animation and transitions
      animation: {
        'orac-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orac-bounce': 'bounce 1s infinite',
        'orac-spin': 'spin 1s linear infinite',
        'orac-ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'orac-fade-in': 'fadeIn 0.5s ease-out',
        'orac-slide-up': 'slideUp 0.3s ease-out',
        'orac-slide-down': 'slideDown 0.3s ease-out',
        'orac-slide-left': 'slideLeft 0.3s ease-out',
        'orac-slide-right': 'slideRight 0.3s ease-out',
        'orac-scale-in': 'scaleIn 0.2s ease-out',
        'orac-scale-out': 'scaleOut 0.2s ease-in',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'data-flow': 'dataFlow 2s ease-in-out infinite',
        'status-blink': 'statusBlink 1.5s ease-in-out infinite'
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' }
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        dataFlow: {
          '0%': { transform: 'translateX(-100%) scaleX(0)' },
          '50%': { transform: 'translateX(0%) scaleX(1)' },
          '100%': { transform: 'translateX(100%) scaleX(0)' }
        },
        statusBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0.3' }
        }
      },
      
      // Custom transition timing
      transitionTimingFunction: {
        'orac-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'orac-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'orac-elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      
      // Backdrop blur variations
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px'
      },
      
      // Custom gradients
      backgroundImage: {
        'orac-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'orac-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'data-stream': 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
        'neural-network': 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(59, 130, 246, 0.1) 2px, rgba(59, 130, 246, 0.1) 4px)'
      },
      
      // Custom aspect ratios
      aspectRatio: {
        'golden': '1.618 / 1'
      },
      
      // Screen breakpoints for ORAC
      screens: {
        'xs': '475px',
        '3xl': '1680px',
        '4xl': '2048px'
      }
    }
  },
  plugins: [
    // Custom ORAC utilities
    function({ addUtilities, addComponents, theme }) {
      // Custom utilities
      addUtilities({
        '.orac-glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)'
        },
        '.orac-glass-dark': {
          'background': 'rgba(0, 0, 0, 0.2)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)'
        },
        '.orac-gradient-text': {
          'background': 'linear-gradient(135deg, #3b82f6, #10b981, #f59e0b)',
          'background-size': '300% 300%',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'animation': 'gradientShift 3s ease infinite'
        },
        '.orac-scrollbar': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#4b5563 #1f2937'
        },
        '.orac-scrollbar::-webkit-scrollbar': {
          'width': '8px',
          'height': '8px'
        },
        '.orac-scrollbar::-webkit-scrollbar-track': {
          'background': '#1f2937',
          'border-radius': '4px'
        },
        '.orac-scrollbar::-webkit-scrollbar-thumb': {
          'background': '#4b5563',
          'border-radius': '4px',
          'transition': 'background 0.3s ease'
        },
        '.orac-scrollbar::-webkit-scrollbar-thumb:hover': {
          'background': '#6b7280'
        }
      });
      
      // Custom components
      addComponents({
        '.orac-btn': {
          '@apply px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orac-primary-500 focus:ring-offset-2 focus:ring-offset-orac-gray-900': {}
        },
        '.orac-btn-primary': {
          '@apply orac-btn bg-orac-primary-600 hover:bg-orac-primary-700 text-white': {}
        },
        '.orac-btn-secondary': {
          '@apply orac-btn bg-orac-secondary-600 hover:bg-orac-secondary-700 text-white': {}
        },
        '.orac-btn-ghost': {
          '@apply orac-btn bg-transparent hover:bg-orac-gray-800 text-orac-gray-300 hover:text-white border border-orac-gray-700 hover:border-orac-gray-600': {}
        },
        '.orac-card': {
          '@apply bg-orac-gray-800 rounded-lg p-6 border border-orac-gray-700 transition-all duration-300 hover:border-orac-gray-600 shadow-lg hover:shadow-xl': {}
        },
        '.orac-input': {
          '@apply w-full p-3 bg-orac-gray-700 border border-orac-gray-600 rounded-lg text-white placeholder-orac-gray-400 focus:outline-none focus:border-orac-primary-500 focus:ring-1 focus:ring-orac-primary-500 transition-all duration-200': {}
        },
        '.orac-status-dot': {
          '@apply w-2 h-2 rounded-full': {}
        },
        '.orac-status-online': {
          '@apply orac-status-dot bg-orac-secondary-400 animate-orac-pulse shadow-status-online': {}
        },
        '.orac-status-loading': {
          '@apply orac-status-dot bg-orac-accent-400 animate-status-blink shadow-status-warning': {}
        },
        '.orac-status-offline': {
          '@apply orac-status-dot bg-red-400 shadow-status-error': {}
        }
      });
    }
  ],
  // Safelist important classes that might be generated dynamically
  safelist: [
    'orac-pulse',
    'orac-bounce',
    'animate-orac-fade-in',
    'animate-orac-slide-up',
    'animate-gradient-shift',
    'orac-gradient-text',
    'orac-glass',
    'orac-glow'
  ]
}
