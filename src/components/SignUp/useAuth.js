import React, { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase-config";
import "firebase/analytics";
import "firebase/auth";
import { Route, Redirect } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//***************** Redirect review item to signIn ************************
export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signup",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const AdminRoute = ({ children, ...rest }) => {
  const user = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.user && user.user.uid === process.env.REACT_APP_BASE_URL ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signup",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const getUser = (user) => {
  const { email, displayName, photoURL } = user;
  return { email, name: displayName, photo: photoURL };
};

const Auth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const currentUser = user;
        setUser(currentUser);
      }
    });
  }, []);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const signedInUser = getUser(result.user);
        setUser(signedInUser);
        window.history.back();
        return result.user;
      })
      .catch((error) => {
        setUser(null);
        return error.message;
      });
  };

  const signIn = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setUser(result.user);
        window.history.back();
      })
      .catch((error) => {
        setUser(null);
        return error.message;
      });
  };

  const signUp = (email, password, name) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            setUser(result.user);
            window.history.back();
          });
      })
      .catch((error) => {
        setUser(null);
        return error.message;
      });
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then((result) => {
        setUser(null);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return error.message;
      });
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
};

export default Auth;
