import React, { useEffect, useState, useRef, useContext } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ContentContacts from './ContentContacts.js';
import ContentChat from './ContentChat.js';
import ContentSettings from './settings/ContentSettings.js';


function Content(props) {
    // props - contacts: Array of Contact(s), isOnline: Set (of acc ids), chats, clientWs
    const [msgInp, setMsgInp] = useState(new Map());
    let match = useRouteMatch();
    return (
      <div class="content">
        {console.log('rendering in Content')}
        <Switch>
          <Route path="/settings">
            <ContentSettings />
          </Route>
          <Route path="/contacts">
            <ContentContacts contacts={props.contacts} />
          </Route>
          <Route path="/chats/:contId">
            <ContentChat
            chats={props.chats}
            setChats={props.setChats}
            chatsCopy={props.chatsCopy}
            unreadMsg={props.unreadMsg}
            updateUnread={props.updateUnread}
            contacts={props.contacts}
            isOnline={props.isOnline}
            msgInp={msgInp}
            setMsgInp={setMsgInp}
            clientWs={props.clientWs}
            />
          </Route>
        </Switch>
      </div>
    );
}


export default Content;
