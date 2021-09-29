import React, { useRef } from 'react';
import Cookies from 'js-cookie';


function Avatar(props) {
    // File: props.userFile, function: props.setUserFile, function: props.updateAavatar
    const edit = useRef(null);
    const pic = useRef(null);
    const circle = useRef(null);
    const tick = useRef(null);
    const barfill = useRef(null);
    const slider = useRef(null);
    const canv = useRef(null);

    let picFakeScale = 1;
  
    let drag = false;
    let startX = null;
    let startY = null;
    let translX = 0;
    let translY = 0;
  
    let circleRect = null;
    let picRectInit = null;
    let sliderRect = null;
    let tickGrabbed = false;
    let sliderProgress = 0;
  
    function updateRect() {
      picRectInit = pic.current.getBoundingClientRect();
      circleRect = circle.current.getBoundingClientRect();
      sliderRect = slider.current.getBoundingClientRect();
    }
  
    function updatePicStyle() {
      let w = picRectInit.width + ((pic.current.naturalWidth * picFakeScale - picRectInit.width) * sliderProgress);
      let h = picRectInit.height + ((pic.current.naturalHeight * picFakeScale - picRectInit.height) * sliderProgress);
      let picR = pic.current.getBoundingClientRect();
      // when scaling back pic respects circle borders
      if ((picR.right - w) > circleRect.left) {
        translX = translX - ((picR.right - w) - circleRect.left)/2;
      }
      if ((picR.left + w) < circleRect.right) {
        translX = translX - ((picR.left + w) - circleRect.right)/2;
      }
      if ((picR.top + h) < circleRect.bottom) {
        translY = translY - ((picR.top + h) - circleRect.bottom)/2;
      }
      if ((picR.bottom - h) > circleRect.top) {
        translY = translY - ((picR.bottom - h) - circleRect.top)/2;
      }
      pic.current.style = (
        `transform: translate(${translX}px, ${translY}px);`
        + `width: ${w}px;`
        + `max-width: ${w}px;`
        + `height: ${h}px;`
        + `max-height: ${h}px;`
      );
    }
  
    function doScale(e) {
      sliderProgress = (e.clientX - sliderRect.left) / sliderRect.width;
      sliderProgress = (sliderProgress > 1 ? 1 : sliderProgress);
      tick.current.style = `left: ${Math.round(sliderProgress * 100)}%;`;
      barfill.current.style = `width: ${Math.round(sliderProgress * 100)}%;`;
      updatePicStyle();
    }
  
    function doCrop() {
      let picR = pic.current.getBoundingClientRect();
      let scaleFactor = pic.current.naturalWidth / picR.width;
      let sx =  (circleRect.left - picR.left) * scaleFactor;
      let sy = (circleRect.top - picR.top) * scaleFactor;
      let sWidth = circleRect.width * scaleFactor;
      let sHeight = circleRect.height * scaleFactor;
      canv.current.setAttribute('width', `${sWidth}px`);
      canv.current.setAttribute('height', `${sHeight}px`);
      let ctx = canv.current.getContext('2d');
      ctx.drawImage(pic.current, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
    }
  
    window.onresize = updateRect;
  
    return (
      <div class="avatar-layer">
        <div class="avatar-container-double" onMouseUp={() => {
          tickGrabbed = false;
          drag=false;
        }}>
          <div class="avatar-container">
            <div class="avatar-header">
              <span class="avatar-title">Adjust your avatar</span>
              <span class="avatar-close-symb">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4587 4.39737L11.5355 4.46449C11.804 4.73297 11.8264 5.15437 11.6027 5.44835L11.5355 5.52515L9.06066 8.00002L11.5355 10.4749C11.804 10.7434 11.8264 11.1648 11.6027 11.4588L11.5355 11.5356C11.267 11.804 10.8456 11.8264 10.5517 11.6027L10.4749 11.5356L8 9.06068L5.52513 11.5356C5.25664 11.804 4.83524 11.8264 4.54127 11.6027L4.46447 11.5356C4.19598 11.2671 4.17361 10.8457 4.39734 10.5517L4.46447 10.4749L6.93934 8.00002L4.46447 5.52515C4.19598 5.25666 4.17361 4.83526 4.39734 4.54129L4.46447 4.46449C4.73295 4.196 5.15435 4.17363 5.44832 4.39737L5.52513 4.46449L8 6.93936L10.4749 4.46449C10.7434 4.196 11.1648 4.17363 11.4587 4.39737L11.5355 4.46449L11.4587 4.39737Z" fill="#828A8E"/>
                </svg>
              </span>
            </div>
            
            <div
            class="avatar-edit"
            ref={edit}
            onMouseDown={(e) => {
              drag=true;
              startX = e.clientX;
              startY = e.clientY;
            }}
            onMouseMove={(e) => {
              if (drag) {
                // moves pic while respecting circle
                let picR = pic.current.getBoundingClientRect();
                let mouseDeltaX = e.clientX - startX;
                let mouseDeltaY = e.clientY - startY;
                if ((picR.left + mouseDeltaX) > circleRect.left) {
                  translX = translX + (circleRect.left - picR.left);
                } else if ((picR.right + mouseDeltaX) < circleRect.right) {
                  translX = translX + (circleRect.right - picR.right);
                } else {
                  translX = translX + (e.clientX - startX);
                  startX = e.clientX;
                }
                if ((picR.top + mouseDeltaY) > circleRect.top) {
                  translY = translY + (circleRect.top - picR.top);
                } else if ((picR.bottom + mouseDeltaY) < circleRect.bottom) {
                  translY = translY + (circleRect.bottom - picR.bottom);
                } else {
                  translY = translY + (e.clientY - startY);
                  startY = e.clientY;
                }
                updatePicStyle();
              }
            }}
            >
  
              <img
              draggable="false"
              class="avatar-edit__pic"
              src={URL.createObjectURL(props.userFile)}
              ref={pic}
              onLoad={() => {
                // setting circle side
                const side = Math.min(pic.current.clientHeight, pic.current.clientWidth);
                circle.current.style.width = circle.current.style.height = `${side}px`;
                updateRect();
                if (pic.current.naturalHeight <= picRectInit.height
                  || pic.current.naturalWidth <= picRectInit.width) {
                    picFakeScale = 1.5;
                  }
              }}
              />
              <div
              class="avatar-edit__circle"
              ref={circle}
              >
              </div>
  
            </div>
  
            <div class="avatar-slider-wrapper">
              <div class="slider-minus">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9056 14.3199C11.551 15.3729 9.84871 16 8 16C3.58172 16 0 12.4183 0 8ZM5 8C5 7.44772 5.44772 7 6 7H10C10.5523 7 11 7.44772 11 8C11 8.55228 10.5523 9 10 9H6C5.44772 9 5 8.55228 5 8Z" fill="#828A8E"/>
                </svg>
              </div>
  
              <div
              class="avatar-slider"
              ref={slider}
              onMouseDown={(e) => {
                if (!tickGrabbed) {
                  doScale(e);
                }
              }}
              onMouseMove={(e) => {
                if (tickGrabbed) {
                  doScale(e);
                }
              }}
              >
                <div class="avatar-slider__bar">
                  <div class="avatar-slider__bar-fill" ref={barfill}></div>
                </div>
                <div
                class="avatar-slider__tick"
                ref={tick}
                onMouseDown={() => {
                  tickGrabbed = true;
                }}
                >
                </div>
  
              </div>
  
              <div class="slider-plus">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9056 14.3199C11.551 15.3729 9.84871 16 8 16C3.58172 16 0 12.4183 0 8ZM8 5C8.55228 5 9 5.44772 9 6V7H10C10.5523 7 11 7.44772 11 8C11 8.55228 10.5523 9 10 9H9V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V9H6C5.44772 9 5 8.55228 5 8C5 7.44772 5.44772 7 6 7H7V6C7 5.44772 7.44772 5 8 5Z" fill="#828A8E"/>
                </svg>
              </div>
            </div>
  
            <div class="avatar-buttons">
              <button class="profile-btn-cancel" type="button" onClick={() => props.setUserFile(null)}>Cancel</button>
              <button class="profile-btn-save" type="button" onClick={() => {
                  doCrop();
                  canv.current.toBlob((blob) => props.updateAavatar(blob).then(() => props.setUserFile(null)));
              }}>Save</button>
            </div>
  
          </div>
        </div>
  
        <canvas ref={canv} hidden></canvas>
        {console.log('rendering in Avatar')}
      </div>
    );
  }
  

export default Avatar;
