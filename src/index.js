import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyByWxRTrpv7MFrZ0KHVfkHDu3z2S3Cg3Mc",
  authDomain: "steve-task-app.firebaseapp.com",
  projectId: "steve-task-app",
  storageBucket: "steve-task-app.appspot.com",
  messagingSenderId: "878171741361",
  appId: "1:878171741361:web:4b7d14284b28cd9bcf9690"
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