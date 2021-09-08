import React from 'react';
import { NavLink } from 'react-router-dom';

import Contact from './../Contact.js';


function SidebarContacts(props) {
    console.log(`entering sidebar contacts`);
    const contacts = props.contacts;
    console.log(props.contacts);
    const contNames = contacts.map(cont =>
      <NavLink to={`/chats/${cont.to_account.id}`} activeClassName="sidebar__contact--selected">
        <Contact acc={cont.to_account} online={props.isOnline.has(cont.to_account.id)} type="sidebar"/>
      </NavLink>
    );
    return (
      <div class="sidebar__contacts">
        <div class="sidebar__contacts__header">
          <h5>CONTACTS</h5>
          <span></span>
        </div>
        {contNames}
      </div>
    );
}


export default SidebarContacts;
