import React from 'react';

import SidebarNav from './SidebarNav.js';
import SidebarContacts from './SidebarContacts.js';


function Sidebar(props) {
    console.log(`entering sidebar`);
    return (
      <div class="sidebar">
        {console.log("rendering in sidebar")}
        <SidebarNav />
        <SidebarContacts contacts={props.contacts} isOnline={props.isOnline} />
      </div>
    );
}

export default Sidebar;
