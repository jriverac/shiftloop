import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import '../src/components/Graph.css';
import '../src/components/Tracker.css';
import '../src/components/ControlsPanel.css';
import '../src/components/TeamMemberInput.css';
import '../src/components/TeamMembersTable.css';
import '../src/components/StatCard.css';

// Disable React Fast Refresh globally and provide mocks
if (typeof window !== 'undefined') {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {};
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.isDisabled = true;
  
  // Provide no-op mocks for React Fast Refresh functions
  window.$RefreshSig$ = function() {
    return function(type) {
      return type;
    };
  };
  
  window.$RefreshReg$ = function() {
    // No-op function
  };
  
  // Also set them globally
  if (typeof global !== 'undefined') {
    global.$RefreshSig$ = window.$RefreshSig$;
    global.$RefreshReg$ = window.$RefreshReg$;
  }
}

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f8f9fa',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
  },
};

export default preview;
