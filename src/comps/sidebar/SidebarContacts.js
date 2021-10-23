import React from 'react';
import { NavLink } from 'react-router-dom';

import Contact from './../Contact.js';


function SidebarContacts(props) {
  // AccObj: user, Array: directMessages, Set: isOnline

  function countUnread(msg_set) {
    // Array: msg_set
    let i = 0;
    for (const msg of msg_set) {
      if (!msg.read && (msg.sender !== props.user.id)) {
        i++;
      }
    }
    return i;
  }

  const conts = props.directMessages.map(cont =>
    <NavLink to={`/chats/${cont.id}`} activeClassName="sidebar__contact--selected">
      <Contact
      acc={cont}
      online={props.isOnline.has(cont.id)}
      unread={countUnread(cont.directmessage_set)}
      type="sidebar"
      />
    </NavLink>
  );
  return (
    <div class="sidebar__contacts">
      {conts}
    </div>
  );
}


export default SidebarContacts;
