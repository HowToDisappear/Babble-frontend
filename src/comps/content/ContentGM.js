import { findAllByTestId } from '@testing-library/dom';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";

import Contact from '../Contact.js';
import MsgInput from './MsgInput.js';
import { UserContext } from '../../App.js';


function ContentGM(props) {
    const { user, setUser } = useContext(UserContext);
    let {groupId, topicId} = useParams();
    groupId = parseInt(groupId);
    topicId = parseInt(topicId);
    const txtAr = useRef(null);
    const bottom = useRef(null);

    useEffect(() => {
      bottom.current.focus();
    });

    console.log('starting -------->');
    let [topicTitle, chat, members] = (() => {
      for (const group of props.groupMessages) {
        console.log(group);
        if (group.id === groupId) {
          for (const topic of group.topic_set) {
            console.log(topic);
            if (topic.id === topicId) {
              console.log(topic.title);
              console.log(topic.groupmessage_set);
              console.log(group.membership_set);              
              return [topic.title, topic.groupmessage_set, group.membership_set];
            }
          }
        }
      }
    })();

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
    let prevSenderId = null;
    
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
      let sender = (() => {
        for (const member of members) {
          if (member.account.id === msg.sender) {
            return member.account;
          }
        }
      })();
      let isNewSender = (prevSenderId !== msg.sender);
      prevSenderId = msg.sender;

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
              <div class={`chat__msg__pic${isNewSender ? "" : " display-none"}`}>
                {sender.image
                ? <img class="chat__msg__pic" src={sender.image} />
                : <div>{sender.username[0]}</div>}
              </div>
            </div>
            <div key={msg.id.toString()} class="chat__msg chat__msg--side1">
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
          <div class="chat-upper-wrap">
            <div class="chat__contact-wrapper">
              {topicTitle}
            </div>
            <div class="chat__messages">
              {chat}
            <input id="chat-bottom" ref={bottom} autoFocus onFocus={() => txtAr.current.focus()} />
            </div>
          </div>
          <div class="chat-lower-wrap">
            <MsgInput
            type={'gm'}
            txtAr={txtAr}
            name={topicTitle}
            groupId={groupId}
            topicId={topicId}
            msgInp={props.msgInp}
            setMsgInp={props.setMsgInp}
            clientWs={props.clientWs}
            />
          </div>
        </main>
      </React.Fragment>
    );
}


export default ContentGM;
