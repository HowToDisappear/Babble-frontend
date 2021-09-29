import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  useRouteMatch,
  useParams
} from "react-router-dom";
import './App.css';

import Signup from './comps/auth/Signup.js';
import Signin from './comps/auth/Signin.js';
import Sidebar from './comps/sidebar/Sidebar.js';
import Content from './comps/content/Content.js';


const UserContext = React.createContext({
  user: null,
  setUser: () => {}
});

export {UserContext};



// function App() {
//   const inp = useRef(null);
//   const [pic, setPic] = useState(null);

//   return (
//     <div class="test-wrapper">
//       {console.log('rendering in app')}
//       <h2 class="test-title">De Finibus Bonorum et Malorum</h2>
//       <p class="test-text">
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//       </p>
//       <div class="test-avatar">
//         <div class="test-avatar-title"></div>
//         <div class="test-avatar-pic"></div>
//         <div class="test-avatar-buttons">
//           <input
//           type="file"
//           accept="image/*"
//           ref={inp}
//           onChange={() => setPic(inp.current.files[0])}
//           />
//         </div>
//         {pic ? <Avatar blob={pic} setBlob={setPic} /> : <div>Lorem ipsum dolor sit amet</div>}
//       </div>
//     </div>
//   );
// }







function App() {
  const [user, setUser] = useState(null);
  // user is one of: null (in process), User (logged in), false (not logged in)
  const value = { user, setUser };
  
  useEffect(() => {
    console.log('checking whether singed in');
    fetch('http://' + window.location.host + '/api/accounts/account')
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        setUser(false);
      }
    })
    .then((json) => {
      setUser(json);
    });
  }, []);

  if (user === null) {
    console.log('loading..');
    return 'Loading...';
  }
  
  return (
    <UserContext.Provider value={value}>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/" render={() => {
          return (user
            ? <Container />
            : <Signin />)
        }} />
      </Switch>
    </UserContext.Provider>
  );
}



function Container(props) {
  const [contacts, setContacts] = useState(null);
  const [updCont, setUpdCont] = useState(-1);
  const clientWs = useRef(null);
  const [isOnline, setIsOnline] = useState(new Set());
  const [chats, setChats] = useState(null);
  const [unreadMsg, setUnreadMsg] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // getting contacts from db
    console.log('fetching contacts');
    fetch("http://127.0.0.1:8000/api/accounts/contacts")
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`HTTP error status: ${resp.status}`);
      }
      return resp.json();
    })
    .then(json => {
      console.log('setting contacts');
      setContacts(json.contact_list);
    });
  }, [updCont]);

  useEffect(() => {
    // getting chats from db
    console.log('fetching chats');
    fetch("http://127.0.0.1:8000/api/chats/")
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`HTTP error status: ${resp.status}`);
      }
      return resp.json();
    })
    .then(json => {
      console.log('setting chats');
      setChats(json);
      console.log('updating unread');
      updateUnread(json);
    });
  }, []);

  function updateUnread(updatedChats) {
    const unread = new Map();
    for (const cont in updatedChats) {
      if (updatedChats[cont]) {
        let i = 0;
        for (const msg of updatedChats[cont]) {
          if (!msg.read && msg.sender !== user.id) {
            i++;
          }
        }
        unread.set(parseInt(cont), i);
      }
    }
    console.log('updating unread messages');
    setUnreadMsg(unread);
  }

  function chatsCopy(prevChats) {
    var copy = {};
    for (const accId in prevChats) {
      copy[accId] = [];
      if (prevChats[accId]) {
        for (const msg of prevChats[accId]) {
          copy[accId].push({...msg});
        }
      }
    }
    return copy;
  }

  useEffect(() => {
    // creating websocket and defining handlers for messages
    clientWs.current = new WebSocket(
      'ws://'
      + window.location.host
      + '/ws/client/'
    );
    clientWs.current.onopen = () => console.log("client ws opened");
    clientWs.current.onclose = () => console.log("client ws closed");
    clientWs.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('logging message data:');
      console.log(data);

      if (data.type === 'status.message') {
        if (data.content.status === 'online') {
          console.log("in online clause update:");
          setIsOnline(() => {
            let copy = new Set(isOnline);
            copy.add(parseInt(data.content.account));
            return copy;
          });
        } else if (data.content.status === 'offline') {
          console.log("in offline clause update:");
          setIsOnline(() => {
            let copy = new Set(isOnline);
            copy.delete(parseInt(data.content.account));
            return copy;
          });
        } else {
          console.log('wrong status!');
        }
      } else if (data.type === 'chat.message') {
        setChats((prevState) => {
          let copy = chatsCopy(prevState);
          console.log('returning copy');
          console.log(copy);
          if (user.id === data.content.sender) {
            copy[data.content.recipient].push({...data.content});
          } else {
            copy[data.content.sender].push({...data.content});
            console.log('updating unread messages');
            updateUnread(copy);  
          }
          console.log('returning updated copy');
          console.log(copy);
          return copy;
        });
      }
    };
  }, []);

  if (contacts === null || clientWs === null || chats === null || unreadMsg === null) {
    return <div></div>;
  }

  return (
    <div class="container">
      {console.log("rendering in container")}
      <Sidebar
      contacts={contacts}
      isOnline={isOnline}
      unreadMsg={unreadMsg}
      />
      <Content
      contacts={contacts}
      isOnline={isOnline}
      chats={chats}
      setChats={setChats}
      chatsCopy={chatsCopy}
      unreadMsg={unreadMsg}
      updateUnread={updateUnread}
      clientWs={clientWs} />
    </div>
  );
}


export default App;
