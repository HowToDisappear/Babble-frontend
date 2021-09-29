import React from 'react';
import { NavLink } from 'react-router-dom';

import Contact from './../Contact.js';


function SidebarContacts(props) {
    const contacts = props.contacts;
    const conts = contacts.map(cont =>
      <NavLink to={`/chats/${cont.to_account.id}`} activeClassName="sidebar__contact--selected">
        <Contact
        acc={cont.to_account}
        online={props.isOnline.has(cont.to_account.id)}
        unread={props.unreadMsg.get(cont.to_account.id)}
        type="sidebar"
        />
      </NavLink>
    );
    return (
      <div class="sidebar__contacts">
        <div class="sidebar__contacts__header">
          <h5>CONTACTS</h5>
          {console.log("rendering in SidebarContacts")}
          <span></span>
        </div>
        {conts}
      </div>
    );
}


export default SidebarContacts;
