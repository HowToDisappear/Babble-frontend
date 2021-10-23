import React, { useEffect, useState, useRef } from 'react';


function MsgInput(props) {
    // const txtAr = useRef(null);
    const [ht, setHt] = useState(null);
    const [resize, setResize] = useState(-1);
    const txtAr = props.txtAr;
    const msgInpKey = (props.type === 'dm')
    ? `dm:${props.accId}`
    : `gm:${props.groupId}:${props.topicId}`;
    
    function msgSubmit() {
      if (props.type === 'dm') {
        props.clientWs.current.send(JSON.stringify({
          'type': 'direct.message',
          'account': props.accId,
          'message': props.msgInp.get(msgInpKey),
        }));  
      } else if (props.type === 'gm') {
        props.clientWs.current.send(JSON.stringify({
          'type': 'group.message',
          'group': props.groupId,
          'topic': props.topicId,
          'message': props.msgInp.get(msgInpKey),
        }));  
      }
      props.setMsgInp(() => {
        let m = new Map(props.msgInp);
        m.set(msgInpKey, '');
        return m;
      });
    }

    let keyStore = new Set();
    let inp = (
      <textarea
      class="chat__msg-input__textarea"
      spellCheck="true"
      autoCorrect="off"
      rows="1"
      placeholder={`Message ${props.name}...`}
      value={props.msgInp.has(msgInpKey) ? props.msgInp.get(msgInpKey) : ''}
      onChange={(evt) => {
        setHt(null);
        props.setMsgInp(() => {
          let m = new Map(props.msgInp);
          m.set(msgInpKey, evt.target.value);
          return m;
        });
      }}
      onKeyDown={(evt) => {
        keyStore.add(evt.key);
        if (keyStore.has('Enter') && !keyStore.has('Shift')) {
          evt.preventDefault();
          msgSubmit();
        }
      }}
      onKeyUp={(evt) => keyStore.delete(evt.key)}
      ref={txtAr}
      style={{height: `${ht ? `${ht}px` : 'auto'}`}}
      ></textarea>
    );
  
    useEffect(() => {
      setHt(null);
      setResize(resize*(-1));
    }, [props.acc]);
    useEffect(() => {
      setHt(txtAr.current.scrollHeight);
    }, [resize]);
  
    useEffect(() => {
      setHt(txtAr.current.scrollHeight);
    }, [props.msgInp]);
  
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
      <div class="chat__msg-input">
      {console.log('rendering MsgInput')}
        {inp}
        <div class="chat__msg-input__btns">
          <div class="chat__msg-input__btn" onClick={() => msgSubmit()}>
            {props.msgInp.get(msgInpKey) ? btnAct : btn}
          </div>
        </div>
      </div>
    );
}


export default MsgInput;
