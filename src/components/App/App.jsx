import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

import "./App.css";
import AdminPage from "../AdminPage/AdminPage";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* ABOUT  */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* PROTECTED ROUTE */}
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* USER PAGE */}
          <ProtectedRoute
            // logged in shows User Page, else shows Login Page
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          {/* ADMIN PAGE */}
          <ProtectedRoute
            // logged in shows Admin Page
            exact
            path="/admin"
          >
            {user.access_level >= 10 ? (
               // If user is logged in and have access level of 10 or higher, 
               // show Admin Page
              <AdminPage />
            ) : (
              // Otherwise, redirect to User Page
              <Redirect to="/user" />
            )}
          </ProtectedRoute>

          {/* LOGIN PAGE */}
          <ProtectedRoute
            // logged in shows Info Page, else shows Login Page
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          {/* LOGGED IN -> USER PAGE */}
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Login page
              <LoginPage />
            )}
          </Route>

          {/* SIGNUP PAGE */}
          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>
          {/* LOGGED IN -> USER PAGE */}
          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
