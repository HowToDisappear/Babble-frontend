import Cookies from 'js-cookie';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../../../App.js';

import ModalChangePassword from '../../modals/ModalChangePassword.js';
import ModalChangeEmail from '../../modals/ModalChangeEmail.js';
import ModalDeleteAccount from '../../modals/ModalDeleteAccount.js';


function Account(props) {
    const [showModal, setShowModal] = useState(null);

    let modal;
    switch (showModal) {
        case 'ChangePassword':
            modal = <ModalChangePassword
            setShowModal={setShowModal}
            setNotification={props.setNotification} />;
            break;
        case 'ChangeEmail':
            modal = <ModalChangeEmail
            setShowModal={setShowModal}
            setNotification={props.setNotification} />;
            break;
        case 'DeleteAccount':
            modal = <ModalDeleteAccount
            setShowModal={setShowModal} />;
            break;
        default:
            modal = null;
    }

    return (
        <div class="account">
            <div class="account-title">Account</div>
            <div class="account-subtitle">Manage your Babble account</div>
            <div class="separator"></div>

            <div class="account-item">
                <div class="account-item__name">Email</div>
                <div class="account-item__value">{props.user.user.email}</div>
                <div
                class="account-item__btn"
                onClick={() => setShowModal('ChangeEmail')}
                >Change</div>
            </div>
            <div class="account-item">
                <div class="account-item__name">Password</div>
                <div
                class="account-item__btn"
                onClick={() => setShowModal('ChangePassword')}
                >Change</div>
            </div>
            <div class="account-delete">
                <button
                type="button"
                class="account-delete__btn"
                onClick={() => setShowModal('DeleteAccount')}
                >
                    <span class="account-delete__btn-symb">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 2C5 0.89543 5.89543 0 7 0H13C14.1046 0 15 0.895431 15 2V4H16.9897C16.9959 3.99994 17.0021 3.99994 17.0083 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H17.9311L17.0638 18.1425C16.989 19.1891 16.1182 20 15.0689 20H4.93112C3.88184 20 3.01096 19.1891 2.9362 18.1425L2.06888 6H1C0.447715 6 0 5.55228 0 5C0 4.44772 0.447715 4 1 4H2.99174C2.99795 3.99994 3.00414 3.99994 3.01032 4H5V2ZM7 4H13V2H7V4ZM4.07398 6L4.93112 18H15.0689L15.926 6H4.07398ZM8 8C8.55228 8 9 8.44772 9 9V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V9C7 8.44772 7.44772 8 8 8ZM12 8C12.5523 8 13 8.44772 13 9V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V9C11 8.44772 11.4477 8 12 8Z" fill="#333738"/>
                        </svg>
                    </span>
                    <span>Delete account</span>
                </button>
            </div>
            {showModal ? <div>{modal}</div> : null}
        </div>
    );
}


export default Account;
