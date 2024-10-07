import React, { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { navs } from "../../config/config";

import "./ScamNewsNavBar.css";

function ScamNewsNavBar() {
  const navigate = useNavigate();

  const navRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
    setIsCollapsed(true);
  };

  const handleNavClick = (page) => {
    navigate(page);
    setIsCollapsed(true);
  };

  const isSearchButtonDisabled = searchQuery.trim() === "";

  return (
    <>
      <Navbar
        ref={navRef}
        className="navbar"
        variant="dark"
        expand="lg"
        expanded={true}
      >

<Navbar.Collapse id="basic-navbar-nav">
  <div className="nav-and-search">
    <Form className="search-form" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Explore news..."
        className="form-input form-control-lg mt-lg-2 mt-md-2 mt-sm-2 mt-xl-0"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <Button
        className="search-btn mt-lg-2 ml-2 mt-md-2 mt-sm-2 mt-xl-0"
        onClick={handleSubmit}
        disabled={isSearchButtonDisabled}
      >
        Search
      </Button>
    </Form>

    <Nav className="nav mr-auto">
      {navs.map((navItem) => (
        <Button
          key={uuidv4()}
          className="nav-item-btn"
          onClick={() => handleNavClick(navItem.page)}
        >
          {navItem.nav}
        </Button>
      ))}
    </Nav>
  </div>
</Navbar.Collapse>

      </Navbar>
    </>
  );
}

export default ScamNewsNavBar;
