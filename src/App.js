import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import SocialLogin from './components/SocialLogin';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import axios from 'axios';
import Website from './website/Website'
import WebsiteCreate from './website/WebsiteCreate';
import WebsiteCreateB from './buildWebsite/WebsiteCreate';
import UserList from './admin/UserList';
import Nav from './components/Nav';

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  



  useEffect(() => {
    auth.onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          const data = {
            idToken,
          };
          setTimeout(() => {
            axios.post('/auth/user', data).then((response) => {
              const updatedUser = response.data.user;
              setCurrentUser(updatedUser);
              if(updatedUser.type === 'admin'){
                setIsAdmin(true)
              }
            })
              .catch((error) => {
                console.log(error);
              });
          })
        })
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      console.log('token status changed, user =>', user);
    })
  }, []);

  const signOut = () => {
    auth.signOut()
      .then((response) => {
        axios.get('/auth/signout').then((response) => {
          console.log(response);
          setCurrentUser(null);
        })
          .catch((error) => {
            console.log(error);
          });
      });
  };



  return (
    <Router>
      <Nav currentUser={currentUser} signOut={signOut} />
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            CMS App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle d-flex align-items-center" href="/#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      <img referrerPolicy='no-referrer' src={currentUser.avatarURL || "/guest.jpeg"} alt="Profile" className="rounded-circle me-2" style={{ width: 24, height: 24, objectFit: 'cover' }} />
                      {currentUser.firstName}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="userDropdown">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={signOut}>
                          Sign Out
                        </button>
                      </li>

                    </ul>
                  </li>
                 { isAdmin? ( 
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle d-flex align-items-center" href="/#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        Admin Portal
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="userDropdown">
                          <li>
                            <Link className="dropdown-item" to="/users">
                              Manage Users
                            </Link>
                          </li>
                        </ul>
                    </li>
                  ): null}
                  <li className="nav-item">
                    <Link className="nav-link" to="/website/WebDevGuru/">
                      Website WebDevGuru
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Create">
                      Create website
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Createb">
                      Create websiteB
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Log In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid" style={{ paddingTop: "50px" }}>
        <div className="container py-4">
          <Routes>
            <Route exact path="/" element={<h1>Welcome to our website!</h1>} />
            <Route path="/login" element={<SocialLogin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} />} />
            <Route path="/website/:websiteDomain/:path" element={<Website />} />
            <Route path="/website/:websiteDomain/*" element={<Website />} />
            <Route path="/create" element={<WebsiteCreate currentUser={currentUser} />} />
            <Route path="/createb" element={<WebsiteCreateB currentUser={currentUser} />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </div>
      </div>

    </Router>
  );
}

export default App;