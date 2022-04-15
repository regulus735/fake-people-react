import React, { useState } from 'react';
import './AsideNavigation.sass';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft, faPerson, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import NavigationLink from './Subcomponents/NavigationLink';
import { useStoreContext } from '../../../store/StoreProvider';

const AsideNavigation = () => {
   const [isOpen, setIsOpen] = useState(false);
   const { logOut } = useStoreContext();

   return (
      <>
         <div className={`burger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(prev => !prev)}>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
         </div>

         <aside className={`aside-navigation ${isOpen ? 'open' : ''}`}>
            <div className='wrapper'>
               <div className="logo">
                  <FontAwesomeIcon icon={faPerson} className="icon" />
                  <p>FakePeople</p>
               </div>
               <nav className='navigation'>
                  <NavigationLink name={'Dashboard'} path={"/"} />
                  <NavigationLink name={'Nav icon 2'} path={"/test"} />
                  <NavigationLink name={'Nav icon 3'} path={"/test"} />
               </nav>
               <button className='logout' onClick={logOut}>
                  <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                  <p>Log out</p>
               </button>
            </div>
            <button className="expand" onClick={() => setIsOpen(prev => !prev)}>
               <FontAwesomeIcon icon={isOpen ? faCaretLeft : faCaretRight} />
            </button>
         </aside>
      </>
   );
}

export default AsideNavigation;