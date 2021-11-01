import React, { useState, useEffect, useRef } from 'react';
import { Route, Redirect } from "react-router-dom";

import ModalFindUser from '../modals/ModalFindUser.js';
import ModalUser from '../modals/ModalUser.js';


function SidebarItem(props) {
  // Array: directMessages
  // Set: isOnline
  // WebSocket: clientWs
  // string: id
  // string: name
  // number: lvl

  const [showModal, setShowModal] = useState(null);
  const [contact, setContact] = useState(null);
  const [btnRect, setBtnRect] = useState(false);
  const btn = useRef(null);

  let symb;
  let extraBtn;
  let modal;
  let callback;
  switch (props.id) {
    case 'messages':
      symb = <MessagesSymb />;
      extraBtn = <PlusSymb />;
      callback = () => {
        setBtnRect(btn.current.getBoundingClientRect());
        setShowModal('FindUser');
      };
      switch (showModal) {
        case 'FindUser':
          modal = <ModalFindUser directMessages={props.directMessages} setShowModal={setShowModal} setContact={setContact} btnRect={btnRect} />;
          break;
        case 'User':
          modal = <ModalUser clientWs={props.clientWs} contact={contact} online={props.isOnline.has(contact.id)} setShowModal={setShowModal} setNotification={props.setNotification} rect={btnRect} inDM={false} />;
          break;
        case 'redirect':
          modal = <Redirect to={`/chats/${contact.id}`} />;
          break;
        default:
          modal = null;
      }
      break;
    case 'groups':
      symb = <GroupsSymb />;
      extraBtn = <DotsSymb />;
      callback = () => {
        setBtnRect(btn.current.getBoundingClientRect());
        setShowModal('DotsMenu');
      };
      switch (showModal) {
        case 'DotsMenu':
          modal = <DotsMenu setShowModal={setShowModal} btnRect={btnRect} items={[]} modals={} />;
          break;
        case 'User':
          modal = <ModalUser clientWs={props.clientWs} contact={contact} online={props.isOnline.has(contact.id)} setShowModal={setShowModal} setNotification={props.setNotification} rect={btnRect} inDM={false} />;
          break;
        default:
          modal = null;
      }
      break;
    case 'settings':
      symb = <SettingsSymb />;
      break;
    }

  return (
    <div id={props.id} class="sidebar__item">

      <div class={`sidebar__item__header sidebar__item__header--lvl${props.lvl}`}>

        <div class="sidebar__item__header-left" onClick={() => document.querySelector(`#${props.id}`).classList.toggle('sidebar__item--active')}>
          <div class="sidebar__item-chevron">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292893 13.7071C-0.0976311 13.3166 -0.0976312 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976317 1.31658 -0.0976317 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071Z" fill="#333738"/>
            </svg>
          </div>
          <div class="sidebar__item-symb">
            {symb}
          </div>
          <div class="sidebar__item-text">{props.name}</div>
        </div>

        <div
        ref={btn}
        class={`sidebar__item__header-right ${extraBtn? "" : " display-none"}`}
        onClick={() => {
          callback();
        }}>
          {extraBtn}
        </div>

      </div>

      <div class="sidebar__item__content">
        {props.children}
      </div>

      {showModal ? <div>{modal}</div> : null}

    </div>
  );
}


function MessagesSymb() {
  return (
    <React.Fragment>
      <div class="sidebar__item-symb--scale-down">
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2C0 0.89543 0.895431 0 2 0H18C19.1046 0 20 0.89543 20 2V13C20 14.1046 19.1046 15 18 15H13.4142L10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071L6.58579 15H2C0.89543 15 0 14.1046 0 13V2ZM18 2H2V13H7C7.26522 13 7.51957 13.1054 7.70711 13.2929L10 15.5858L12.2929 13.2929C12.4804 13.1054 12.7348 13 13 13H18V2ZM4 5.5C4 4.94772 4.44772 4.5 5 4.5H15C15.5523 4.5 16 4.94772 16 5.5C16 6.05228 15.5523 6.5 15 6.5H5C4.44772 6.5 4 6.05228 4 5.5ZM4 9.5C4 8.94772 4.44772 8.5 5 8.5H11C11.5523 8.5 12 8.94772 12 9.5C12 10.0523 11.5523 10.5 11 10.5H5C4.44772 10.5 4 10.0523 4 9.5Z" fill="#333738"/>
        </svg>
      </div>
    </React.Fragment>
  );
}


