import React, { useState } from 'react';  //, useRef, useEffect
import { CSSTransition } from 'react-transition-group';

import './App.css';
// import './index.css'

function App() {
  return (
    <div>
      <Navbar>
        <p className="username"><NavItem icon="🙍‍♂️" text="Username"></NavItem></p>
        <NavItem icon="➕"></NavItem>
        <NavItem icon="💬"></NavItem>
        <NavItem icon="🔔"></NavItem>

        <NavItem icon="⬇️">
          {/* Dropdown goes here */}
          <DropDownMenu></DropDownMenu>
        </NavItem>
      </Navbar>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="narbar-nav">
        {props.children}
      </ul>
    </nav>
  )
}

function NavItem(props) {

  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a className="icon-button" onClick={() => setOpen(!open)}>  {/*  href="#" */}
        {props.icon}
        {props.text}
      </a>
      {open && props.children}
    </li>
  )
}

function DropDownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  // useEffect(() => {
  //   setMenuHeight(dropdownRef.current.firstChild.offsetHeight);
  // }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropDwonItem(props) {
    return (
      <a className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}> {/* href="#" */}
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
        <div className="menu">
          <DropDwonItem leftIcon="🙍‍♂️">My Profile</DropDwonItem>
          <DropDwonItem
            leftIcon="⚙️"
            rightIcon="➡️"
            goToMenu="settings"
          >
            Setting
          </DropDwonItem>
          <DropDwonItem
            leftIcon="❓"
            rightIcon="➡️"
            goToMenu="help">
            Help & Support
          </DropDwonItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}>
        <div className="menu">
          <DropDwonItem leftIcon="⬅️" goToMenu="main">
            <h2>Settings</h2>
          </DropDwonItem>
          <DropDwonItem leftIcon="🔐"> Privacy</DropDwonItem>
          <DropDwonItem leftIcon="📋"> Activity Log</DropDwonItem>
          <DropDwonItem leftIcon="✉️"> News Feed Preferences</DropDwonItem>
          <DropDwonItem leftIcon="🌐"> Language</DropDwonItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'help'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}>
        <div className="menu">
          <DropDwonItem leftIcon="⬅️" goToMenu="main">
            <h2>Help & Support</h2>
          </DropDwonItem>
          <DropDwonItem leftIcon="❓">Help Center</DropDwonItem>
          <DropDwonItem leftIcon="📧">Support Inbox</DropDwonItem>
          <DropDwonItem leftIcon="🆘">Find Support</DropDwonItem>
          <DropDwonItem leftIcon="⚠️">Report A Problem</DropDwonItem>
        </div>
      </CSSTransition>
    </div>
  )
}

export default App;
