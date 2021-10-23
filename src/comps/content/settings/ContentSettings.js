import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../../../App.js';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Profile from './Profile.js';


function ContentSettings() {
  const { user, setUser } = useContext(UserContext);
  let match = useRouteMatch();

  return (
    <div class="settings">
      <Switch>
        <Route path={`${match.path}/profile`}>
          <Profile />
        </Route>
        <Route path={`${match.path}/account`}>
          <div>
            <h2>Account</h2>
          </div>
        </Route>
        <Route path={`${match.path}/preferences`}>
          <div>
            <h2>Preferences</h2>
          </div>
        </Route>
        <Route path="">
          <div>You're in Settings!</div>
        </Route>
      </Switch>
    </div>
  );
}


export default ContentSettings;
  