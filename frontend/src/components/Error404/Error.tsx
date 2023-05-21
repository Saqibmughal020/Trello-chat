import React from 'react';
import { NavLink } from 'react-router-dom';

const Error: React.FC = () => {
  return (
    <div>
        <h1>Error 404</h1>
        <NavLink to="/">Back To Home Page</NavLink>
    </div>
  )
}

export default Error;