import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SidebarItemHeader from './SidebarItemHeader.js';
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

          <SidebarItemHeader id={'settings'} name={'Settings'} callBack={null} lvl={1}>
            {settingsContent}
          </SidebarItemHeader>
          
          <SidebarItemHeader id={'groups'} name={'Groups'} callBack={null} lvl={1}>
            <SidebarGroups
            isOnline={props.isOnline}
            groupMessages={props.groupMessages}
            />
          </SidebarItemHeader>
          
          <SidebarItemHeader
          id={'messages'}
          name={'Messages'}
          directMessages={props.directMessages}
          callBack={null}
          lvl={1}>
            <SidebarContacts
            user={props.user}
            directMessages={props.directMessages}
            isOnline={props.isOnline}/>
          </SidebarItemHeader>
        
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
