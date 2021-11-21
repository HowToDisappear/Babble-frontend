import Cookies from 'js-cookie';
import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import SidebarItem from './SidebarItem.js';
import SidebarMember from './SidebarMember.js';
import SidebarInvitation from './SidebarInvitation.js';
import ModalCreate from '../modals/ModalCreate.js';
import ModalConfirmation from '../modals/ModalConfirmation.js';
import ModalFindUser from '../modals/ModalFindUser.js';
import ModalUserInvite from '../modals/ModalUserInvite.js';


function SidebarGroups(props) {
  const groups = props.groupMessages;

  function isInDM(accId) {
    for (const acc of props.directMessages) {
      if (acc.id === accId) {
        return true;
      }
    }
    return false;
  }

  function membStatus(membership_set) {
    for (const member of membership_set) {
      if (member.account.id === props.user.id) {
        return member.status;
      }
    }
  }

  let markup = groups.map((group) => {
    const membershipStatus = membStatus(group.membership_set);
    if (membershipStatus === 3) {
      return null;
    }
    const ts = group.topic_set.map((topic) =>
    <div class="sidebar-unit">
      <NavLink to={`/groups/${group.id}/${topic.id}`} activeClassName="sidebar-unit--selected">
        <span class="sidebar-unit__symb"><TopicSymb /></span>
        <span class="sidebar-unit__text">{topic.title}</span>
      </NavLink>
    </div>
    );
    const ms = group.membership_set.map((member) => {
      if (member.status !== 3) {
        return (
          <div>
            <SidebarMember
            acc={member.account}
            membStatus={member.status}
            online={props.isOnline.has(member.account.id)}
            inDM={isInDM(member.account.id)}
            clientWs={props.clientWs}
            setNotification={props.setNotification}
            user={props.user}
            />
          </div>  
        );
      }
    });
    const invSet = group.membership_set.map((member) => {
      if (member.status === 3) {
        return (
          <div>
            <SidebarMember
            acc={member.account}
            membStatus={member.status}
            online={props.isOnline.has(member.account.id)}
            inDM={isInDM(member.account.id)}
            clientWs={props.clientWs}
            setNotification={props.setNotification}
            user={props.user}
            />
          </div>  
        );
      }
    });
    return (
      <React.Fragment>
        <SidebarItem
        id={`groups-${group.id}`}
        name={group.name}
        lvl={2}
        extra={
          <SidebarGroupExtra group={group} membership={membStatus(group.membership_set)} setNotification={props.setNotification} clientWs={props.clientWs} setUpdGM={props.setUpdGM} />
        }
        content={
          <React.Fragment>
            <SidebarItem id={`topics-${group.id}`} name={'Topics'} lvl={3} content={ts} />
            <SidebarItem id={`members-${group.id}`} name={'Members'} lvl={3} content={ms} />
            {(membershipStatus === 2) ? <SidebarItem id={`invitees-${group.id}`} name={'Invitees'} lvl={3} content={invSet} /> : null}
          </React.Fragment>
        }
        />
      </React.Fragment>
    );
  });

  const invites = groups.map((group) => {
    const membershipStatus = membStatus(group.membership_set);
    if (membershipStatus === 3) {
      return (
        <SidebarInvitation group={group} clientWs={props.clientWs} />
      );
    }  
  });

  return (
    <SidebarItem
    id={'groups'}
    name={'Groups'}
    lvl={1}
    extra={
      <SidebarGroupsExtra clientWs={props.clientWs} setUpdGM={props.setUpdGM} />
    }
    content={
      <div class="sidebar__contacts">
        {markup}
        {invites.some(e => e) ?
        <SidebarItem
        id={'invitations'}
        name={'Invitations'}
        lvl={2}
        content={invites}
        /> : null}
      </div>
    }/>
  );
}



function SidebarGroupsExtra(props) {
  const btn = useRef(null);
  const [btnRect, setBtnRect] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function createGroup(inp) {
    let url = 'http://' + window.location.host + `/api/groups/`;
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    
    let form = new FormData();
    form.set('name', inp);

    fetch(url, {
        method: 'post',
        headers: headers,
        credentials: 'include',
        body: form
    })
    .then((resp) => {
    if (!resp.ok) {
        throw new Error(`HTTP error status: ${resp.status}`);
    } else {
        props.setUpdGM(prevState => prevState * -1);
        setShowModal(false);
    }
    })
    .catch((err) => console.log(err));
  }

  return (
    <React.Fragment>
      <div
      class="sidebar__item__header-right"
      ref={btn}
      onClick={() => {
        setBtnRect(btn.current.getBoundingClientRect());
        setShowModal(true);
      }}>
        <PlusSymb />
      </div>
      {showModal
      ? <div><ModalCreate
      placeholder={"Type the name of a group"}
      title={"Create a group"}
      rect={btnRect}
      callback={createGroup}
      setShowModal={setShowModal} /></div>
      : null}
    </React.Fragment>
  );
}



