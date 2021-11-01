import React from 'react';
import { NavLink } from 'react-router-dom';

import SidebarContact from './SidebarContact.js';


function SidebarContacts(props) {
  // Array: directMessages
  // WebSocket: clientWs
  // Set: isOnline
  // Account obj: user
  // Callback: setNotification

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
      <SidebarContact
      clientWs={props.clientWs}
      online={props.isOnline.has(cont.id)}
      setNotification={props.setNotification}
      acc={cont}
      unread={countUnread(cont.directmessage_set)}
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
