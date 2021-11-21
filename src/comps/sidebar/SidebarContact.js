import Cookies from 'js-cookie';
import React, { useState, useEffect, useRef } from 'react';
import { Route, Redirect } from "react-router-dom";
import ModalConfirmation from '../modals/ModalConfirmation';


function SidebarContact(props) {
    // Account obj: acc
    // Boolean: online
    // Number: unread
    const [showModal, setShowModal] = useState(null);

    function deleteChat() {
      let url = 'http://' + window.location.host + `/api/accounts/contacts/${props.acc.id}`;
      let headers = new Headers();
      headers.append('X-CSRFToken', Cookies.get('csrftoken'));
      
      fetch(url, {
          method: 'delete',
          headers: headers,
          credentials: 'include',
      })
      .then((resp) => {
        if (resp.ok) {
          props.clientWs.current.send(JSON.stringify({
            'type': 'update',
            'structure': 'dm',
            'id': props.acc.id
          }));
        } else {
          throw new Error(`HTTP error status: ${resp.status}`);
        }
      })
      .catch((err) => console.log(err));
    }

    return (
      <div class="sidebar__contact">
        <div class="sidebar__contact__avatar">
          {props.acc.image
          ? <img class="sidebar__contact__pic" src={props.acc.image} />
          : <div class="sidebar__contact__pic">{props.acc.username[0]}</div>}
          <div class={`sidebar__contact__online ${props.online ? "" : "display-none"}`}></div>
        </div>
        <div class="sidebar__contact__name">
          {props.acc.username}
        </div>
        <div class={`sidebar__contact__unread${props.unread ? "" : " display-none"}`}>
          {props.unread}
        </div>

        <div class="sidebar__item-extra-cross" onClick={(evt) => {
            setShowModal(true);
            evt.preventDefault();
            evt.stopPropagation();
        }}>
            <CrossSymb />
        </div>

        {showModal
        ? <ModalConfirmation
        text={"Delete messages with"}
        name={props.acc.username}
        btn={"Delete"}
        notification={"Messages deleted"}
        setShowModal={setShowModal}
        callback={deleteChat}
        />
        : null}
      </div>
    );
}


function CrossSymb() {
  return (
    <React.Fragment>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#828a8ea8"/>
        </svg>
    </React.Fragment>
  );
}


export default SidebarContact;
