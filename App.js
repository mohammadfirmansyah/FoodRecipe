/**
 * APP.JS - Main Entry Point
 * This is the root component where our entire application starts.
 * Think of it as the foundation of a house - everything builds on top of this.
 */

// Import our navigation system that handles screen transitions
import AppNavigation from "./src/navigation";

// Redux Provider allows all components to access global state
import { Provider } from 'react-redux';

// Import our configured Redux store for state management
import store from "./src/redux/store";

/**
 * App Component - Root of our application
 * Wraps the entire app with Redux Provider to enable state management everywhere
 */
export default function App() {
  return (
    // Provider makes Redux store available to all child components
    <Provider store={store}>
      {/* AppNavigation handles all screen routing and navigation */}
      <AppNavigation />
    </Provider>
  );
}
