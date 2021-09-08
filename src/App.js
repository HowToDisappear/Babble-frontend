import React, { useEffect, useState, useRef } from 'react';
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


function App() {
  const [signedIn, setSignedIn] = useState(null);
  // const [signedIn, setSignedIn] = useState(false);
  
  useEffect(() => {
    console.log('checking whether singed in');
    fetch("http://127.0.0.1:8000/api/accounts/account")
    .then((resp) => {
      if (resp.ok) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  }, []);

  if (signedIn === null) {
    return 'Loading...';
  }
  
  return (
    <Switch>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/" render={() => {
        return (signedIn
          ? <Container signedIn={signedIn} />
          : <Signin setSignedIn={setSignedIn} />)
      }} />
    </Switch>
  );
}



const PLUG = {
  "contact_list": [
      {
          "status": 1,
          "to_account": {
              "favcolor": "green",
              "id": 6,
              "user": {
                  "first_name": "Jack",
                  "id": 3,
                  "last_name": "Doe",
                  "username": "jack"
              }
          }
      },
      {
          "status": 1,
          "to_account": {
              "favcolor": null,
              "id": 7,
              "user": {
                  "first_name": "Gill",
                  "id": 5,
                  "last_name": "Doe",
                  "username": "gill"
              }
          }
      },
      {
          "status": 2,
          "to_account": {
              "favcolor": null,
              "id": 8,
              "user": {
                  "first_name": "Jane",
                  "id": 4,
                  "last_name": "Doe",
                  "username": "jane"
              }
          }
      }
  ]
};


const CHATS = {
  "10": [],
  "11": [],
  "12": [],
  "13": [],
  "14": [],
  "6": [
      {
          "id": 6,
          "recipient": 6,
          "sender": 5,
          "text": "Hi Gill!",
          "timestamp": "2021-08-28T08:56:18.108648Z"
      },
      {
          "id": 7,
          "recipient": 6,
          "sender": 5,
          "text": "fancy a cup of coffee?",
          "timestamp": "2021-08-28T08:56:38.286720Z"
      },
      {
          "id": 8,
          "recipient": 5,
          "sender": 6,
          "text": "Hey John",
          "timestamp": "2021-08-28T08:56:54.630331Z"
      },
      {
          "id": 9,
          "recipient": 5,
          "sender": 6,
          "text": "Sorry, I'm too busy,  maybe next time..",
          "timestamp": "2021-08-28T08:57:33.393344Z"
      }
  ],
  "7": [],
  "8": [
      {
          "id": 1,
          "recipient": 8,
          "sender": 5,
          "text": "Hey Mike! How are you?",
          "timestamp": "2021-08-28T08:51:56.650822Z"
      },
      {
          "id": 2,
          "recipient": 5,
          "sender": 8,
          "text": "Hey John, I'm fine, what's up?",
          "timestamp": "2021-08-28T08:52:42.871989Z"
      },
      {
          "id": 3,
          "recipient": 8,
          "sender": 5,
          "text": "I was thinking of going to the seaside, would you like to?",
          "timestamp": "2021-08-28T08:54:16.029249Z"
      },
      {
          "id": 4,
          "recipient": 5,
          "sender": 8,
          "text": "Yep sounds good",
          "timestamp": "2021-08-29T08:54:30.319443Z"
      },
      {
        "id": 5,
        "recipient": 5,
        "sender": 8,
        "text": "Let's aaaaaa go!",
        "timestamp": "2021-08-28T08:54:39.076359Z"
      },
      {
        "id": 6,
        "recipient": 5,
        "sender": 8,
        "text": "Let's qweqew go!",
        "timestamp": "2021-08-30T08:54:39.076359Z"
      },
      {
        "id": 7,
        "recipient": 5,
        "sender": 8,
        "text": "Let's asdasd go!",
        "timestamp": "2021-08-30T08:54:39.076359Z"
      }
  ],
  "9": []
};




function Container(props) {
  const [contacts, setContacts] = useState(null);
  const [updCont, setUpdCont] = useState(-1);
  const clientWs = useRef(null);
  const [isOnline, setIsOnline] = useState(new Set());
  const [chats, setChats] = useState(null);

  console.log('printing user');
  console.log(props.signedIn);
  useEffect(
    () => {
      console.log('fetching contacts');
      fetch("http://127.0.0.1:8000/api/accounts/contacts")
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`HTTP error status: ${resp.status}`);
        }
        return resp.json();
      })
      .then(json => setContacts(json.contact_list));
    },
    [updCont],
  );

  useEffect(
    () => {
      console.log('fetching chats');
      fetch("http://127.0.0.1:8000/api/chats/")
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`HTTP error status: ${resp.status}`);
        }
        return resp.json();
      })
      .then(json => {
        setChats(json);
        console.log(json);
        console.log(chats);
      });
    }, []);

  useEffect(() => {
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
        console.log('doing something for chat.message');
        setChats((prevChats) => {
          var copy = {};
          console.log('returning chats');
          console.log(prevChats);
          for (const acc in prevChats) {
            copy[acc] = [];
            if (prevChats[acc]) {
              for (const msg of prevChats[acc]) {
                copy[acc].push({...msg});
              }
            }
          }
          console.log('returning copy');
          console.log(copy);
          // improve this expression
          if (copy.hasOwnProperty(data.content.sender)) {
            copy[data.content.sender].push({...data.content});
          } else {
            copy[data.content.recipient].push({...data.content});
          }
          console.log('returning updated copy');
          console.log(copy);
          return copy;
        });
      }
    };
  }, []);

  if (contacts === null || clientWs === null || chats === null) {
    return <div></div>;
  }

  return (
    <div class="container">
      {console.log("rendering in container")}
      <Sidebar contacts={contacts} isOnline={isOnline} />
      <Content contacts={contacts} isOnline={isOnline} chats={chats} clientWs={clientWs} />
    </div>
  );
}



export default App;
