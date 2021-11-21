import React, { useState, useEffect, useRef } from 'react';


function ModalFindUser(props) {
  // Callback: setShowModal (inp: string)
  // Callback: setContact (inp: Account obj)
  // DOMRect: btnRect
  const [inpId, setInpId] = useState(null);
  const [err, setErr] = useState(null);
  const MODAL_HEIGHT = 187;

  let top = Math.min(props.btnRect.top, window.innerHeight - MODAL_HEIGHT - 12);
  let left = props.btnRect.right + 8;

  function findAccount(inputId) {
    let id = parseInt(atob(inputId));
    if (id) {
      fetch(`http://127.0.0.1:8000/api/accounts/contacts/${id}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((json) => {
        props.setContact(json);
        props.setShowModal('FindUserNext');
      })
      .catch((err) => {
        setErr('Could not find matching account');
      });
    } else {
      setErr('Could not find matching account');
    }
  }

  return (
    <div
    class="modal-new-dm-wrapper"
    onClick={(evt) => {
      if (!evt.target.closest('.modal-new-dm')) {
          props.setShowModal(null);
          evt.preventDefault();
          evt.stopPropagation();
        }
      }}
    >
      <div class="modal-new-dm"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}>

        <div class="modal-new-dm__header">
          <div class="modal-new-dm__header__title">Select a person</div>
          <div class="modal-new-dm__header__close" onClick={() => props.setShowModal(null)}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.45873 0.397368L7.53553 0.464489C7.80402 0.732974 7.82639 1.15437 7.60266 1.44835L7.53553 1.52515L5.06066 4.00002L7.53553 6.4749C7.80402 6.74338 7.82639 7.16478 7.60266 7.45875L7.53553 7.53556C7.26705 7.80404 6.84565 7.82642 6.55168 7.60268L6.47487 7.53556L4 5.06068L1.52513 7.53556C1.25664 7.80404 0.835241 7.82642 0.54127 7.60268L0.464466 7.53556C0.195981 7.26707 0.173607 6.84567 0.397345 6.5517L0.464466 6.4749L2.93934 4.00002L0.464466 1.52515C0.195981 1.25666 0.173607 0.835264 0.397345 0.541293L0.464466 0.464489C0.732952 0.196003 1.15435 0.17363 1.44832 0.397367L1.52513 0.464489L4 2.93936L6.47487 0.464489C6.74336 0.196003 7.16476 0.17363 7.45873 0.397368L7.53553 0.464489L7.45873 0.397368Z" fill="#828A8E"/>
            </svg>
          </div>
        </div>

        <div class="modal-new-dm__input">
          <span class="modal-new-dm__find-symb">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9056 14.3199C11.551 15.3729 9.84871 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#B0B2B3"/>
            </svg>
          </span>
          <input
          type="text"
          placeholder="Type the id of a person"
          value={inpId}
          onChange={(evt) => setInpId(evt.target.value)}
          ></input>
        </div>

        <div class="modal-new-dm__error-wrapper">
          {err ? <div class="modal-new-dm__error">{err}</div> : null}
        </div>

        <button
        disabled={inpId ? false : true}
        class="modal-new-dm__btn-find"
        onClick={() => {
          findAccount(inpId);
        }}
        >Find</button>

      </div>
    </div>
  );
}


export default ModalFindUser;
