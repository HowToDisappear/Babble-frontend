import React from 'react';
import { Link, NavLink } from 'react-router-dom';


function SidebarNav(props) {
    return (
      <div class="sidebar__nav">
        <NavLink to="/contacts" activeClassName="sidebar__nav__item--selected">
          <div class="sidebar__nav__item">
            <div class="sidebar__nav__icon"></div>
            <div>Contacts</div>
          </div>
        </NavLink>
        <NavLink to={`/settings`} activeClassName="sidebar__nav__item--selected">
          <div class="sidebar__nav__item">
            <div class="sidebar__nav__icon"></div>
            <div>Settings</div>
          </div>
        </NavLink>
      </div>
    );
}


export default SidebarNav;
