import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SidebarItem from './SidebarItem.js';
import SidebarContacts from './SidebarContacts.js';
import SidebarGroups from './SidebarGroups.js';


function Sidebar(props) {
  const settings = useRef(null);
  const groups = useRef(null);
  const messages = useRef(null);

  let settingsContent = (
    <React.Fragment>
      <NavLink to="/settings/profile" activeClassName="sidebar__contact--selected">
        <span class="sidebar-symb-placeholder"></span>
        <div class="sidebar__item__content-unit sidebar__item__content-unit--lvl1">Profile</div>
      </NavLink>
      <NavLink to="/settings/account" activeClassName="sidebar__contact--selected">
        <span class="sidebar-symb-placeholder"></span>
        <div class="sidebar__item__content-unit sidebar__item__content-unit--lvl1">Account</div>
      </NavLink>
      <NavLink to="/settings/preferences" activeClassName="sidebar__contact--selected">
        <span class="sidebar-symb-placeholder"></span>
        <div class="sidebar__item__content-unit sidebar__item__content-unit--lvl1">Preferences</div>
      </NavLink>
    </React.Fragment>
  );

  return (
    <div class="sidebar">

      <header class="sidebar__header">
        <div class="logo"></div>
        <div class="babble-title">Babble</div>
      </header>
      <div class="sidebar__nav-wrapper">
        <div class="sidebar__nav">

          <SidebarItem id={'settings'} name={'Settings'} lvl={1}>
            {settingsContent}
          </SidebarItem>
          
          <SidebarItem id={'groups'} name={'Groups'} lvl={1}>
            <SidebarGroups
            groupMessages={props.groupMessages}
            isOnline={props.isOnline}
            />
          </SidebarItem>
          
          <SidebarItem
          directMessages={props.directMessages}
          clientWs={props.clientWs}
          isOnline={props.isOnline}
          id={'messages'}
          name={'Messages'}
          lvl={1}>
            <SidebarContacts
            directMessages={props.directMessages}
            isOnline={props.isOnline}
            user={props.user}
            />
          </SidebarItem>
        
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
