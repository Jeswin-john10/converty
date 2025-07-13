import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import logo from "../assets/img-convertly.png";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
const [selectedToolName, setSelectedToolName] = useState("Excel ⇄ JSON");

  const conversionTools = [
    { name: "Excel ⇄ JSON", path: "/excel-to-json" },
    { name: "JSON ⇄ Excel", path: "/json-to-excel" },
    { name: "CSV ⇄ JSON", path: "/csv-to-json" },
    { name: "CSV ⇄ Markdown", path: "/csv-to-markdown" },
    { name: "CSV ⇄ SQL", path: "/csv-to-sql" },
    { name: "CSV ⇄ HTML Table", path: "/csv-to-html" },
    { name: "JSON ⇄ YAML", path: "/json-to-yaml" },
    { name: "HTML ⇄ Markdown", path: "/html-to-markdown" },
    { name: "QR Code Generator", path: "/qr-generator" },
    { name: "QR Code Scanner", path: "/qr-scanner" },
    { name: "Barcode to Text", path: "/barcode-to-text" },
    { name: "Base64 ⇄ Text", path: "/base64-decode" },
    { name: "Text ⇄ URL/HTML Encoder", path: "/text-encoder" },
  ];

  const staticLinks = [
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="header">
      <Helmet>
        <title>Converty - Smart Online Data Conversion Tools</title>
        <meta
          name="description"
          content="Convertly offers fast, reliable tools for converting Excel, CSV, JSON, HTML, Base64, QR codes, and more. 100% free and web-based."
        />
        <meta
          name="keywords"
          content="Excel to JSON, CSV to SQL, Data converter, QR generator, JSON to YAML, JSON to Excel, CSV to JSON, CSV to Markdown, CSV to HTML, HTML to Markdown, QR code scanner, QR code generator, barcode to text, Base64 decode, Base64 encode, text encoder, URL encoder, HTML encoder, free online data converter, convert CSV online, convert JSON online, data transformation tools, Excel converter, HTML validator, CSS validator, file converter online, JSON tools, CSV tools, Markdown tools, code validation tools"
        />
      </Helmet>

      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="header-wrapper"
      >
        <Navbar expand="lg" variant="dark" className="navbar-custom">
          <Container fluid>
            <Navbar.Brand href="/" className="brand-container">
              <motion.img
                src={logo}
                alt="Convertly Logo"
                width="55"
                height="55"
                className="logo-img"
                whileHover={{ rotate: 5 }}
              />
              <motion.span
                className="brand-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Converty
              </motion.span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="main-navbar" />

            <Navbar.Collapse
              id="main-navbar"
              className="navbar-collapse-custom"
            >
              <Nav className="ms-auto align-items-center">
                {/* Search Form */}
                <Form className="search-form">
                  <div className="search-container">
                    <FormControl
                      type="search"
                      placeholder="Search tools..."
                      aria-label="Search tools"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />

                    <span className="search-icon" aria-hidden="true">
                      <i className="bi bi-search"></i>
                    </span>

                    {/* Live Search Suggestions */}
                    {searchQuery && (
                      <div className="search-suggestions">
                        {conversionTools.filter(tool =>
                          tool.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((tool, index) => (
                          <div
                            key={index}
                            className="suggestion-item"
                            onClick={() => {
                              window.location.href = tool.path;
                              setSearchQuery("");
                              setShowDropdown(false);
                            }}
                          >
                            {tool.name}
                          </div>
                        ))}
                        {conversionTools.filter(tool =>
                          tool.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length === 0 && (
                          <div className="suggestion-item text-muted">No tools found.</div>
                        )}
                      </div>
                    )}
                  </div>
                </Form>

                {/* Conversion Tools Dropdown */}
                <NavDropdown
                 title={
  <motion.span className="nav-link-text" whileHover={{ scale: 1.05 }}>
    {selectedToolName}
  </motion.span>
}

                  id="conversion-dropdown"
                  show={showDropdown}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                  onToggle={(isOpen) => setShowDropdown(isOpen)}
                  className="tools-dropdown"
                >
                  {conversionTools.map((tool, index) => (
                    <NavDropdown.Item
                      key={index}
                      href={tool.path}
                      className="dropdown-item"
                     onClick={() => {
  setSelectedToolName(tool.name);
  setShowDropdown(false);
}}

                    >
                      {tool.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>

                {/* Static Pages */}
                {staticLinks.map((link, index) => (
                  <Nav.Link key={index} href={link.path} className="nav-link-custom">
                    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {link.name}
                    </motion.span>
                  </Nav.Link>
                ))}

                {/* Developer Support Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="support-container"
                >
                  <Button
                    href="/developer-support"
                    rel="noopener noreferrer"
                    className="support-button"
                  >
                    <span className="button-text">Support Developer</span>
                  </Button>
                </motion.div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.div>

      {/* STYLES */}
      <style jsx>{`
        .header {
          position: relative;
          z-index: 1000;
        }
        .header-wrapper {
          background: black;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }
        .navbar-custom {
          padding: 0.8rem 0;
        }
        .brand-container {
          display: flex;
          align-items: center;
          margin-right: 2rem;
        }
        .logo-img {
          margin-right: 0.8rem;
          transition: transform 0.3s ease;
        }
        .brand-text {
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
        }
        .navbar-collapse-custom {
          justify-content: flex-end;
        }
        .search-form {
          margin-right: 1.5rem;
        }
        .search-container {
          position: relative;
          min-width: 220px;
        }
        .search-input {
          padding-left: 2.5rem;
          background: #ffffff;
          border: none;
          border-radius: 5px;
          color: #000;
          font-size: 0.95rem;
          height: 38px;
        }
        .search-input:focus {
          box-shadow: 0 0 0 0.2rem rgba(0, 255, 255, 0.25);
        }
        .search-icon {
          position: absolute;
          left: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }
        .search-suggestions {
          position: absolute;
          background: #fff;
          color: #000;
          z-index: 9999;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 100%;
          max-height: 220px;
          overflow-y: auto;
          margin-top: 0.3rem;
        }
        .suggestion-item {
          padding: 8px 12px;
          cursor: pointer;
          border-bottom: 1px solid #f0f0f0;
        }
        .suggestion-item:hover {
          background-color: #f2f2f2;
        }
        .nav-link-custom {
          color: rgba(255, 255, 255, 0.85) !important;
          font-weight: 500;
          margin: 0 0.8rem;
        }
        .nav-link-custom:hover {
          color: #ffffff !important;
        }
        .tools-dropdown .dropdown-item {
          padding: 0.5rem 1.5rem;
        }
        .tools-dropdown .dropdown-item:hover {
          background-color: rgba(0, 255, 255, 0.1);
          color: #00ffff;
        }
        .support-container {
          margin-left: 1.5rem;
        }
        .support-button {
          background: transparent;
          border: 2px solid #00ffff;
          color: #00ffff;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
        .support-button:hover {
          background: #00ffff;
          color: #000;
          box-shadow: 0 0 12px #00ffff;
        }
        @media (max-width: 992px) {
          .search-form {
            margin: 1rem 0;
            width: 100%;
          }
          .nav-link-custom {
            margin: 0.5rem 0;
          }
          .support-container {
            margin-top: 1rem;
          }
          .support-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
