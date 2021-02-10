import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyBXljgY1TGj_gf5mCKbXZ61X6piXWWk9u4",
  authDomain: "stevebarakat-task-app.firebaseapp.com",
  projectId: "stevebarakat-task-app",
  storageBucket: "stevebarakat-task-app.appspot.com",
  messagingSenderId: "981670402042",
  appId: "1:981670402042:web:84457d30f3264b35be7643"
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