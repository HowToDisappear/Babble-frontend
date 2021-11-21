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


const GROUP = [
  {
      "id": 1,
      "name": "mygroup",
      "topic_set": [
          {
              "title": "General",
              "groupmessage_set": []
          },
          {
              "title": "hello world",
              "groupmessage_set": []
          },
          {
              "title": "random talks",
              "groupmessage_set": []
          }
      ],
      "membership_set": [
          {
              "account": {
                  "id": 1,
                  "user": {
                      "id": 2,
                      "username": "john@mail.com",
                      "email": "john@mail.com",
                      "first_name": "",
                      "last_name": ""
                  },
                  "username": "john",
                  "image": null
              },
              "status": 2
          }
      ]
  },
  {
      "id": 2,
      "name": "othergroup",
      "topic_set": [
          {
              "title": "green",
              "groupmessage_set": [
                  {
                      "id": 1,
                      "sender": 2,
                      "topic": 4,
                      "timestamp": "2021-10-03T08:15:04.895903Z",
                      "text": "hello everyone!",
                      "read_status": []
                  },
                  {
                      "id": 2,
                      "sender": 4,
                      "topic": 4,
                      "timestamp": "2021-10-03T08:16:08.059080Z",
                      "text": "hi dawg how are you?",
                      "read_status": []
                  },
                  {
                      "id": 3,
                      "sender": 1,
                      "topic": 4,
                      "timestamp": "2021-10-03T08:16:31.034244Z",
                      "text": "how are you guys?",
                      "read_status": []
                  }
              ]
          },
          {
              "title": "red",
              "groupmessage_set": [
                  {
                      "id": 4,
                      "sender": 2,
                      "topic": 5,
                      "timestamp": "2021-10-03T08:16:58.066105Z",
                      "text": "what a lovely day",
                      "read_status": []
                  },
                  {
                      "id": 5,
                      "sender": 1,
                      "topic": 5,
                      "timestamp": "2021-10-03T08:17:15.966892Z",
                      "text": "yeah sure",
                      "read_status": []
                  },
                  {
                      "id": 6,
                      "sender": 4,
                      "topic": 5,
                      "timestamp": "2021-10-03T08:17:31.587814Z",
                      "text": "sun is shining!",
                      "read_status": []
                  }
              ]
          },
          {
              "title": "blue",
              "groupmessage_set": []
          }
      ],
      "membership_set": [
          {
              "account": {
                  "id": 1,
                  "user": {
                      "id": 2,
                      "username": "john@mail.com",
                      "email": "john@mail.com",
                      "first_name": "",
                      "last_name": ""
                  },
                  "username": "john",
                  "image": null
              },
              "status": 2
          },
          {
              "account": {
                  "id": 2,
                  "user": {
                      "id": 3,
                      "username": "gill@mail.com",
                      "email": "gill@mail.com",
                      "first_name": "",
                      "last_name": ""
                  },
                  "username": "gill",
                  "image": null
              },
              "status": 1
          },
          {
              "account": {
                  "id": 4,
                  "user": {
                      "id": 5,
                      "username": "mike@mail.com",
                      "email": "mike@mail.com",
                      "first_name": "",
                      "last_name": ""
                  },
                  "username": "mike",
                  "image": null
              },
              "status": 1
          }
      ]
  },
  {
      "id": 3,
      "name": "anothergroup",
      "topic_set": [
          {
              "title": "Velvet Underground",
              "groupmessage_set": [
                  {
                      "id": 7,
                      "sender": 4,
                      "topic": 7,
                      "timestamp": "2021-10-03T08:19:43.013190Z",
                      "text": "hey guys whats you favourite track?",
                      "read_status": []
                  },
                  {
                      "id": 8,
                      "sender": 2,
                      "topic": 7,
                      "timestamp": "2021-10-03T08:20:08.440525Z",
                      "text": "I think Heroine is the best!",
                      "read_status": []
                  }
              ]
          }
      ],
      "membership_set": [
          {
              "account": {
                  "id": 1,
                  "user": {
                      "id": 2,
                      "username": "john@mail.com",
                      "email": "john@mail.com",
                      "first_name": "",
                      "last_name": ""
                  },
                  "username": "john",
                  "image": null
              },
              "status": 1
          },
          {
              "account": {
                  "id": 2,
                  "user": {
                      "id": 3,
                      "username": "gill@mail.com",
                      "email": "gill@mail.com",
                      "first_name": "",
                      "last_name": ""
                  },
                  "username": "gill",
                  "image": null
              },
              "status": 1
          },
          {
              "account": {
                  "id": 4,
                  "user": {
                      "id": 5,
                      "username": "mike@mail.com",
                      "email": "mike@mail.com",
                      "first_name": "",
                      "last_name": ""
                  },
                  "username": "mike",
                  "image": null
              },
              "status": 2
          }
      ]
  }
]


