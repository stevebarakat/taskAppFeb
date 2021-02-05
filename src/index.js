import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyCkhByKcJraN1PvXbstgqPV6iDPb3pYMv8",
  authDomain: "sb-task-app.firebaseapp.com",
  projectId: "sb-task-app",
  storageBucket: "sb-task-app.appspot.com",
  messagingSenderId: "816127602615",
  appId: "1:816127602615:web:4b859124f20732d32b0232"
};

// const axeConfig = {
//   rules: [
//     {
//       id: "radiogroup",
//       enabled: true
//     }
//   ]
// };

// if (process.env.NODE_ENV !== "production") {
//   var axe = require("react-axe");
//   axe(React, ReactDOM, 1000, axeConfig);
// };

ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <App />
        </FirebaseAppProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);