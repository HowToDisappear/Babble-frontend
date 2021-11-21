import Cookies from 'js-cookie';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../../../App.js';

import Avatar from './Avatar.js';


function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.username);
  const [about, setAbout] = useState(user.about);
  const [isSending, setIsSending] = useState(false);
  const fileInp = useRef(null);
  const [userFile, setUserFile] = useState(null);

  async function updateAccount() {
    let url = 'http://' + window.location.host + '/api/accounts/account';
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));

    let profileForm = new FormData();
    profileForm.set('username', name);
    profileForm.set('about', about);
    
    setIsSending(true);
    let resp = await fetch(url, {
        method: 'put',
        headers: headers,
        body: profileForm,
        credentials: 'include',
    });
    setIsSending(false);
    if (resp.ok) {
        setUser(await resp.json());
    } else {
        console.log("couldn't update user");
    }
    return null;
  }

  async function updateAavatar(val) {
    let url = 'http://' + window.location.host + '/api/accounts/account';
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));

    let profileForm = new FormData();
    val ? profileForm.set('avatar', val) : profileForm.set('avatar', '');

    let resp = await fetch(url, {
      method: 'put',
      headers: headers,
      body: profileForm,
      credentials: 'include'
    });
    if (resp.ok) {
        setUser(await resp.json());
    } else {
        console.log("couldn't update user");
    }
  }

  return (
    <div class="profile">
        <div class="profile-title">Profile</div>
        <div class="profile-subtitle">Manage your Babble profile</div>
        <div class="separator"></div>
        <div class="profile-avatar-wrapper">
            <div class="profile-avatar-title">Avatar</div>
            <div class="profile-avatar-pic-wrapper">
                {user.image
                ? <img class="profile-avatar-pic" src={user.image} />
                : <div class="profile-avatar-letter">{user.username[0]}</div>}
            </div>
            <div class="profile-avatar-buttons">
                <button class="profile-btn-delete" type="button" onClick={() => updateAavatar(null)} >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2H11C11.2761 2 11.5 2.22386 11.5 2.5C11.5 2.77614 11.2761 3 11 3H10.4475L9.69462 9.77608C9.55394 11.0422 8.48378 12 7.20991 12H4.79008C3.51621 12 2.44605 11.0422 2.30537 9.77608L1.55247 3H1C0.723858 3 0.5 2.77614 0.5 2.5C0.5 2.22386 0.723858 2 1 2H4C4 0.89543 4.89543 0 6 0C7.10457 0 8 0.895431 8 2ZM6 1C5.44772 1 5 1.44772 5 2H7C7 1.44772 6.55229 1 6 1ZM4.5 5L4.5 9C4.5 9.27614 4.72386 9.5 5 9.5C5.27614 9.5 5.5 9.27614 5.5 9L5.5 5C5.5 4.72386 5.27614 4.5 5 4.5C4.72386 4.5 4.5 4.72386 4.5 5ZM7 4.5C6.72386 4.5 6.5 4.72386 6.5 5V9C6.5 9.27614 6.72386 9.5 7 9.5C7.27614 9.5 7.5 9.27614 7.5 9V5C7.5 4.72386 7.27614 4.5 7 4.5Z" fill="#333738"/>
                    </svg>
                </button>
                <button class="profile-btn-upload" type="button" onClick={() => fileInp.current.click()}>
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 0C0.335786 0 0 0.335786 0 0.75C0 1.16421 0.335786 1.5 0.75 1.5H9.25C9.66421 1.5 10 1.16421 10 0.75C10 0.335786 9.66421 0 9.25 0H0.75ZM5.53033 2.71967C5.23744 2.42678 4.76256 2.42678 4.46967 2.71967L1.21967 5.96967C0.926777 6.26256 0.926777 6.73744 1.21967 7.03033C1.51256 7.32322 1.98744 7.32322 2.28033 7.03033L4.25 5.06066V11.25C4.25 11.6642 4.58579 12 5 12C5.41421 12 5.75 11.6642 5.75 11.25V5.06066L7.71967 7.03033C8.01256 7.32322 8.48744 7.32322 8.78033 7.03033C9.07322 6.73744 9.07322 6.26256 8.78033 5.96967L5.53033 2.71967Z" fill="#333738"/>
                    </svg>
                </button>
                <input
                hidden
                type="file"
                accept="image/*"
                name="avatar"
                ref={fileInp}
                onChange={() => setUserFile(fileInp.current.files[0])}
                />
            </div>
        </div>
        <div class="separator"></div>
        <form>
            <ul class="profile-form">
                <li>
                    <div class="profile-inp-wrapper">
                        <label class="profile-label" for="username">Name</label>
                        <input
                        class="profile-input"
                        name="username"
                        type="text"
                        maxLength="30"
                        value={name}
                        onChange={(evt) => setName(evt.target.value)}
                        />
                    </div>
                </li>
                <li>
                    <div class="profile-inp-wrapper">
                        <label class="profile-label" for="about">About</label>
                        <input
                        class="profile-input"
                        name="about"
                        type="text"
                        maxLength="150"
                        value={about}
                        onChange={(evt) => setAbout(evt.target.value)}
                        />
                    </div>
                </li>
                <li>
                    <div class="profile-btn-wrapper">
                        <button class="profile-btn" type="button" disabled={isSending} onClick={() => updateAccount()}>
                            <div class="profile-btn-symb">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 0.5V3C3 3.82843 3.67157 4.5 4.5 4.5H6.5C7.32843 4.5 8 3.82843 8 3V0.5H8.37868C8.90911 0.5 9.41782 0.710714 9.79289 1.08579L11.4142 2.70711C11.7893 3.08218 12 3.59089 12 4.12132V10.5C12 11.6046 11.1046 12.5 10 12.5V8C10 7.17157 9.32843 6.5 8.5 6.5H3.5C2.6727 6.5 2 7.16872 2 7.99827V12.4999C0.895489 12.4999 0 11.6046 0 10.5V2.5C0 1.39543 0.895431 0.5 2 0.5H3ZM4 0.5V3C4 3.27614 4.22386 3.5 4.5 3.5H6.5C6.77614 3.5 7 3.27614 7 3V0.5H4ZM3 12.5H9V8C9 7.72386 8.77614 7.5 8.5 7.5H3.5C3.22273 7.5 3 7.72326 3 7.99827V12.5Z" fill="#333738"/>
                                </svg>
                            </div>
                            <div>Save changes</div>
                        </button>
                    </div>
                </li>
            </ul>
        </form>
        {userFile ? <Avatar userFile={userFile} setUserFile={setUserFile} updateAavatar={updateAavatar} /> : <div></div>}
    </div>
  );
}


export default Profile;
