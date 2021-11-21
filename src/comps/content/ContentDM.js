import { findAllByTestId } from '@testing-library/dom';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";

import Contact from '../Contact.js';
import MsgInput from './MsgInput.js';
import { UserContext } from '../../App.js';


function ContentDM(props) {
    const { user, setUser } = useContext(UserContext);
    let {contId} = useParams();
    contId = parseInt(contId);
    const txtAr = useRef(null);
    const bottom = useRef(null);

    // useEffect(() => {
    //   bottom.current.focus();
    // });

    // select contact
    const cont = (() => {
      for (const acc of props.directMessages) {
        if (acc.id == contId) {
          return acc;
        }
      }
      return null;
    })();
    if (!cont) {
      return <Redirect to="/" />;
    }

    // retrieve direct messages set
    let chat = cont.hasOwnProperty('directmessage_set')
    ? cont.directmessage_set
    : [];
    
    // check for unread messages
    let unread = (() => {
      for (const msg of chat) {
        if (!msg.read && (msg.recipient === user.id)) {
          return true;
        }
      }
      return false;
    })();

    // if any unread, then set contact's messages read status to true
    if (unread) {
      props.setDirectMessages((prevState) => {
        console.log('*** setting read status')
        // notifying server
        props.clientWs.current.send(JSON.stringify({
          'type': 'chat.read',
          'account': contId,
        }));
        // updating client app messages state
        let updatedArr = prevState.map((acc) => {
          if (acc.id === contId) {
            return {
              ...acc,
              'user': {...acc.user},
              'directmessage_set': acc.directmessage_set.map((msg) => {
                if (msg.sender === contId) {
                  return {
                    ...msg,
                    'read': true
                  };
                } else {
                  return {...msg};
                }
              })
            };  
          } else {
            return {
              ...acc,
              'user': {...acc.user},
              'directmessage_set': acc.directmessage_set.map((msg) => {
                return {...msg};
              })
            };  
          }
        });
        return updatedArr;
      });
    }

    const userAvatar = user.image
    ? <img class="chat__msg__pic" src={user.image}/>
    : <div>{user.username[0]}</div>;
    const contactAvatar = cont.image
    ? <img class="chat__msg__pic" src={cont.image}/>
    : <div>{cont.username[0]}</div>;

    for (let msg of chat) {
      msg.timestamp = new Date(msg.timestamp);
    }
    chat = chat.sort((el1, el2) => {
      return el1.timestamp - el2.timestamp;
    });
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
          <div class="chat__msg">
            <div class="chat__msg__pic-wrapper">
              <div class={`chat__msg__pic${newSender ? "" : " display-none"}`}>
                {msg.sender === user.id
                ? userAvatar
                : contactAvatar}
              </div>
            </div>
            <div class="chat__msg__user">{msg.sender === user.id ? user.username : cont.username}</div>
            <div key={msg.id.toString()} class={`chat__msg__text ${(msg.sender == contId) ? 'chat__msg--side1' : 'chat__msg--side2'}`}>
              {msg.text}
            </div>
          </div>
        </React.Fragment>
      );
    });
  
    return (
      <React.Fragment>
        {console.log('rendering ContentDM')}
        <header class="content__header"></header>
        <main class="chat">
          <div class="chat-upper-wrap">
            <div class="chat__contact-wrapper">
              <Contact acc={cont} online={props.isOnline.has(cont.id)} type="chat"/>
            </div>
            <div class="chat__messages">
              {chat}
            <input id="chat-bottom" ref={bottom} autoFocus onFocus={() => txtAr.current.focus()} />
            </div>
          </div>
          <div class="chat-lower-wrap">
            <MsgInput
            type={'dm'}
            txtAr={txtAr}
            name={cont.username}
            accId={cont.id}
            msgInp={props.msgInp}
            setMsgInp={props.setMsgInp}
            clientWs={props.clientWs}
            />
          </div>
        </main>
      </React.Fragment>
    );
}


export default ContentDM;
