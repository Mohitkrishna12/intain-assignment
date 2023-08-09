import React,{useState} from 'react'
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import styled from "styled-components";
import { IoHome, IoSettings } from "react-icons/io5";
import { BsListUl } from "react-icons/bs";
import { GiEscalator, GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";


const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-left: 2rem; 
  padding-right: 3rem; 
  padding-top: 0.25rem; 
  padding-bottom: 0.25rem; 
  border-bottom: 1px solid #e6ebf4;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  @media screen and (max-width: 768px) {
    padding-left: 2rem; /* 32px */
    padding-right: 2rem; /* 32px */
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
    margin-top: 16px;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  &:first-child {
    margin-left: 0;
  }
  margin-left: 30px;
  cursor: pointer;
  color: #5f6366;
  font-weight: bold;

  &:hover {
    color: #009999;
  }
  svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

const DropdownMenu = styled.div`
  display: ${(props) => (props.showDropdown ? "flex" : "none")};
  flex-direction: column;
  background-color: #fff;
  position: absolute;
  top: 56px;
  right: 16px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  z-index: 100;

  a {
    color: #333;
    text-decoration: none;
    padding: 8px;
    border-bottom: 1px solid #f1f1f1;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f1f1f1;
    }
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const Navbar = () => {
     const [showDropdown, setShowDropdown] = useState(false);

     const handleDropdownToggle = () => {
       setShowDropdown(!showDropdown);
     };
  return (
      <StyledNavbar>
        <Link to="/">
          <img src={logo} alt="logo" className="logo-img" />
        </Link>
        <NavItems>
          <NavItem to="/">
            <IoHome />
            Home
          </NavItem>
          <NavItem>
            <BsListUl />
            List
          </NavItem>
          <NavItem>
            <GiEscalator />
            Escalation
          </NavItem>
          <NavItem>
            <IoSettings />
            Settings
          </NavItem>
          <NavItem>
            <MdAccountCircle />
            Account
          </NavItem>
        </NavItems>
        <HamburgerMenu onClick={handleDropdownToggle}>
          <GiHamburgerMenu />
        </HamburgerMenu>
        {showDropdown && (
          <DropdownMenu showDropdown={showDropdown}>
            <Link to="/">Home</Link>
            <Link>List</Link>
            <Link>Escalation</Link>
            <Link>Settings</Link>
            <Link>Account</Link>
          </DropdownMenu>
        )}
      </StyledNavbar>
  );
}