function GroupsSymb() {
  return (
    <React.Fragment>
      <div class="sidebar__item-symb--scale-up">
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2.5C2 1.39543 2.89543 0.5 4 0.5C5.10457 0.5 6 1.39543 6 2.5C6 3.14476 5.6949 3.71826 5.2212 4.084C5.20695 4.09451 5.19279 4.10515 5.17873 4.1159C4.84819 4.35743 4.44074 4.5 4 4.5C2.89543 4.5 2 3.60457 2 2.5ZM4 1.5C3.44772 1.5 3 1.94772 3 2.5C3 3.05228 3.44772 3.5 4 3.5C4.55228 3.5 5 3.05228 5 2.5C5 1.94772 4.55228 1.5 4 1.5ZM8.7788 4.084C8.3051 3.71826 8 3.14476 8 2.5C8 1.39543 8.89543 0.5 10 0.5C11.1046 0.5 12 1.39543 12 2.5C12 3.60457 11.1046 4.5 10 4.5C9.55926 4.5 9.15182 4.35744 8.82127 4.11591C8.80721 4.10515 8.79305 4.09451 8.7788 4.084ZM10 1.5C9.44772 1.5 9 1.94772 9 2.5C9 3.05228 9.44772 3.5 10 3.5C10.5523 3.5 11 3.05228 11 2.5C11 1.94772 10.5523 1.5 10 1.5ZM1.49998 5.5L4.17071 5.5C4.06015 5.81278 4 6.14936 4 6.5L1.49998 6.5C1.22387 6.5 1 6.72387 1 7C1 7.81691 1.32453 8.42273 1.8381 8.83495C2.07424 9.02449 2.35704 9.17798 2.67672 9.28955C2.44452 9.53697 2.26211 9.83166 2.14547 10.1576C1.80551 10.0193 1.49098 9.83862 1.21215 9.61481C0.458971 9.01027 0 8.11608 0 7C0 6.17161 0.671562 5.5 1.49998 5.5ZM5.26756 5.5C5.09739 5.79417 5 6.13571 5 6.5C5 7.34354 5.52222 8.06511 6.26101 8.35904C6.48962 8.44999 6.73897 8.5 7 8.5C7.26103 8.5 7.51039 8.44999 7.739 8.35904C8.47778 8.0651 9 7.34354 9 6.5C9 6.13571 8.90261 5.79417 8.73244 5.5C8.38663 4.9022 7.74028 4.5 7 4.5C6.25972 4.5 5.61337 4.9022 5.26756 5.5ZM6.77563 5.52527C6.84776 5.50873 6.92286 5.5 7 5.5C7.07714 5.5 7.15224 5.50873 7.22437 5.52527C7.66862 5.62711 8 6.02486 8 6.5C8 6.57714 7.99127 6.65224 7.97473 6.72437C7.87289 7.16862 7.47514 7.5 7 7.5C6.52486 7.5 6.12711 7.16862 6.02527 6.72437C6.00874 6.65225 6 6.57714 6 6.5C6 6.02486 6.33138 5.62711 6.77563 5.52527ZM12.1619 8.83495C11.9258 9.02449 11.643 9.17798 11.3233 9.28955C11.5555 9.53696 11.7379 9.83166 11.8545 10.1576C12.1945 10.0193 12.509 9.83862 12.7879 9.61481C13.541 9.01027 14 8.11608 14 7C14 6.17157 13.3284 5.5 12.5 5.5L9.82929 5.5C9.93985 5.81278 10 6.14936 10 6.5H12.5C12.7761 6.5 13 6.72386 13 7C13 7.81691 12.6755 8.42273 12.1619 8.83495ZM9.5 9.5C10.1259 9.5 10.6622 9.88333 10.8871 10.428C10.9598 10.6043 11 10.7975 11 11C11 12.1161 10.541 13.0103 9.78785 13.6148C9.04658 14.2098 8.05308 14.5 7 14.5C5.94692 14.5 4.95342 14.2098 4.21215 13.6148C3.45897 13.0103 3 12.1161 3 11C3 10.7975 3.04015 10.6043 3.11292 10.428C3.33778 9.88334 3.87412 9.5 4.49998 9.5L9.5 9.5ZM9.5 10.5L4.49998 10.5C4.22387 10.5 4 10.7239 4 11C4 11.8169 4.32453 12.4227 4.8381 12.8349C5.36358 13.2567 6.12008 13.5 7 13.5C7.87992 13.5 8.63642 13.2567 9.1619 12.8349C9.67547 12.4227 10 11.8169 10 11C10 10.7239 9.77614 10.5 9.5 10.5Z" fill="#333738"/>
        </svg>
      </div>
    </React.Fragment>
  );
}


