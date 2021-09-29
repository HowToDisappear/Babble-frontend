import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../../../App.js';
import { Switch, Route } from "react-router-dom";

import Profile from './Profile.js';


function ContentSettings() {
  const { user, setUser } = useContext(UserContext);
  console.log('printing in Settings');
  console.log(user);
  return (
    <div class="settings">
      <Profile />
      <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/preferences">
            <div><h4>preferences</h4></div>
          </Route>
        </Switch>
    </div>
  );
}


export default ContentSettings;
  