// function App() {
//   return (
//     <div class="container">
//     <Sidebar />
//     <Content />
//   </div>
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
  const [directMessages, setDirectMessages] = useState(null);
  const [groupMessages, setGroupMessages] = useState(null);
  const [isOnline, setIsOnline] = useState(new Set());
  const clientWs = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const [updDM, setUpdDM] = useState(1);
  const [updGM, setUpdGM] = useState(1);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // getting direct messages from db
    console.log('fetching direct messages');
    fetch("http://127.0.0.1:8000/api/chats/dm")
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`HTTP error status: ${resp.status}`);
      }
      return resp.json();
    })
    .then(json => {
      console.log('---------------------> logging direct messages');
      console.log(json);
      setDirectMessages(json);
    });
  }, [updDM]);

  useEffect(() => {
    // getting groups from db
    console.log('fetching groups');
    fetch("http://127.0.0.1:8000/api/groups/")
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`HTTP error status: ${resp.status}`);
      }
      return resp.json();
    })
    .then(json => {
      console.log(json);
      console.log('setting group chats');
      setGroupMessages(json);
    });
  }, [updGM]);

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
          setIsOnline((prevState) => {
            let copy = new Set(prevState);
            copy.add(parseInt(data.content.account));
            return copy;
          });
        } else if (data.content.status === 'offline') {
          setIsOnline((prevState) => {
            let copy = new Set(prevState);
            copy.delete(parseInt(data.content.account));
            return copy;
          });
        } else {
          console.log('wrong status!');
        }
      } else if (data.type === 'direct.message') {
        setDirectMessages((prevState) => {
          let copy = prevState.map((acc) => {
            return {
              ...acc,
              'user': {...acc.user},
              'directmessage_set': acc.directmessage_set.map((msg) => {
                return {...msg};
              })
            };
          });
          if (user.id === data.content.sender) {
            for (const acc of copy) {
              if (acc.id === data.content.recipient) {
                acc.directmessage_set.push({...data.content});
                return copy;
              }
            }
          } else {
            for (const acc of copy) {
              if (acc.id === data.content.sender) {
                acc.directmessage_set.push({...data.content});
                return copy;
              }
            }
          }
          return copy;
        });
      } else if (data.type === 'group.message') {
        setGroupMessages((prevState) => {
          let copy = prevState.map((group) => {
            return {
              ...group,
              'topic_set': group.topic_set.map((topic) => {
                return {
                  ...topic,
                  'groupmessage_set': topic.groupmessage_set.map((msg) => {
                    return {...msg}
                  })
                }
              }),
              'membership_set': group.membership_set.map((membership) => {
                return {
                  ...membership,
                  'account': {
                    ...membership.account,
                    'user': {...membership.account.user}
                  }
                }
              })
            }
          });
          for (const group of copy) {
            if (group.id === data.content.recipient) {
              for (const topic of group.topic_set) {
                if (topic.id === data.content.topic) {
                  topic.groupmessage_set.push({...data.content});
                  return copy;
                }
              }
            }
          }
          return copy;
        });
      } else if (data.type === 'update.dm') {
        setUpdDM(prevState => prevState * -1);
      } else if (data.type === 'update.gm') {
        setUpdGM(prevState => prevState * -1);
      }
    };
  }, []);

  if (clientWs === null || directMessages === null || groupMessages === null) {
    return <div></div>;
  }

  return (
    <div class="container">
      {console.log("rendering in container")}
      {notification ? <Notification obj={notification} setNotification={setNotification} /> : null}
      <Sidebar
      setNotification={setNotification}
      clientWs={clientWs}
      user={user}
      directMessages={directMessages}
      groupMessages={groupMessages}
      isOnline={isOnline}
      setUpdGM={setUpdGM}
      />
      <Content
      setNotification={setNotification}
      clientWs={clientWs}
      isOnline={isOnline}
      directMessages={directMessages}
      setDirectMessages={setDirectMessages}
      groupMessages={groupMessages}
      setGroupMessages={setGroupMessages}
      />
    </div>
  );
}



function Notification(props) {
  const box = useRef(null);
  const top = window.innerHeight - 200;
  const left = window.innerWidth/2 - 110;
  setTimeout(() => props.setNotification(null), props.obj.time);
  setTimeout(() => box.current.style = (
    "transform: scale(1);"
    + `color: ${props.obj.color};`
    + `top: ${top}px;`
    + `left: ${left}px;`
  ), 10);
  return (
    <div class="notification-wrapper">
      <div class="notification" ref={box}>
        {props.obj.text}
      </div>
    </div>
  );
}



export default App;
