import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar'


const Header = (props) => {
  return (
    <Navbar color="light" light expand="md">
      <Navbar.Brand href="https://www.nkcyber.org/">NKCyber</Navbar.Brand>
    </Navbar>
  );
};

export default Header;
