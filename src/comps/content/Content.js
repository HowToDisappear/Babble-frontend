import React, { useEffect, useState, useRef, useContext } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ContentContacts from './ContentContacts.js';
import ContentDM from './ContentDM.js';
import ContentGM from './ContentGM.js';
import ContentSettings from './settings/ContentSettings.js';


function Content(props) {
    // props - contacts: Array of Contact(s), isOnline: Set (of acc ids), chats, clientWs
    const [msgInp, setMsgInp] = useState(new Map());
    let match = useRouteMatch();
    return (
      <div class="content">
        {console.log('rendering in Content')}
        <Switch>

          <Route path="/groups/:groupId/:topicId">
            <ContentGM
            clientWs={props.clientWs}
            msgInp={msgInp}
            setMsgInp={setMsgInp}
            isOnline={props.isOnline}
            groupMessages={props.groupMessages}
            />
          </Route>

          <Route path="/chats/:contId">
            <ContentDM
            clientWs={props.clientWs}
            msgInp={msgInp}
            setMsgInp={setMsgInp}
            isOnline={props.isOnline}
            directMessages={props.directMessages}
            setDirectMessages={props.setDirectMessages}
            />
          </Route>

          <Route path="/settings">
            <ContentSettings
            setNotification={props.setNotification}
            />
          </Route>

          <Route path="/contacts">
            <ContentContacts contacts={props.contacts} />
          </Route>
          
        </Switch>
      </div>
    );
}


export default Content;
