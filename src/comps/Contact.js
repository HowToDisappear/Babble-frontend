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
  

  export default Contact;
