import React from 'react';


function Contact(props) {
  // props - acc: Account, online: Boolean, type: 'sidebar' | 'chat' | 'contacts'
  const acc = props.acc;
  // if url for avatar exists put it here, otherwise a first letter
  // const avatar = cont.user.avatar ? <img url="cont.user.avatar" /> : cont.user.first_name[0];
  var outp = null;
  if (props.type === 'sidebar') {
    outp = (
      <div class="sidebar__contact">
        <div class="sidebar__contact__avatar">
          {acc.image
          ? <img class="sidebar__contact__pic" src={acc.image} />
          : <div class="sidebar__contact__pic">{acc.username[0]}</div>}
          <div class={`sidebar__contact__online ${props.online ? "" : "display-none"}`}></div>
        </div>
        <div class="sidebar__contact__name">
          {acc.username}
        </div>
        <div class={`sidebar__contact__unread${props.unread ? "" : " display-none"}`}>
          {props.unread}
        </div>

        <CrossSymb />

      </div>
    );
  } else if (props.type === 'chat') {
    outp = (
      <div class="chat__contact">
        <div class="chat__contact__avatar">
          {acc.image
          ? <img class="chat__contact__pic" src={acc.image} />
          : <div class="chat__contact__pic">{acc.username[0]}</div>}
          <div class={`chat__contact__online ${props.online ? "" : "display-none"}`}></div>
        </div>
        <div class="chat__contact__name">
          {acc.username}
        </div>
      </div>
    );
  } else if (props.type === 'contacts') {
    <div></div>
  }
  return (
    <React.Fragment>
      {outp}
    </React.Fragment>
  );
}


function CrossSymb() {
  return (
    <React.Fragment>
      <div class="sidebar__item-extra-cross">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#828a8ea8"/>
        </svg>
      </div>
    </React.Fragment>
  );
}



export default Contact;
