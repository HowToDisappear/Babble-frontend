import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../../../App.js';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Profile from './Profile.js';
import Account from './Account.js';


function ContentSettings(props) {
  const { user, setUser } = useContext(UserContext);
  let match = useRouteMatch();

  return (
    <div class="settings">
      <Switch>
        <Route path={`${match.path}/profile`}>
          <Profile />
        </Route>
        <Route path={`${match.path}/account`}>
          <Account setNotification={props.setNotification} user={user} />
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
  