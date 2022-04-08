import React, { useEffect, useState } from 'react';

import './InputComponent.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheck } from '@fortawesome/free-solid-svg-icons';

const SpeechBubble = ({ setShowBubble }) => {
   const animationDuration = 3;

   useEffect(() => {
      const intervalId = setInterval(() => {
         setShowBubble(false)
      }, animationDuration * 1000);

      return () => clearInterval(intervalId);
   }, [])

   return (
      <div className='speech-bubble' style={{ animationDuration: `${animationDuration}s` }}>
         <FontAwesomeIcon icon={faCheck} />copied to clipboard
      </div>
   )
}

const InputComponent = ({ name, isEditMode, handleChange, inputsData }) => {
   const [showBubble, setShowBubble] = useState(false);
   const [isPasswordShown, setIsPasswordShown] = useState(false);

   const copyToClipboard = (e) => {
      if (!isEditMode) {
         setShowBubble(true)
         navigator.clipboard.writeText(inputsData[e.target.name])
      }
   }

   return (
      <div className={`input-container ${name}`}>
         {name === 'password'
            ? <>
               <div onClick={copyToClipboard}><input type={isPasswordShown ? 'text' : 'password'} name='password' value={inputsData.password} disabled={!isEditMode} onChange={handleChange} /></div>
               <button onClick={() => setIsPasswordShown(prev => !prev)}><FontAwesomeIcon icon={faEye} /></button>
            </>
            : <div onClick={copyToClipboard}><input type="text" name={name} value={inputsData[name]} disabled={!isEditMode} onChange={handleChange} /></div>
         }
         {showBubble && <SpeechBubble setShowBubble={setShowBubble} />}
      </div>
   );
}

export default InputComponent;