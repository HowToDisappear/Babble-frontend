import Cookies from 'js-cookie';
import React, { useState } from 'react';

import PasswSymb from '../auth/PasswSymb.js';


function ModalChangeEmail(props) {
    // callback func: setShowModal
    let top = window.innerHeight/2 - 320/2;
    let left = window.innerWidth/2 - 360/2;
    const [currPassw, setCurrPassw] = useState(null);
    const [currPasswShow, setCurrPasswShow] = useState(false);
    const [newEmail, setNewEmail] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSave() {
        if (isSending) {
            return null;
        }
        setIsSending(true);
        let resp = await doReq();
        if (!resp.ok) {
            setErrorMsg("Password provided isn't correct");
            setIsSending(false);
        } else {
            props.setShowModal(null);
            props.setNotification({
                'text': 'Verification letter has been sent to the new email address',
                'color': '#333738',
                'time': 6000
            });
        }
    }

    async function doReq() {
        let url = 'http://' + window.location.host + '/api/accounts/account';
        let headers = new Headers();
        headers.append('X-CSRFToken', Cookies.get('csrftoken'));

        let form = new FormData();
        form.set('current_password', currPassw);
        form.set('new_email', newEmail);
        
        let resp = await fetch(url, {
            method: 'put',
            headers: headers,
            body: form,
            credentials: 'include',
        });
        return resp;
    }

    return (
        <div
        class="modal-change-pass-wrapper"
        onClick={(evt) => {
            if (!evt.target.closest('.modal-change-pass')) {
                props.setShowModal(null);
            }
        }}>

            <div
            class="modal-change-pass"
            style={{
                top: `${top}px`,
                left: `${left}px`,
                }}>

                <div class="modal-change-pass__header">
                    <div class="modal-change-pass__header__title">Change email</div>
                    <div
                    class="modal-change-pass__header__close"
                    onClick={() => props.setShowModal(null)}
                    >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.45873 0.397368L7.53553 0.464489C7.80402 0.732974 7.82639 1.15437 7.60266 1.44835L7.53553 1.52515L5.06066 4.00002L7.53553 6.4749C7.80402 6.74338 7.82639 7.16478 7.60266 7.45875L7.53553 7.53556C7.26705 7.80404 6.84565 7.82642 6.55168 7.60268L6.47487 7.53556L4 5.06068L1.52513 7.53556C1.25664 7.80404 0.835241 7.82642 0.54127 7.60268L0.464466 7.53556C0.195981 7.26707 0.173607 6.84567 0.397345 6.5517L0.464466 6.4749L2.93934 4.00002L0.464466 1.52515C0.195981 1.25666 0.173607 0.835264 0.397345 0.541293L0.464466 0.464489C0.732952 0.196003 1.15435 0.17363 1.44832 0.397367L1.52513 0.464489L4 2.93936L6.47487 0.464489C6.74336 0.196003 7.16476 0.17363 7.45873 0.397368L7.53553 0.464489L7.45873 0.397368Z" fill="#828A8E"/>
                        </svg>
                    </div>
                </div>
                <div class="modal-change-pass__info">
                    <span>Verification letter will be sent to the new email address</span>
                </div>
                <form>
                    <ul>
                        <li>
                            <div class="modal-change-pass-inp">
                                <span>
                                    <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.83562 0.00531769L5 0C6.32548 0 7.41004 1.03154 7.49468 2.33562L7.5 2.5V3.5H8.5C9.32843 3.5 10 4.17157 10 5V11C10 11.8284 9.32843 12.5 8.5 12.5H1.5C0.671573 12.5 0 11.8284 0 11V5C0 4.17157 0.671573 3.5 1.5 3.5H2.5V2.5C2.5 1.17452 3.53154 0.0899613 4.83562 0.00531769ZM8.5 4.5H1.5C1.22386 4.5 1 4.72386 1 5V11C1 11.2761 1.22386 11.5 1.5 11.5H8.5C8.77614 11.5 9 11.2761 9 11V5C9 4.72386 8.77614 4.5 8.5 4.5ZM5 7C5.55228 7 6 7.44772 6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7ZM5.14446 1.00687L5 1C4.2203 1 3.57955 1.59489 3.50687 2.35554L3.5 2.5V3.5H6.5V2.5C6.5 1.7203 5.90511 1.07955 5.14446 1.00687Z" fill="#828A8E"/>
                                    </svg>
                                </span>
                                <input type={currPasswShow ? "text" : "password"} value={currPassw} placeholder="Current password" onChange={(evt) => setCurrPassw(evt.target.value)} />
                                <div class="passw-symb" onClick={() => setCurrPasswShow(prevState => !prevState)}>
                                    <PasswSymb show={currPasswShow}/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="modal-change-pass-inp">
                                <span>
                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 3.53807V8.5C0 9.60457 0.895431 10.5 2 10.5H10C11.1046 10.5 12 9.60457 12 8.5V2.5C12 1.39543 11.1046 0.5 10 0.5H2C0.895431 0.5 0 1.39543 0 2.5V3.53807C0 3.53804 0 3.53809 0 3.53807ZM2 1.5H10C10.5523 1.5 11 1.94772 11 2.5V3.23987L6.0001 5.93212L1 3.23976V2.5C1 1.94772 1.44772 1.5 2 1.5ZM1 4.37552L5.76305 6.94024C5.91104 7.01992 6.08916 7.01992 6.23715 6.94024L11 4.37562V8.5C11 9.05229 10.5523 9.5 10 9.5H2C1.44772 9.5 1 9.05228 1 8.5V4.37552Z" fill="#828A8E"/>
                                    </svg>
                                </span>
                                <input type="email" value={newEmail} placeholder="New email" onChange={(evt) => setNewEmail(evt.target.value)} />
                            </div>
                        </li>
                        <li>
                            <div class="modal-change-pass__error">{errorMsg}</div>
                        </li>
                        <li>
                            <button
                            class="modal-change-pass__btn"
                            type="button"
                            disabled={![currPassw, newEmail].every(el => el)}
                            onClick={() => {
                                handleSave();
                            }}
                            >Save</button>
                        </li>
                    </ul>
                </form>


            </div>
            
        </div>
    );
}



export default ModalChangeEmail;
