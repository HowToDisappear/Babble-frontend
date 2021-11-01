import React, { useState, useEffect, useRef } from 'react';
import { Route, Redirect } from "react-router-dom";

import ModalUser from '../modals/ModalUser.js';


function SidebarMember(props) {
    // Account obj: acc
    // Boolean: online
    // Number: unread
    const [showModal, setShowModal] = useState(null);
    const [membRect, setMembRect] = useState(false);
    const memb = useRef(null);

    let modal;
    switch (showModal) {
        case 'User':
          modal = <ModalUser
          clientWs={props.clientWs}
          contact={props.acc}
          online={props.online}
          inDM={props.inDM}
          setShowModal={setShowModal}
          setNotification={props.setNotification}
          user={props.user}
          rect={membRect} />;
          break;
        case 'KickUser':
          modal = null;
          break;
        // case 'redirect':
        //   modal = <Redirect to={`/chats/${contact.id}`} />;
        //   break;
        default:
          modal = null;
    }

    return (
      <div
      class="sidebar__contact"
      ref={memb}
      onClick={() => {
        setMembRect(memb.current.getBoundingClientRect());
        setShowModal('User');
      }}
      >
        <div class="sidebar__contact__avatar">
          {props.acc.image
          ? <img class="sidebar__contact__pic" src={props.acc.image} />
          : <div class="sidebar__contact__pic">{props.acc.username[0]}</div>}
          <div class={`sidebar__contact__online ${props.online ? "" : "display-none"}`}></div>
        </div>
        <div class="sidebar__contact__name">
          {props.acc.username}
        </div>

        {showModal ? <div>{modal}</div> : null}

      </div>
    );
}


export default SidebarMember;
