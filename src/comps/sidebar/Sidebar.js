import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

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
        <div class="logo"></div>
        <div class="babble-title">Babble</div>
      </header>
      <div class="sidebar__nav-wrapper">
        <div class="sidebar__nav">

          <SidebarSettings />

          <SidebarMessages
          directMessages={props.directMessages}
          clientWs={props.clientWs}
          isOnline={props.isOnline}
          user={props.user}
          setNotification={props.setNotification}
          />

          <SidebarGroups
          groupMessages={props.groupMessages}
          directMessages={props.directMessages}
          clientWs={props.clientWs}
          isOnline={props.isOnline}
          setNotification={props.setNotification}
          user={props.user}
          />
        
        </div>
      </div>
      <SidebarUserInfo user={props.user} />

    </div>
  );
}


function SidebarUserInfo(props) {
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

    </div>
  );
}


export default Sidebar;
