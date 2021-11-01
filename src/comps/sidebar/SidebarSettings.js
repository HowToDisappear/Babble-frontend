import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import SidebarItem from './SidebarItem.js';


function SidebarSettings() {
    return (
        <SidebarItem
        id={'settings'}
        name={'Settings'}
        lvl={1}
        extra={null}
        content={
            <React.Fragment>
                <div class="sidebar-unit">
                <NavLink to="/settings/profile" activeClassName="sidebar-unit--selected">
                    <span class="sidebar-unit__symb"></span>
                    <span class="sidebar-unit__text">Profile</span>
                </NavLink>
                </div>
                <div class="sidebar-unit">
                <NavLink to="/settings/account" activeClassName="sidebar-unit--selected">
                    <span class="sidebar-unit__symb"></span>
                    <span class="sidebar-unit__text">Account</span>
                </NavLink>
                </div>
                <div class="sidebar-unit">
                <NavLink to="/settings/preferences" activeClassName="sidebar-unit--selected">
                    <span class="sidebar-unit__symb"></span>
                    <span class="sidebar-unit__text">Preferences</span>
                </NavLink>
                </div>
            </React.Fragment>
        }/>
    );
}


export default SidebarSettings;
