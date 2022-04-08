import React from 'react'
import { NavLink } from 'react-router-dom';
import './NavigationLink.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


const NavigationLink = ({ name, path }) => {
   return (
      <NavLink to={path} className={({ isActive }) => isActive ? 'active' : ''}>
         <FontAwesomeIcon icon={faHouse} className="icon" />
         <p>{name}</p>
      </NavLink>
   )
}

export default NavigationLink