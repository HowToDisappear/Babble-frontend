import { findAllByTestId } from '@testing-library/dom';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";

import Contact from './../Contact.js';
import MsgInput from './MsgInput.js';


function ContentChat(props) {
    // props - contacts: Array of Contact(s), isOnline: Set (of acc ids), chats, clientWs
    // const [msgInp, setMsgInp] = useState("");
    let {contId} = useParams();
    contId = parseInt(contId);

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

    if (props.unreadMsg.get(contId)) {
      props.setChats((prevState) => {
        let copy = props.chatsCopy(prevState);
        if (copy[contId]) {
          for (const msg of copy[contId]) {
            if (msg.sender === contId && !msg.read) {
              msg.read = true;
            }
          }
        }
        console.log('updating unread messages');
        props.updateUnread(copy);
        return copy;
      });
      props.clientWs.current.send(JSON.stringify({
        'type': 'chat.read',
        'account': contId,
      }));
    }
    
    console.log(props.chats);
    var chat = props.chats[contId];
    for (let msg of chat) {
      msg.timestamp = new Date(msg.timestamp);
    }

    chat = chat.sort((el1, el2) => {
      return el1.timestamp - el2.timestamp;
    });

    console.log('redefining initial dates now');
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let showDate = new Date(today);
    let showTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
    let dateBar = null;
    const HOUR = 1000 * 60 * 60;
    const MINUTE = 1000 * 60;
    let prevSender = null;
    
    chat = chat.map((msg) => {
      let newBar = false;
      const msgDate = new Date(msg.timestamp.getFullYear(), msg.timestamp.getMonth(), msg.timestamp.getDate());
      const msgTime = new Date(msg.timestamp.getFullYear(), msg.timestamp.getMonth(), msg.timestamp.getDate(), msg.timestamp.getHours(), msg.timestamp.getMinutes());
      const otherDayBar = ( msgDate.getTime() !== today.getTime() && msgDate.getTime() !== showDate.getTime() );
      const todayBar = ( msgDate.getTime() === today.getTime() && showTime.getTime() !== msgTime.getTime() );
      if (otherDayBar) {
        showDate = msgDate;
        dateBar = (() => {
          let arr = showDate.toDateString().split(' ').slice(1,);
          return [arr[1], arr[0], arr[2]].join(' ');
        })();
      } else if (todayBar) {
        showTime = msgTime;
        let hours = Math.floor((showTime - today) / HOUR);
        let minutes = Math.floor( ((showTime - today) % HOUR) / MINUTE );
        dateBar = `Today, ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`;
      }
      let newSender = (prevSender !== msg.sender);
      prevSender = msg.sender;

      return (
        <React.Fragment>
          <div key={showDate.toDateString()} class={`chat__date${(otherDayBar || todayBar ) ? "" : " display-none"}`}>
            <div class={`chat__date__line${newBar ? '' : ' display-none'}`}></div>
            <div class={`chat__date__new${newBar ? '' : ' display-none'}`}>New</div>
            <div class="chat__date__date-wrapper">
              <span class={`chat__date__date${newBar ? ' chat__date__date--orange' : ''}`}>{dateBar}</span>
            </div>
          </div>
          <div class="chat__msg-container">
            <div class="chat__msg__pic-wrapper">
              <div class={`chat__msg__pic${newSender ? "" : " display-none"}`}>{(msg.sender == contId) ? avatar : 'U'}</div>
            </div>
            <div key={msg.id.toString()} class={`chat__msg ${(msg.sender == contId) ? 'chat__msg--side1' : 'chat__msg--side2'}`}>
              {msg.text}
            </div>
          </div>
        </React.Fragment>
      );
    });
  
    return (
      <React.Fragment>
        {console.log('rendering ContentChat')}
        <header class="content__header"></header>
        <main class="chat">
          <div class="chat-upper-wrap" >
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
