import Cookies from 'js-cookie';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../../../App.js';

import ModalChangePassword from '../../modals/ModalChangePassword.js';
import ModalChangeEmail from '../../modals/ModalChangeEmail.js';

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
            {showModal ? <div>{modal}</div> : null}
        </div>
    );
}


export default Account;