function SettingsSymb() {
  return (
    <React.Fragment>
      <div class="sidebar__item-symb--scale-down">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2C9.44771 2 9 2.44772 9 3C9 4.69226 6.95399 5.53974 5.75738 4.34314C5.36686 3.95261 4.73369 3.95261 4.34317 4.34314C3.95265 4.73366 3.95265 5.36683 4.34317 5.75735C5.53982 6.954 4.69223 9 3 9C2.44772 9 2 9.44771 2 10C2 10.5523 2.44772 11 3 11C4.69236 11 5.53964 13.0461 4.34311 14.2426C3.95258 14.6332 3.95258 15.2663 4.34311 15.6569C4.73363 16.0474 5.3668 16.0474 5.75732 15.6569C6.9539 14.4603 9 15.3077 9 17C9 17.5523 9.44771 18 10 18C10.5523 18 11 17.5523 11 17C11 15.3077 13.046 14.4602 14.2427 15.6568C14.6332 16.0474 15.2664 16.0474 15.6569 15.6568C16.0474 15.2663 16.0474 14.6332 15.6569 14.2426C14.4603 13.0461 15.3077 11 17 11C17.5523 11 18 10.5523 18 10C18 9.44771 17.5523 9 17 9C15.3078 9 14.4601 6.95405 15.6568 5.75737C16.0473 5.36684 16.0473 4.73368 15.6568 4.34315C15.2663 3.95263 14.6331 3.95263 14.2426 4.34315C13.046 5.53979 11 4.69219 11 3C11 2.44772 10.5523 2 10 2ZM7.00816 2.77703C7.12224 1.2243 8.41814 0 10 0C11.5819 0 12.8778 1.2243 12.9918 2.77703C14.1704 1.75977 15.9525 1.8104 17.071 2.92894C18.1896 4.04748 18.2402 5.82955 17.2229 7.00816C18.7757 7.12221 20 8.41812 20 10C20 11.5819 18.7757 12.8778 17.223 12.9918C18.2403 14.1704 18.1896 15.9525 17.0711 17.0711C15.9525 18.1896 14.1705 18.2402 12.9918 17.2229C12.8778 18.7757 11.5819 20 10 20C8.41813 20 7.12221 18.7757 7.00816 17.2229C5.82955 18.2402 4.04745 18.1896 2.92889 17.0711C1.81034 15.9525 1.75972 14.1704 2.77702 12.9918C1.2243 12.8778 0 11.5819 0 10C0 8.41812 1.22433 7.12221 2.77709 7.00816C1.75978 5.82955 1.81041 4.04747 2.92896 2.92892C4.0475 1.81038 5.82955 1.75975 7.00816 2.77703Z" fill="#333738"/>
          <path d="M10 8C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10C8 10.5304 8.21071 11.0391 8.58579 11.4142C8.96086 11.7893 9.46957 12 10 12C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10C12 9.46957 11.7893 8.96086 11.4142 8.58579C11.0391 8.21071 10.5304 8 10 8ZM7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6C11.0609 6 12.0783 6.42143 12.8284 7.17157C13.5786 7.92172 14 8.93913 14 10C14 11.0609 13.5786 12.0783 12.8284 12.8284C12.0783 13.5786 11.0609 14 10 14C8.93913 14 7.92172 13.5786 7.17157 12.8284C6.42143 12.0783 6 11.0609 6 10C6 8.93913 6.42143 7.92172 7.17157 7.17157Z" fill="#333738"/>
        </svg>
      </div>
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


function DotsSymb() {
  return (
    <React.Fragment>
      <div class="sidebar__item-extra-plus">
        <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-3.49691e-07 8C-3.97973e-07 9.10457 0.89543 10 2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 -3.01409e-07 6.89543 -3.49691e-07 8Z" fill="#0D0D0D"/>
          <path d="M-8.74228e-08 2C-1.35705e-07 3.10457 0.89543 4 2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 -3.91405e-08 2 -8.74228e-08C0.895431 -1.35705e-07 -3.91405e-08 0.89543 -8.74228e-08 2Z" fill="#0D0D0D"/>
          <path d="M-6.11959e-07 14C-6.60242e-07 15.1046 0.89543 16 2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12C0.89543 12 -5.63677e-07 12.8954 -6.11959e-07 14Z" fill="#0D0D0D"/>
        </svg>
      </div>
    </React.Fragment>
  );
}



function DotsMenu(props) {
  // Callback: setShowModal
  // DOMRect: btnRect
  let top = props.btnRect.bottom;
  let left = props.btnRect.right;
  let setShowModal;

  return (
    <div class="dots-menu-wrapper">
      <div
      class="dots-menu"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}>{}</div>
    </div>
  );
}





export default SidebarItem;
