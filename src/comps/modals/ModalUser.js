import Cookies from 'js-cookie';
import React, { useState, useEffect, useRef } from 'react';


function ModalUser(props) {
  // Account obj: contact +
  // Boolean: online +
  // WebSocket: clientWs +
  // Callback: setShowModal (inp: 'redirect' or null) +
  // Callback: setNotification +
  // DOMRect: rect +
  // Boolean: inDM +

  const acc = props.contact;
  const [msgInp, setMsgInp] = useState('');
  const MODAL_HEIGHT = 300;

  let top = Math.min(props.rect.bottom, window.innerHeight - MODAL_HEIGHT);
  let left = props.rect.right;

  async function msgSubmit() {
    if (!props.inDM) {
      let resp = await createContact();
      if (resp.ok) {
        props.clientWs.current.send(JSON.stringify({
          'type': 'direct.message',
          'account': acc.id,
          'message': msgInp,
        }));
        props.clientWs.current.send(JSON.stringify({
          'type': 'update',
          'structure': 'dm',
          'id': acc.id
        }));
      } else {
        throw new Error("Bad request");
      }  
    } else {
      props.clientWs.current.send(JSON.stringify({
        'type': 'direct.message',
        'account': acc.id,
        'message': msgInp,
      }));
    }
    props.setNotification({
      'text': 'Message sent',
      'color': '#333738',
      'time': 4000
    });
    props.setShowModal(null);
  }

  async function createContact() {
    // creates new active contact between user and other account
    let url = 'http://' + window.location.host + '/api/accounts/contacts';
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));

    let form = new FormData();
    form.set('to_account', acc.id);
    form.set('status', '1');
    
    let resp = await fetch(url, {
        method: 'post',
        headers: headers,
        body: form,
        credentials: 'include',
    });
    return resp;
  }

  let btn = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.723623 0.0527896C0.552817 -0.0326133 0.348282 -0.0132657 0.19652 0.10265C0.0447571 0.218565 -0.0277254 0.410803 0.00972625 0.598061L1.4126 5.44777C1.46604 5.63249 1.62067 5.7702 1.81032 5.80196L7.50002 6.75485C7.76798 6.80844 7.76798 7.19155 7.50002 7.24514L1.81032 8.19803C1.62067 8.22979 1.46604 8.3675 1.4126 8.55222L0.00972625 13.4019C-0.0277254 13.5892 0.0447571 13.7814 0.19652 13.8974C0.348282 14.0133 0.552817 14.0326 0.723623 13.9472L13.7236 7.44721C13.893 7.36252 14 7.18939 14 7C14 6.81061 13.893 6.63748 13.7236 6.55279L0.723623 0.0527896Z" fill="#B0B2B3"/>
    </svg>
  );
  let btnAct = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#298FED"/>
      <path d="M9.72362 9.05279C9.55282 8.96739 9.34828 8.98673 9.19652 9.10265C9.04476 9.21857 8.97227 9.4108 9.00973 9.59806L10.4126 14.4478C10.466 14.6325 10.6207 14.7702 10.8103 14.802L16.5 15.7549C16.768 15.8084 16.768 16.1915 16.5 16.2451L10.8103 17.198C10.6207 17.2298 10.466 17.3675 10.4126 17.5522L9.00973 22.4019C8.97227 22.5892 9.04476 22.7814 9.19652 22.8974C9.34828 23.0133 9.55282 23.0326 9.72362 22.9472L22.7236 16.4472C22.893 16.3625 23 16.1894 23 16C23 15.8106 22.893 15.6375 22.7236 15.5528L9.72362 9.05279Z" fill="white"/>
    </svg>
  );

  return (
    <div class="modal-contact-wrapper">
      <div class="modal-contact"
      style={{
        top: `${top}px`,
        left: `${left}px`
      }}>

        <div class="modal-contact__header">
          <div class="modal-contact__header__title"></div>
          <div class="modal-contact__header__close" onClick={(evt) => {
            console.log('**** clicked close modal ****');
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
            <div class={`modal-contact__avatar__online ${props.online ? "" : "display-none"}`}></div>
          </div>
        </div>

        <div class="modal-contact__username">{acc.username}</div>
        <div class="modal-contact__id">{`id: ${btoa(acc.id)}`}</div>
        <div
        class={`modal-contact__input ${props.user.id === acc.id ? "display-none" : ""}`}
        >
          <input
          type="text"
          placeholder={`Message ${acc.username}...`}
          onChange={(evt) => setMsgInp(evt.target.value)}
          value={msgInp}
          ></input>
          <span
          class="modal-contact__input__btn"
          onClick={(evt) => {
            if (msgInp) {
              msgSubmit();
              evt.preventDefault();
              evt.stopPropagation();  
            }
          }}
          >
            {msgInp ? btnAct : btn}
          </span>
        </div>

      </div>
    </div>
  );
}


export default ModalUser;
