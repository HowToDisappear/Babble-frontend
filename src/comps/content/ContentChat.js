import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";

import Contact from './../Contact.js';
import MsgInput from './MsgInput.js';


function ContentChat(props) {
    // props - contacts: Array of Contact(s), isOnline: Set (of acc ids), chats, clientWs
    // const [msgInp, setMsgInp] = useState("");
  
    let {contId} = useParams();
    var cont = (() => {
      const contactList = props.contacts;
      for (const contact of contactList) {
        if (contact.to_account.id == contId) {
          return contact;
        }
      }
    })();
    console.log(cont);
    // add url for profile img
    const avatar = cont.to_account.user.first_name[0];
  
    console.log(props.chats);
    var chat = props.chats[contId];
    for (let msg of chat) {
      msg.timestamp = new Date(msg.timestamp);
    }
    chat = chat.sort((el1, el2) => {
      return el1.timestamp - el2.timestamp;
    });
    var showDate = new Date();
    chat = chat.map((msg) => {
      var currDate = new Date(msg.timestamp.getFullYear(), msg.timestamp.getMonth(), msg.timestamp.getDate());
      if (currDate.getTime() === showDate.getTime()) {
        return (
          <div class="chat__msg-container">
            <div>
              <div class="chat__msg__pic">{(msg.sender == contId) ? avatar : 'U'}</div>
            </div>
            <div key={msg.id.toString()} class={`chat__msg ${(msg.sender == contId) ? 'chat__msg--side1' : 'chat__msg--side2'}`}>
              {msg.text}
            </div>
          </div>
        );
      } else {
        showDate = currDate;
        let showDatePretty = (() => {
          let arr = showDate.toDateString().split(' ').slice(1,);
          return [arr[1], arr[0], arr[2]].join(' ');
        })();
        return (
          <React.Fragment>
            <div key={showDate.toDateString()} class="chat__date">
              {showDatePretty}
            </div>
            <div class="chat__msg-container">
              <div>
                <div class="chat__msg__pic">{(msg.sender == contId) ? avatar : 'U'}</div>
              </div>
              <div key={msg.id.toString()} class={`chat__msg ${(msg.sender == contId) ? 'chat__msg--side1' : 'chat__msg--side2'}`}>
                {msg.text}
              </div>
            </div>
          </React.Fragment>
        );
      }
    });
  
    return (
      <React.Fragment>
        {console.log('rendering ContentChat')}
        <header class="content__header"></header>
        <main class="chat">
          <div class="chat-upper-wrap">
            <div class="chat__contact-wrapper">
              <Contact acc={cont.to_account} online={props.isOnline.has(cont.to_account.id)} type="chat"/>
            </div>
            <div class="chat__messages">
              {chat}
            </div>
          </div>
          <div class="chat-lower-wrap">
            <MsgInput acc={cont.to_account} msgInp={props.msgInp} setMsgInp={props.setMsgInp} clientWs={props.clientWs} />
          </div>
        </main>
      </React.Fragment>
    );
}


export default ContentChat;
