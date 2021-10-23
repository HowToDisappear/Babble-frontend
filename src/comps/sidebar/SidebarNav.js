import React from 'react';
import { Link, NavLink } from 'react-router-dom';


function SidebarNav(props) {
    return (
      <div class="sidebar__nav">
        <Link to="/settings">
          <div class="sidebar__nav__item">
            <div class="sidebar__nav__item-symb"></div>
            <div class="sidebar__nav__item-text">Settings</div>
          </div>
        </Link>
        <Link to="/groups">
          <div class="sidebar__nav__item">
            <div class="sidebar__nav__item-symb"></div>
            <div class="sidebar__nav__item-text">Groups</div>
          </div>
        </Link>
        <Link to="/messages">
          <div class="sidebar__nav__item">
            <div class="sidebar__nav__item-symb"></div>
            <div class="sidebar__nav__item-text">Messages</div>
          </div>
        </Link>
      </div>
    );
}


export default SidebarNav;
