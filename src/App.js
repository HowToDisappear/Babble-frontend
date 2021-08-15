import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams
} from "react-router-dom";
import './App.css';
import Cookies from 'js-cookie';


function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}


function Main() {
  const [signedIn, setSignedIn] = useState(false);

  if (!signedIn) {
    fetch("http://127.0.0.1:8000/api/accounts/signed_in").then((resp) => {
      console.log('auth req sent and received');
      if (resp.ok) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  }

  return (
    <React.Fragment>
      <Header signedIn={signedIn} />
      <main class="main">
        <Switch>
          <Route path="/contacts">
            <Contacts />
          </Route>
          <Route path="/chats">
            <Chats />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/signin">
            <Auth setSignedIn={setSignedIn} signedIn={signedIn} />
          </Route>
          <Route path="/register">
            <Auth />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
}



function Welcome() {
  return (
    <div>
      <h4>Welcome</h4>
    </div>
  );
}


function Header(props) {
  return (
    <header class="header">
      <div class="nav-wrapper">
        <Nav signedIn={props.signedIn} />
      </div>
    </header>
  );
}


function Nav(props) {
  // need to refactor for nicer look
  if (props.signedIn) {
    return (
      <nav class="nav">
        <div class="logo">Babble</div>
        <div class="auth-links">
          <Link to="/contacts">Enter Babble</Link>
        </div>
      </nav>
    );
  }
  return (
    <nav class="nav">
      <div class="logo">Babble</div>
      <div class="auth-links">
        <Link to="/signin">Signin</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}




function Contacts() {
  return (
    <div>
      <h2>Contacts</h2>
    </div>
  );
}


function Chats() {
  return (
    <div>
      <h4>Chats</h4>
    </div>
  );
}


function Settings() {
  return (
    <div>
      <h4>Settings</h4>
    </div>
  );
}


function Auth(props) {
  if (props.signedIn) {
    return (<Redirect to="/contacts" />);
  }
  return (
    <div class="auth-wrapper">
      <Signin setSignedIn={props.setSignedIn} />
    </div>
  );
}


function Signin(props) {
  const [name, setName] = useState("");
  const [passw, setPassw] = useState("");
  const [passwShow, setPasswShow] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function doAuth() {
    if (isSending) {
      return null;
    }
    setIsSending(true);
    doPostReq().then(() => {
      props.setSignedIn(true);
      setIsSending(false);
    }).catch(e => {
      console.log('Got error during fetch: ' + e.message);
      // add a message to frontend about failure to find account or other
    });
  }

  async function doPostReq() {
    let authUrl = "http://127.0.0.1:8000/api/accounts/signin";
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));

    let authForm = new FormData();
    authForm.set('username', name);
    authForm.set('password', passw);
    
    let resp = await fetch(authUrl, {
      method: 'post',
      headers: headers,
      body: authForm,
      credentials: 'include',
    });
    if (!resp.ok) {
      throw new Error(`HTTP resp with status ${resp.status}`);
    }
    return resp.json();
  }

  return (
    <React.Fragment>
      <h3>Signin</h3>
      <form class="auth-form">
        <ul>
          <li>
            <label>Username:</label>
            <div class="auth-inp-wrapper">
              <input type="text" value={name} onChange={(evt) => setName(evt.target.value)} />
            </div>
          </li>
          <li>
            <label>Password:</label>
            <div class="auth-inp-wrapper">
              <input type={passwShow ? "text" : "password"} value={passw} onChange={(evt) => setPassw(evt.target.value)} />
              <div class="show-passw" onClick={() => setPasswShow(!passwShow)}>
                <ShowPassw show={passwShow}/>
              </div>
            </div>
          </li>
          <li>
            <button class="auth-btn" type="button" disabled={isSending} onClick={() => doAuth()}>Sign in</button>
          </li>
        </ul>
      </form>
    </React.Fragment>
  );
}


function ShowPassw(props) {
  return (
    <React.Fragment>
      {props.show ? (
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.70711 0.292893C2.31658 -0.0976311 1.68342 -0.0976311 1.29289 0.292893C0.902369 0.683417 0.902369 1.31658 1.29289 1.70711L3.71706 4.13127C2.28639 5.20737 1.03925 6.68543 0.105573 8.55279C-0.0351909 8.83432 -0.0351909 9.16569 0.105573 9.44722C2.26379 13.7637 6.09687 16 10 16C11.5552 16 13.0992 15.645 14.5306 14.9448L17.2929 17.7071C17.6834 18.0976 18.3166 18.0976 18.7071 17.7071C19.0976 17.3166 19.0976 16.6834 18.7071 16.2929L2.70711 0.292893ZM13.0138 13.428C12.0343 13.8112 11.0134 14 10 14C7.03121 14 3.99806 12.3792 2.12966 9C2.94721 7.52136 3.98778 6.3794 5.14838 5.56259L7.29237 7.70659C7.10495 8.09822 7 8.53686 7 9.00001C7 10.6569 8.34315 12 10 12C10.4631 12 10.9018 11.8951 11.2934 11.7076L13.0138 13.428Z" fill="#0D0D0D"/>
          <path d="M16.5523 10.8955C17.0353 10.3402 17.4784 9.70876 17.8703 9C16.0019 5.62078 12.9687 4 9.99996 4C9.88796 4 9.77586 4.00231 9.66374 4.00693L7.87939 2.22258C8.57741 2.07451 9.28752 2 9.99996 2C13.9031 2 17.7362 4.23635 19.8944 8.55279C20.0352 8.83431 20.0352 9.16569 19.8944 9.44721C19.3504 10.5352 18.7 11.491 17.9689 12.3121L16.5523 10.8955Z" fill="#0D0D0D"/>
        </svg>
      ) : (
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 7C13 8.65685 11.6569 10 10 10C8.34315 10 7 8.65685 7 7C7 5.34315 8.34315 4 10 4C11.6569 4 13 5.34315 13 7Z" fill="#0D0D0D"/>
          <path d="M19.8944 6.55279C17.7362 2.23635 13.9031 0 10 0C6.09687 0 2.26379 2.23635 0.105573 6.55279C-0.0351909 6.83431 -0.0351909 7.16569 0.105573 7.44721C2.26379 11.7637 6.09687 14 10 14C13.9031 14 17.7362 11.7637 19.8944 7.44721C20.0352 7.16569 20.0352 6.83431 19.8944 6.55279ZM10 12C7.03121 12 3.99806 10.3792 2.12966 7C3.99806 3.62078 7.03121 2 10 2C12.9688 2 16.0019 3.62078 17.8703 7C16.0019 10.3792 12.9688 12 10 12Z" fill="#0D0D0D"/>
        </svg>
      )}
    </React.Fragment>
  );
}


export default App;
