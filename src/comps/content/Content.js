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

          <Route path="">
            <div>
              <div class="sq1"></div>
              <div class="sq2"></div>
              <div class="sq3"></div>
              <div class="sq4"></div>
              <div class="sq5"></div>
              <div class="sq6"></div>
              <div class="dialogue-wrapper">
                <div class="dialogue dialogue--grey dialogue--margin1">
                  <div class="dialogue__row dialogue__row--grey dialogue__row--width1 dialogue__row--margin"></div>
                  <div class="dialogue__row dialogue__row--grey dialogue__row--width2"></div>
                </div>
                <div class="dialogue dialogue--grey dialogue--margin2">
                  <div class="dialogue__row dialogue__row--grey dialogue__row--width3 dialogue__row--margin"></div>
                  <div class="dialogue__row dialogue__row--grey dialogue__row--width2"></div>
                </div>
                <div class="dialogue dialogue--blue dialogue--margin1">
                  <div class="dialogue__row dialogue__row--white dialogue__row--width4"></div>
                </div>
                <div class="dialogue dialogue--blue">
                  <div class="dialogue__row dialogue__row--white dialogue__row--width2 dialogue__row--margin"></div>
                  <div class="dialogue__row dialogue__row--white dialogue__row--width5"></div>
                </div>
              </div>

            </div>
          </Route>
          
        </Switch>
      </div>
    );
}


export default Content;
