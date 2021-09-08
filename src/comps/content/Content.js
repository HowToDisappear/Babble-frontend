import React, { useEffect, useState, useRef } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ContentContacts from './ContentContacts.js';
import ContentChat from './ContentChat.js';
import ContentSettings from './ContentSettings.js';


function Content(props) {
    // props - contacts: Array of Contact(s), isOnline: Set (of acc ids), chats, clientWs
    const [msgInp, setMsgInp] = useState(new Map());
    let match = useRouteMatch();
    return (
      <div class="content">
        {console.log('rendering Content')}
        <Switch>
          <Route path="/contacts">
            <ContentContacts contacts={props.contacts} />
          </Route>
          <Route path="/chats/:contId">
            <ContentChat
            chats={props.chats}
            contacts={props.contacts}
            isOnline={props.isOnline}
            msgInp={msgInp}
            setMsgInp={setMsgInp}
            clientWs={props.clientWs}
            />
          </Route>
          <Route path={`${match.path}/settings`}>
            <ContentSettings />
          </Route>
        </Switch>
      </div>
    );
}


export default Content;
