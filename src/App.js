import React, { useState, Suspense } from 'react';
import { useAuth, useFirestore, useUser } from 'reactfire';
import './styles/reset.css';
import './styles/global.css';
import Spinner from './components/Spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as serviceWorker from './serviceWorker';
import initialTasks from './initialTasks';
import firebase from 'firebase/app';
import 'firebase/auth';
const provider = new firebase.auth.GoogleAuthProvider();
const AuthApp = React.lazy(() => import('./AuthApp'));
const Login = React.lazy(() => import('./auth/Login'));

export default function App() {
  const auth = useAuth();
  const FBUser = useUser();
  const db = useFirestore();
  const [errMsg, setErrMsg] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState(null);

  const handleSetIsNewUser = (value) => {
    setIsNewUser(value);
  };

  const logOutUser = () => {
    auth.signOut();
  };

  const handleLogin = async (user) => {
    if (isNewUser) {
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          registerUser(user.displayName);
        })
        .catch(function (error) {
          setErrMsg(error.message);
        });
    } else {
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .catch((error) => {
          setErrMsg(error.message);
        });
    }
    setErrMsg(null);
  };

  const googleSignIn = async () => {
    await auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        /** @type {firebase.auth.OAuthCredential} */
        // const credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = credential.accessToken;

        const collection = db.collection('tasklist').doc(user.uid);
        if (!collection.exists) {
          db.collection('tasklist').doc(user.uid).set({
            tasks: initialTasks,
          });
        }
      }).catch((error) => {
        const errorMessage = `${error.code}: ${error.message}`;
        setErrMsg(errorMessage);
      });
  };
  
  function registerUser(userName) {
    const newUser = auth.currentUser;
    const docRef = db.collection('tasklist').doc(newUser.uid);
    if (newUser === null) return;
    docRef.set({
      tasks: initialTasks,
    })
      .then(() => {
        newUser.updateProfile({
          displayName: userName,
        })
      })
      .then(() => {
        setUser(newUser);
      });
  };

  return FBUser ? (
    <Suspense
      fallback={
        <span>
          <Spinner />
        </span>
      }
    >
      <AuthApp user={user} logOutUser={logOutUser} />
    </Suspense>
  ) : (
      <Suspense fallback={<Spinner />}>
        <Login
          isNewUser={isNewUser}
          handleLogin={handleLogin}
          handleSetIsNewUser={handleSetIsNewUser}
          googleSignIn={googleSignIn}
          errMsg={errMsg}
        />
      </Suspense>
    );
}

serviceWorker.unregister();
