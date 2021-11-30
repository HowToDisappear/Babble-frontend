import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';

import SidebarMessages from './SidebarMessages.js';
import SidebarSettings from './SidebarSettings.js';

import SidebarItem from './SidebarItem.js';
import SidebarContacts from './SidebarContacts.js';
import SidebarGroups from './SidebarGroups.js';

function Sidebar(props) {
  return (
    <div class="sidebar">
      {console.log('rendering in sidebar')}

      <header class="sidebar__header">
        <Link to="/">
          <div class="logo">
          </div>
        </Link>
        <div class="babble-title">Babble</div>
      </header>
      <div class="sidebar__nav-wrapper">
        <div class="sidebar__nav">

          <SidebarSettings />

          <SidebarGroups
          groupMessages={props.groupMessages}
          directMessages={props.directMessages}
          clientWs={props.clientWs}
          isOnline={props.isOnline}
          setNotification={props.setNotification}
          user={props.user}
          setUpdGM={props.setUpdGM}
          />
        
          <SidebarMessages
          directMessages={props.directMessages}
          clientWs={props.clientWs}
          isOnline={props.isOnline}
          user={props.user}
          setNotification={props.setNotification}
          />

        </div>
      </div>
      <SidebarUserInfo user={props.user} setUser={props.setUser} clientWs={props.clientWs} />

    </div>
  );
}


function SidebarUserInfo(props) {
  const [showModal, setShowModal] = useState(false);
  const acc = props.user;

  return (
    <div class="sidebar-user-info">

      <div class="sidebar-user-info__avatar">
        {acc.image
        ? <img class="sidebar-user-info__pic" src={acc.image} />
        : <div class="sidebar-user-info__pic">{acc.username[0]}</div>}
        <div class="sidebar-user-info__online"></div>
      </div>
      <div class="sidebar-user-info__name">
        {acc.username}
      </div>
      <div class="sidebar-user-info__id">
        {`id: ${btoa(acc.id)}`}
      </div>
      <div class="sidebar-user-info__extra">
        <div
        class="sidebar-user-info__extra-dots"
        onClick={() => {
          setShowModal(true);
        }}>
          <DotsSymb />
        </div>
      </div>
      {showModal
      ? <DotsMenu setShowModal={setShowModal} setUser={props.setUser} clientWs={props.clientWs} />
      : null}

    </div>
  );
}


function DotsMenu(props) {
  let bottom = 14;
  let left = 190;

  return (
    <div
    class="dots-menu-wrapper"
    onClick={(evt) => {
      if (!evt.target.closest('.dots-menu')) {
          props.setShowModal(null);
          evt.preventDefault();
          evt.stopPropagation();
        }
    }}
    >
      <div
      class="dots-menu"
      style={{
        bottom: `${bottom}px`,
        left: `${left}px`,
      }}>
        <div class="dots-menu-item-signout" onClick={() => {
          fetch('http://' + window.location.host + '/api/accounts/signout')
          .then(() => {
            props.setUser(false);
            props.clientWs.current.close(1000);
            return <Redirect to="/" />;
          })
        }}>
          <div class="dots-menu-item__symb">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.36442e-07 2C5.96046e-07 0.895431 0.89543 0 2 0L11 4.17233e-07C12.1046 4.17233e-07 13 0.895431 13 2L13 4C13 4.55229 12.5523 5 12 5C11.4477 5 11 4.55228 11 4L11 2L2 2L2 14H11V12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V14C13 15.1046 12.1046 16 11 16H2C0.895431 16 0 15.1046 0 14L5.36442e-07 2ZM15.2929 4.29289C15.6834 3.90237 16.3166 3.90237 16.7071 4.29289L19.7071 7.29289C20.0976 7.68342 20.0976 8.31658 19.7071 8.70711L16.7071 11.7071C16.3166 12.0976 15.6834 12.0976 15.2929 11.7071C14.9024 11.3166 14.9024 10.6834 15.2929 10.2929L16.5858 9H7C6.44772 9 6 8.55228 6 8C6 7.44772 6.44772 7 7 7L16.5858 7L15.2929 5.70711C14.9024 5.31658 14.9024 4.68342 15.2929 4.29289Z" fill="#333738"/>
            </svg>
          </div>
          <div class="dots-menu-item__text">Sign out</div>
        </div>
      </div>
    </div>
  );
}


function DotsSymb() {
  return (
    <React.Fragment>
      <div class="sidebar__item-extra-dots">
        <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-3.49691e-07 8C-3.97973e-07 9.10457 0.89543 10 2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 -3.01409e-07 6.89543 -3.49691e-07 8Z" fill="#333738"/>
          <path d="M-8.74228e-08 2C-1.35705e-07 3.10457 0.89543 4 2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 -3.91405e-08 2 -8.74228e-08C0.895431 -1.35705e-07 -3.91405e-08 0.89543 -8.74228e-08 2Z" fill="#333738"/>
          <path d="M-6.11959e-07 14C-6.60242e-07 15.1046 0.89543 16 2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12C0.89543 12 -5.63677e-07 12.8954 -6.11959e-07 14Z" fill="#333738"/>
        </svg>
      </div>
    </React.Fragment>
  );
}




export default Sidebar;
