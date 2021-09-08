import React, { useEffect, useState, useRef } from 'react';



function ContentContacts(props) {
    const contNames = props.contacts.map(cont =>
      <a class="contact-link">
        <div class="contact-container">
          {cont.to_account.user.first_name} 
          {cont.to_account.user.last_name}
        </div>
      </a>
    );
    
    return (
      <React.Fragment>
        <header class="content__header">
          <div class="nav-flexible">
            <div class="flex-item">Add contact</div>
            <div class="flex-item">All</div>
            <div class="flex-item">Online</div>
            <div class="flex-item">Pending</div>
            <div class="flex-item">Blocked</div>
          </div>
          <div class="nav-fixed">
            <div class="flex-item">extra1</div>
            <div class="flex-item">extra2</div>
            <div class="flex-item">extra3</div>
          </div>
        </header>
        <main class="content__main">
          <div class="content__main__contacts">
            {contNames}
          </div>
        </main>
      </React.Fragment>
    );
}


export default ContentContacts;
