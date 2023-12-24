import React from 'react'
import './Layout.css'
import { Outlet, useLocation } from 'react-router-dom'
import NavigationBar from '../NavigationBar/NavigationBar'

const Layout = () => {

  const location = useLocation();
  const isCloseNav:boolean = ['/login', '/signup'].includes(location.pathname);
  
  return (
    <div className={`LayoutContainer`}>
      <div className={`sideBarContainer ${isCloseNav ? "closeNav" : "" }`}>
        <NavigationBar isCloseNav={isCloseNav}/>
      </div>
      <div className='contentContainer'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout