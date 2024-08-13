import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='header'>
        <NavLink to='/' className="w-10 h-10 text-yellow-100 rounded-lg bg-black items-center justify-center flex font-bold shadow-xl shadow-blue-300">
            <p>YH</p>
        </NavLink>
        <nav className='flex text-lg gap-7 font-medium'>
            <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
                About
            </NavLink>
            <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
                Projects
            </NavLink>
            
        </nav>
    </header>
  );
}

export default Navbar;