function SidebarGroupExtra(props) {
  const btn = useRef(null);
  const [btnRect, setBtnRect] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [contact, setContact] = useState(null);

  function createTopic(inp) {
    let url = 'http://' + window.location.host + `/api/groups/${props.group.id}/topics/`;
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    
    let form = new FormData();
    form.set('title', inp);

    fetch(url, {
        method: 'post',
        headers: headers,
        credentials: 'include',
        body: form
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`HTTP error status: ${resp.status}`);
      } else {
        props.clientWs.current.send(JSON.stringify({
          'type': 'update',
          'structure': 'gm',
          'id': props.group.id
        }));
        setShowModal(false);
      }
    })
    .catch((err) => console.log(err));
  }

  function leaveGroup() {
    let url = 'http://' + window.location.host + `/api/groups/${props.group.id}`;
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    
    let form = new FormData();
    form.set('action', 'remove_member');

    fetch(url, {
        method: 'post',
        headers: headers,
        credentials: 'include',
        body: form
    })
    .then((resp) => {
      if (resp.ok) {
        props.clientWs.current.send(JSON.stringify({
          'type': 'update',
          'structure': 'gm',
          'id': props.group.id
        }));
      } else {
        throw new Error(`HTTP error status: ${resp.status}`);
      }
    })
    .catch((err) => console.log(err));
  }

  function deleteGroup() {
    let url = 'http://' + window.location.host + `/api/groups/${props.group.id}`;
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    
    fetch(url, {
        method: 'delete',
        headers: headers,
        credentials: 'include',
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`HTTP error status: ${resp.status}`);
      } else {
        props.setUpdGM(prevState => prevState * -1);
      }
    })
    .catch((err) => console.log(err));
  }

  let menu;
  if (props.membership === 1) {
    // participant
    const items = new Map();
    items.set('Leave group', 'LeaveGroup');
    menu = <DotsMenu
    items={items}
    btnRect={btnRect}
    setShowModal={setShowModal} />;
  } else if (props.membership === 2) {
    // admin
    const items = new Map();
    items.set('Create topic', 'CreateTopic');
    items.set('Invite member', 'InviteMember');
    items.set('Delete group', 'DeleteGroup');
    menu = <DotsMenu
    items={items}
    btnRect={btnRect}
    setShowModal={setShowModal} />;
  } else if (props.membership === 3) {
    // invitee
    menu = null;
  }

  let modal;
  switch (showModal) {
    case 'DotsMenu':
      modal = menu;
      break;
    case 'LeaveGroup':
      modal = <ModalConfirmation
      text={"Leave"}
      name={props.group.name}
      btn={"Leave"}
      notification={"Group left"}
      setShowModal={setShowModal}
      callback={leaveGroup}
      />;
      break;
    case 'DeleteGroup':
      modal = <ModalConfirmation
      text={"Delete"}
      name={props.group.name}
      btn={"Delete"}
      notification={"Group deleted"}
      setShowModal={setShowModal}
      callback={deleteGroup}
      />;
      break;
    case 'CreateTopic':
      modal = <ModalCreate
      placeholder={"Type in a topic"}
      title={"Create a topic"}
      rect={btnRect}
      callback={createTopic}
      setShowModal={setShowModal} />;
      break;
    case 'InviteMember':
      modal = <ModalFindUser
      setShowModal={setShowModal}
      setContact={setContact}
      btnRect={btnRect} />;
      break;
    case 'FindUserNext':
      modal = <ModalUserInvite
      id={props.group.id}
      contact={contact}
      setShowModal={setShowModal}
      clientWs={props.clientWs}
      setNotification={props.setNotification}
      rect={btnRect}
      />;
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
        setShowModal('DotsMenu');
      }}>
        <DotsSymb />
      </div>
      {showModal ? <div>{modal}</div> : null}
    </React.Fragment>
  );
}



function DotsMenu(props) {
  let top = props.btnRect.bottom + 4;
  let left = props.btnRect.right - props.btnRect.width - 2;

  let items = [];
  for (const [k, v] of props.items) {
    items.push(<div class="dots-menu-item" onClick={() => props.setShowModal(v)}>{k}</div>);
  }

  return (
    <div
    class="dots-menu-wrapper"
    onClick={(evt) => {
      if (!evt.target.closest('.dots-menu')) {
          props.setShowModal(null);
          evt.preventDefault();
          evt.stopPropagation();
        }
    }}
    >
      <div
      class="dots-menu"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}>{items}</div>
    </div>
  );
}


function TopicSymb() {
  return (
    <React.Fragment>
      <div class="sidebar__item-symb--scale-down">
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2C0 0.895432 0.89543 0 2 0H10C10.2652 0 10.5196 0.105357 10.7071 0.292893L15.7071 5.29289C15.8946 5.48043 16 5.73478 16 6V18C16 19.1046 15.1046 20 14 20H2C0.895432 20 0 19.1046 0 18V2ZM13.5858 6L10 2.41421V6H13.5858ZM8 2L2 2V18H14V8H9C8.44772 8 8 7.55228 8 7V2ZM4 11C4 10.4477 4.44772 10 5 10H11C11.5523 10 12 10.4477 12 11C12 11.5523 11.5523 12 11 12H5C4.44772 12 4 11.5523 4 11ZM4 15C4 14.4477 4.44772 14 5 14H11C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16H5C4.44772 16 4 15.5523 4 15Z" fill="#333738"/>
        </svg>
      </div>
    </React.Fragment>
  );
}


function DotsSymb() {
  return (
    <React.Fragment>
      <div class="sidebar__item-extra-dots">
        <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-3.49691e-07 8C-3.97973e-07 9.10457 0.89543 10 2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 -3.01409e-07 6.89543 -3.49691e-07 8Z" fill="#333738"/>
          <path d="M-8.74228e-08 2C-1.35705e-07 3.10457 0.89543 4 2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 -3.91405e-08 2 -8.74228e-08C0.895431 -1.35705e-07 -3.91405e-08 0.89543 -8.74228e-08 2Z" fill="#333738"/>
          <path d="M-6.11959e-07 14C-6.60242e-07 15.1046 0.89543 16 2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12C0.89543 12 -5.63677e-07 12.8954 -6.11959e-07 14Z" fill="#333738"/>
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



export default SidebarGroups;
