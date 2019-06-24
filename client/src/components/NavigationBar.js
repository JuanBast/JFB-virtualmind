import React from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import logo from "../images/logo.png";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <a className="navbar-brand" href="https://www.virtualmind.com/" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="38" height="30" alt="virtualmind.com" />
            </a>
          </NavItem>
          <NavItem>
            <NavLink href="/">Articles</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/create">Create Article</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default NavigationBar;