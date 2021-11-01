import React, { useRef, useState, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";

import SidebarItem from './SidebarItem.js';
import SidebarContacts from './SidebarContacts.js';
import ModalFindUser from '../modals/ModalFindUser.js';
import ModalUser from '../modals/ModalUser.js';


function SidebarMessages(props) {
    // Array: directMessages
    // WebSocket: clientWs
    // Set: isOnline
    // Account obj: user
    // Callback: setNotification

    return (
        <SidebarItem
        id={'messages'}
        name={'Messages'}
        lvl={1}
        extra={
            <SidebarMessagesExtra
            directMessages={props.directMessages}
            clientWs={props.clientWs}
            isOnline={props.isOnline}
            setNotification={props.setNotification}    
            />
        }
        content={
            <SidebarContacts
            directMessages={props.directMessages}
            clientWs={props.clientWs}
            isOnline={props.isOnline}
            user={props.user}
            setNotification={props.setNotification}
            />  
        }
        />
    );
}


function SidebarMessagesExtra(props) {
    const btn = useRef(null);
    const [btnRect, setBtnRect] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const [contact, setContact] = useState(null);
  
    let modal;
    switch (showModal) {
        case 'FindUser':
          modal = <ModalFindUser
          directMessages={props.directMessages}
          setShowModal={setShowModal}
          setContact={setContact}
          btnRect={btnRect} />;
          break;
        case 'User':
          modal = <ModalUser
          clientWs={props.clientWs}
          contact={contact}
          online={props.isOnline.has(contact.id)}
          setShowModal={setShowModal}
          setNotification={props.setNotification}
          rect={btnRect}
          userId={null}
          inDM={false} />;
          break;
        case 'redirect':
          modal = <Redirect to={`/chats/${contact.id}`} />;
          break;
        default:
          modal = null;
    }
    return (
        <React.Fragment>
            <div
            class="sidebar__item__header-right"
            ref={btn}
            onClick={() => {
                setBtnRect(btn.current.getBoundingClientRect());
                setShowModal('FindUser');
            }}>
                <PlusSymb />
            </div>
            {showModal ? <div>{modal}</div> : null}
        </React.Fragment>
    );
}


function PlusSymb() {
  return (
    <React.Fragment>
      <div class="sidebar__item-extra-plus">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0C8.55228 0 9 0.447715 9 1V7H15C15.5523 7 16 7.44772 16 8C16 8.55229 15.5523 9 15 9H9V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V9H1C0.447715 9 0 8.55229 0 8C0 7.44772 0.447715 7 1 7H7V1C7 0.447715 7.44772 0 8 0Z" fill="#333738"/>
        </svg>
      </div>
    </React.Fragment>
  );
}


export default SidebarMessages;
