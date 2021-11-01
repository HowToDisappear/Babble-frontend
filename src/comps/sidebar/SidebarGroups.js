import React from 'react';
import { NavLink } from 'react-router-dom';

import SidebarItem from './SidebarItem.js';
import SidebarMember from './SidebarMember.js';


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

    let markup = groups.map((group) => {
      const ts = group.topic_set.map((topic) =>
      <div class="sidebar-unit">
        <NavLink to={`/groups/${group.id}/${topic.id}`} activeClassName="sidebar-unit--selected">
          <span class="sidebar-unit__symb"><TopicSymb /></span>
          <span class="sidebar-unit__text">{topic.title}</span>
        </NavLink>
      </div>
      );
      const ms = group.membership_set.map(member =>
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
      return (
        <React.Fragment>
          <SidebarItem id={group.name} name={group.name} callBack={null} lvl={2}>

            <SidebarItem id={`${group.name}-topics`} name={'Topics'} callBack={null} lvl={3}>
              {ts}
            </SidebarItem>

            <SidebarItem id={`${group.name}-members`} name={'Members'} callBack={null} lvl={3}>
              {ms}
            </SidebarItem>

          </SidebarItem>
        </React.Fragment>
      );
    });

    return (
      <div class="sidebar__contacts">
        {markup}
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


export default SidebarGroups;
