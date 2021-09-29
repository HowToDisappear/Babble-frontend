import Cookies from 'js-cookie';
import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import CheckboxSymb from './CheckboxSymb';
import PasswSymb from './PasswSymb';
import { UserContext } from './../../App.js';


function Signin() {
    const [name, setName] = useState("");
    const [passw, setPassw] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [passwShow, setPasswShow] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const [warnMsg, setWarnMsg] = useState(null);

    async function doAuth() {
        if (isSending) {
            return null;
        }
        setIsSending(true);
        doPostReq().then(() => {
            setIsSending(false);
            setWarnMsg(null);
            return (<Redirect to="/" />);
        }).catch(e => {
            setIsSending(false);
            setWarnMsg(e.message);
        });
    }

    async function doPostReq() {
        let authUrl = 'http://' + window.location.host + '/api/accounts/signin';
        let headers = new Headers();
        headers.append('X-CSRFToken', Cookies.get('csrftoken'));

        let authForm = new FormData();
        authForm.set('username', name);
        authForm.set('password', passw);
        authForm.set('keep_signed_in', keepSignedIn);
        
        let resp = await fetch(authUrl, {
            method: 'post',
            headers: headers,
            body: authForm,
            credentials: 'include',
        });
        if (resp.ok) {
            setUser(await resp.json());
        } else {
            throw new Error("Incorrect email address or password or account is inactive");
        }
        return null;
    }

    return (
        <div class="auth">
        <header class="auth__header">
            <div class="auth__header-wrapper">
            <div class="logo"></div>
            <div class="auth__header-link">
                <span>New to Babble?</span>            
                <Link to="/signup">Sign up</Link>
            </div>
            </div>
        </header>
        <div class="auth__content">
            <div class="auth__content-wrapper">
            <div class="auth__content-welcome">Welcome to Babble</div>
            <form class="auth-form">
                <ul>
                <li>
                    <div class="auth-inp-wrapper">
                    <span class="auth-symbol">
                        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3.53807V8.5C0 9.60457 0.895431 10.5 2 10.5H10C11.1046 10.5 12 9.60457 12 8.5V2.5C12 1.39543 11.1046 0.5 10 0.5H2C0.895431 0.5 0 1.39543 0 2.5V3.53807C0 3.53804 0 3.53809 0 3.53807ZM2 1.5H10C10.5523 1.5 11 1.94772 11 2.5V3.23987L6.0001 5.93212L1 3.23976V2.5C1 1.94772 1.44772 1.5 2 1.5ZM1 4.37552L5.76305 6.94024C5.91104 7.01992 6.08916 7.01992 6.23715 6.94024L11 4.37562V8.5C11 9.05229 10.5523 9.5 10 9.5H2C1.44772 9.5 1 9.05228 1 8.5V4.37552Z" fill="#828A8E"/>
                        </svg>
                    </span>
                    <input type="text" value={name} placeholder="Email address" onChange={(evt) => setName(evt.target.value)} />
                    </div>
                </li>
                <li>
                    <div class="auth-inp-wrapper">
                    <span class="auth-symbol">
                        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.83562 0.00531769L5 0C6.32548 0 7.41004 1.03154 7.49468 2.33562L7.5 2.5V3.5H8.5C9.32843 3.5 10 4.17157 10 5V11C10 11.8284 9.32843 12.5 8.5 12.5H1.5C0.671573 12.5 0 11.8284 0 11V5C0 4.17157 0.671573 3.5 1.5 3.5H2.5V2.5C2.5 1.17452 3.53154 0.0899613 4.83562 0.00531769ZM8.5 4.5H1.5C1.22386 4.5 1 4.72386 1 5V11C1 11.2761 1.22386 11.5 1.5 11.5H8.5C8.77614 11.5 9 11.2761 9 11V5C9 4.72386 8.77614 4.5 8.5 4.5ZM5 7C5.55228 7 6 7.44772 6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7ZM5.14446 1.00687L5 1C4.2203 1 3.57955 1.59489 3.50687 2.35554L3.5 2.5V3.5H6.5V2.5C6.5 1.7203 5.90511 1.07955 5.14446 1.00687Z" fill="#828A8E"/>
                        </svg>
                    </span>
                    <input type={passwShow ? "text" : "password"} value={passw} placeholder="Password" onChange={(evt) => setPassw(evt.target.value)} />
                    <div class="passw-symb" onClick={() => setPasswShow(prevState => !prevState)}>
                        <PasswSymb show={passwShow}/>
                    </div>
                    </div>
                </li>
                <li>
                    <div class="auth__signin-extra">
                    <div class="auth__signin-extra-checkbox">
                        <span class="checkbox-symb" onClick={() => setKeepSignedIn(prevState => !prevState)} >
                        <CheckboxSymb checked={keepSignedIn} />
                        </span>
                        <span class="checkbox-symb-label">Keep me signed in</span>
                    </div>
                    <div class="auth__signin-extra-reminder">
                        <a>Forgot your password?</a>
                    </div>
                    </div>
                </li>
                <li>
                    <button class="auth-btn" type="button" disabled={isSending} onClick={() => doAuth()}>Sign in</button>
                </li>
                <li>
                    <div class="auth-warn-wrapper">
                        <div class={`auth-warn${warnMsg ? "" : " display-none"}`}>{warnMsg}</div>
                    </div>
                </li>
                </ul>
            </form>
            </div>
        </div>
        </div>
    );
}


export default Signin;
