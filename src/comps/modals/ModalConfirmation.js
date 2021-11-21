import React from 'react';


function ModalConfirmation(props) {
    // text
    // name
    // btn
    // notification
    // callback func: setShowModal
    // callback func: callback
    let top = window.innerHeight/2 - 180/2;
    let left = window.innerWidth/2 - 232/2;

    return (
        <div
        class="modal-confirmation-wrapper"
        onClick={(evt) => {
            if (!evt.target.closest('.modal-confirmation')) {
                props.setShowModal(null);
                evt.preventDefault();
                evt.stopPropagation();
            }
        }}>

            <div
            class="modal-confirmation"
            style={{
                top: `${top}px`,
                left: `${left}px`,
                }}>
                <div class="modal-confirmation__title">
                    {props.text} <span>{props.name}</span>?
                </div>

                <button
                class="modal-confirmation__btn-delete"
                onClick={(evt) => {
                    props.callback();
                    props.setShowModal(null);
                    props.setNotification({
                    'text': props.notification,
                    'color': '#333738',
                    'time': 4000
                    });
                    evt.preventDefault();
                    evt.stopPropagation();
                }}
                >{props.btn}</button>

                <button
                class="modal-confirmation__btn-cancel"
                onClick={(evt) => {
                    props.setShowModal(null);
                    evt.preventDefault();
                    evt.stopPropagation();
                }}>Cancel</button>
            </div>
            
        </div>
    );
}



export default ModalConfirmation;
