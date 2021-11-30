import React from 'react';


function ContentDMContact(props) {
  // props - acc: Account, online: Boolean
  const acc = props.acc;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}


export default ContentDMContact;
