import React from 'react';

import SidebarNav from './SidebarNav.js';
import SidebarContacts from './SidebarContacts.js';


function Sidebar(props) {
    return (
      <div class="sidebar">
        {console.log("rendering in sidebar")}
        <header class="sidebar__header"></header>
        <div class="sidebar__wrapper">
          <SidebarNav />
          <SidebarContacts
          contacts={props.contacts}
          isOnline={props.isOnline}
          unreadMsg={props.unreadMsg}
          />
        </div>
      </div>
    );
}

export default Sidebar;
