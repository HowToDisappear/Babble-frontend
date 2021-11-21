import Cookies from 'js-cookie';
import React, { useState, useEffect, useRef } from 'react';


function ModalUserInvite(props) {
  // Account obj: contact
  // Callback: setShowModal
  // Callback: setNotification
  // DOMRect: rect

  const acc = props.contact;
  const MODAL_HEIGHT = 300;

  let top = Math.min(props.rect.top, window.innerHeight - MODAL_HEIGHT);
  let left = props.rect.right + 4;

  function invite() {
    let url = 'http://' + window.location.host + `/api/groups/${props.id}`;
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    
    let form = new FormData();
    form.set('action', 'add_member');
    form.set('account', acc.id);

    fetch(url, {
        method: 'post',
        headers: headers,
        credentials: 'include',
        body: form
    })
    .then((resp) => {
      if (resp.ok) {
        props.clientWs.current.send(JSON.stringify({
          'type': 'update',
          'structure': 'gm',
          'id': props.id
        }));
      } else {
        throw new Error(`HTTP error status: ${resp.status}`);
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    <div
    class="modal-contact-wrapper"
    onClick={(evt) => {
      if (!evt.target.closest('.modal-contact')) {
          props.setShowModal(null);
          evt.preventDefault();
          evt.stopPropagation();
        }
      }}
    >
      <div class="modal-contact"
      style={{
        top: `${top}px`,
        left: `${left}px`
      }}>

        <div class="modal-contact__header">
          <div class="modal-contact__header__title"></div>
          <div class="modal-contact__header__close" onClick={(evt) => {
            props.setShowModal(null);
            evt.preventDefault();
            evt.stopPropagation();
          }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.45873 0.397368L7.53553 0.464489C7.80402 0.732974 7.82639 1.15437 7.60266 1.44835L7.53553 1.52515L5.06066 4.00002L7.53553 6.4749C7.80402 6.74338 7.82639 7.16478 7.60266 7.45875L7.53553 7.53556C7.26705 7.80404 6.84565 7.82642 6.55168 7.60268L6.47487 7.53556L4 5.06068L1.52513 7.53556C1.25664 7.80404 0.835241 7.82642 0.54127 7.60268L0.464466 7.53556C0.195981 7.26707 0.173607 6.84567 0.397345 6.5517L0.464466 6.4749L2.93934 4.00002L0.464466 1.52515C0.195981 1.25666 0.173607 0.835264 0.397345 0.541293L0.464466 0.464489C0.732952 0.196003 1.15435 0.17363 1.44832 0.397367L1.52513 0.464489L4 2.93936L6.47487 0.464489C6.74336 0.196003 7.16476 0.17363 7.45873 0.397368L7.53553 0.464489L7.45873 0.397368Z" fill="#828A8E"/>
            </svg>
          </div>
        </div>

        <div class="modal-contact__avatar-wrapper">
          <div class="modal-contact__avatar">
            {acc.image
            ? <img class="modal-contact__avatar__pic" src={acc.image} />
            : <div class="modal-contact__avatar__pic">{acc.username[0]}</div>}
          </div>
        </div>

        <div class="modal-contact__username">{acc.username}</div>
        <div class="modal-contact__id">{`id: ${btoa(acc.id)}`}</div>

        <button
        class="modal-contact__invite-btn"
        onClick={(evt) => {
          invite();
          props.setShowModal(null);
          props.setNotification({
            'text': `Invite to ${acc.username} has been sent`,
            'color': '#333738',
            'time': 4000
          });
          evt.preventDefault();
          evt.stopPropagation();
        }}
        >Invite</button>

        <button
        class="modal-contact__cancel-btn"
        onClick={(evt) => {
          props.setShowModal(null);
          evt.preventDefault();
          evt.stopPropagation();
        }}>Cancel</button>

      </div>
    </div>
  );
}


export default ModalUserInvite;
