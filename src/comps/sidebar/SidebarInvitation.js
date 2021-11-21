import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';


function SidebarInvitation(props) {

  function sendReq(action) {
    let url = 'http://' + window.location.host + `/api/groups/${props.group.id}`;
    let headers = new Headers();
    headers.append('X-CSRFToken', Cookies.get('csrftoken'));
    
    let form = new FormData();
    form.set('action', action);

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
          'id': props.group.id
        }));
      } else {
        throw new Error(`HTTP error status: ${resp.status}`);
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    <div class="sidebar-invitation">
      <div class="sidebar-invitation-text">{props.group.name}</div>
      <div class="sidebar-invitation-btns">
        <span
        class="sidebar-invitation-btn"
        onClick={() => sendReq('change_status')}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6644 0.252601C18.0772 0.619519 18.1143 1.25159 17.7474 1.66437L7.08075 13.6644C6.89099 13.8779 6.61898 14 6.33334 14C6.04771 14 5.7757 13.8779 5.58593 13.6644L0.252601 7.66437C-0.114317 7.25159 -0.077136 6.61952 0.335647 6.2526C0.74843 5.88568 1.3805 5.92286 1.74742 6.33565L6.33334 11.4948L16.2526 0.335647C16.6195 -0.077136 17.2516 -0.114317 17.6644 0.252601Z" fill="#828a8ea8"/>
          </svg>
        </span>
        <span
        class="sidebar-invitation-btn"
        onClick={() => sendReq('remove_member')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#828a8ea8"/>
          </svg>
        </span>
      </div>
    </div>
  );
}


export default SidebarInvitation;
