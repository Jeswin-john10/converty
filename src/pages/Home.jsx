import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Button, Form } from 'react-bootstrap';
import { FiCopy, FiDownload, FiShield, FiZap, FiLayers, FiUpload } from 'react-icons/fi';
import {
  FiFileText,
  FiArrowRight,
  FiEdit,
  FiTable,
  FiRefreshCw
} from 'react-icons/fi';
import { Link } from "react-router-dom";
import { FiArrowRightCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import * as XLSX from 'xlsx';
import { Carousel } from 'react-bootstrap';
const Home = () => {
  const [activeTab, setActiveTab] = useState('excelToJson');
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');
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
    { name: "BarCode Generator", path: "/barcode-generator" },

];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet, { indent: 2 });
      const formattedJson = JSON.stringify(json, null, 2);
      setInputData(formattedJson);
      setOutputData(formattedJson);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleConvert = () => {
    try {
      switch (activeTab) {
        case 'jsonToCsv': {
          const json = JSON.parse(inputData);
          const ws = XLSX.utils.json_to_sheet(json);
          const csv = XLSX.utils.sheet_to_csv(ws);
          setOutputData(csv);

          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'converted.csv';
          a.click();
          URL.revokeObjectURL(url);
          break;
        }

        case 'jsonToExcel': {
          const json = JSON.parse(inputData);
          const ws = XLSX.utils.json_to_sheet(json);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          XLSX.writeFile(wb, 'converted.xlsx');
          setOutputData('Excel file has been downloaded.');
          break;
        }

        case 'csvToJson': {
          const rows = XLSX.read(inputData, { type: 'string' });
          const worksheet = rows.Sheets[rows.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
          setOutputData(JSON.stringify(json, null, 2));
          break;
        }

        default:
          setOutputData(inputData);
      }
    } catch (err) {
      setOutputData('⚠️ Conversion failed: Invalid format');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputData);
    setCopiedMessage('✅ Output copied to clipboard!');
    setTimeout(() => setCopiedMessage(''), 3000);
    setInputData('');
    setOutputData('');
  };

  const handleDownload = () => {
    const extension = activeTab === 'jsonToCsv' ? 'csv' : 'json';
    const mimeType = extension === 'csv' ? 'text/csv' : 'application/json';
    const blob = new Blob([outputData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
    setInputData('');
    setOutputData('');
  };

  const toolTabs = [
    { label: 'Excel to JSON', key: 'excelToJson' },
    { label: 'JSON to CSV', key: 'jsonToCsv' },
    { label: 'JSON to Excel', key: 'jsonToExcel' },
    { label: 'CSV to JSON', key: 'csvToJson' },
  ];

 const features = [
  {
    icon: <FiShield size={28} color="#0dcaf0" />,
    bg: 'bg-light',
    title: 'Privacy First',
    description: 'All conversions happen in your browser. Your data never leaves your computer.'
  },
  {
    icon: <FiZap size={28} color="#198754" />,
    bg: 'bg-light',
    title: 'Blazing Fast',
    description: 'Instant conversions with our optimized processing engine.'
  },
  {
    icon: <FiLayers size={28} color="#6f42c1" />,
    bg: 'bg-light',
    title: '10+ Tools',
    description: 'Comprehensive suite covering all your data conversion needs.'
  },
  {
    icon: <FiUpload size={28} color="#fd7e14" />,
    bg: 'bg-light',
    title: 'Upload Files',
    description: 'Drag & drop or browse Excel, JSON, or CSV files easily.'
  },
  {
    icon: <FiDownload size={28} color="#0d6efd" />,
    bg: 'bg-light',
    title: 'One-Click Downloads',
    description: 'Download converted files instantly with correct formatting.'
  },
  {
    icon: <FiCopy size={28} color="#dc3545" />,
    bg: 'bg-light',
    title: 'Instant Copy',
    description: 'Easily copy results with one click for fast reuse.'
  }
];

  return (
    <div className="convertly-app">
      {/* Hero Section */}
      <section className="hero-section py-5 mt-5">
        <Container>
          <Row className="align-items-center">
 <Col lg={6} className="animate__animated animate__fadeInLeft">
  <h1 className="display-5 fw-bold mb-3">
    Convert <span className="text-info">Any Format</span> Instantly
  </h1>
  <p className="lead mb-3">
    ⚡ One-click conversion between Excel, JSON, CSV, Markdown, SQL, YAML, HTML, and more — fast, secure, and free.
  </p>
  <ul className="list-unstyled mb-4 text-muted">
    <li>✅ No software or installation required – works in your browser</li>
    <li>✅ Lightning-fast conversions with instant copy/download/export options</li>
    <li>✅ Designed for developers, analysts, content creators, and business users</li>
    <li>✅ Supports large files, multiple formats, and mobile-friendly interface</li>
  </ul>
  <div className="d-flex flex-wrap gap-3">
    <Link to="/all-convertion-tool">
      <Button variant="info" size="lg" className="animate__animated animate__pulse animate__delay-1s">
        Start Converting
      </Button>
    </Link>
    <Button as={Link} to="/about" variant="outline-info" size="lg" className="animate__animated animate__fadeIn animate__delay-2s">
       Learn More
    </Button>
    <Button as={Link} to="/all-convertion-tool" variant="light" size="lg" href="#tools" className="border-info text-info animate__animated animate__fadeInUp animate__delay-3s">
      View All Tools
    </Button>
  </div>
</Col>


            {/* Conversion Box */}
              <Col lg={6}>
      <Card className="shadow-lg border-0 rounded-4 mt-4">
        <Card.Header className="bg-light border-bottom-0">
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={setActiveTab}
            className="rounded-top"
          >
            {toolTabs.map((tool) => (
              <Nav.Item key={tool.key}>
                <Nav.Link eventKey={tool.key} className="fw-semibold text-dark">
                  {tool.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Card.Header>

        <Card.Body className="p-4">
          {activeTab === "excelToJson" && (
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <FiUpload className="me-1" />
                Upload Excel File
              </Form.Label>
              <Form.Control
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              <FiFileText className="me-1" />
              Input
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Paste your data here..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
          </Form.Group>

          <div className="mb-4 d-flex justify-content-start">
            <Button
              variant="success"
              onClick={handleConvert}
              disabled={!inputData.trim()}
              className="px-4 fw-semibold"
            >
              <FiArrowRight className="me-1" />
              Convert
            </Button>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">
              <FiFileText className="me-1" />
              Output
            </Form.Label>
            <Form.Control as="textarea" rows={6} readOnly value={outputData} />
          </Form.Group>

          <Row className="mt-3 align-items-center">
            <Col xs="auto" className="d-flex gap-2">
              <Button
                variant="outline-info"
                onClick={handleCopy}
                disabled={!outputData.trim()}
              >
                <FiCopy className="me-1" />
                Copy
              </Button>

              <Button
                variant="outline-info"
                onClick={handleDownload}
                disabled={!outputData.trim()}
              >
                <FiDownload className="me-1" />
                Download
              </Button>
            </Col>
            <Col>
              {copiedMessage && (
                <span className="text-success fw-semibold small ms-2">
                  {copiedMessage}
                </span>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
     <section id="features" className="py-5 bg-light">
  <Container>
    <h2 className="text-center mb-5 fw-bold">Why Choose <span className="text-info">Converty?</span></h2>
    <Row className="g-4">
      {features.map((feature, index) => (
        <Col md={6} lg={4} key={index}>
          <Card
            className="h-100 text-center border-0 shadow-sm p-3 animate__animated animate__fadeInUp"
            style={{ transition: 'transform 0.3s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#e9f7fc',
              }}
            >
              {feature.icon}
            </div>
            <h5 className="fw-semibold">{feature.title}</h5>
            <p className="text-muted">{feature.description}</p>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</section>
{/* Conversion Info Section */}
{/* Conversion Info Section */}
<section className="py-5 bg-white border-top">
  <Container>
    <h2 className="text-center fw-bold mb-5">
      <span role="img" aria-label="doc"></span> Converty File Conversion Guide
    </h2>

    {/* Excel to JSON */}
    <Row className="mb-5 align-items-center">
      <Col md={2} className="text-center text-md-end">
        <div className="bg-info bg-opacity-25 text-info rounded-circle p-4 shadow d-inline-flex justify-content-center align-items-center">
          <FiUpload size={36} />
        </div>
      </Col>
      <Col md={10}>
        <h4 className="fw-semibold text-info">Excel to JSON</h4>
        <p className="text-muted">
          Convert Excel files (.xlsx, .xls) to structured JSON for APIs, web apps, and data analysis — all in your browser.
        </p>
        <ul className="list-unstyled">
          <li className="mb-1"><FiUpload className="me-2" /> Upload Excel File</li>
          <li className="mb-1"><FiArrowRight className="me-2" /> Click Convert</li>
          <li className="mb-1"><FiDownload className="me-2" /> Copy or Download as JSON</li>
        </ul>
      </Col>
    </Row>

    {/* JSON to Excel */}
    <Row className="mb-5 align-items-center flex-md-row-reverse">
      <Col md={2} className="text-center text-md-start">
        <div className="bg-success bg-opacity-25 text-success rounded-circle p-4 shadow d-inline-flex justify-content-center align-items-center">
          <FiFileText size={36} />
        </div>
      </Col>
      <Col md={10}>
        <h4 className="fw-semibold text-success">JSON to Excel</h4>
        <p className="text-muted">
          Transform JSON data into downloadable Excel (.xlsx) spreadsheets for reports, exports, or business workflows.
        </p>
        <ul className="list-unstyled">
          <li className="mb-1"><FiEdit className="me-2" /> Paste or edit JSON</li>
          <li className="mb-1"><FiArrowRight className="me-2" /> Click Convert</li>
          <li className="mb-1"><FiDownload className="me-2" /> Download Excel File</li>
        </ul>
      </Col>
    </Row>

    {/* JSON to CSV */}
    <Row className="mb-5 align-items-center">
      <Col md={2} className="text-center text-md-end">
        <div className="bg-primary bg-opacity-25 text-primary rounded-circle p-4 shadow d-inline-flex justify-content-center align-items-center">
          <FiTable size={36} />
        </div>
      </Col>
      <Col md={10}>
        <h4 className="fw-semibold text-primary">JSON to CSV</h4>
        <p className="text-muted">
          Easily convert JSON arrays into clean CSV files — great for spreadsheets, data import, and automation tasks.
        </p>
        <ul className="list-unstyled">
          <li className="mb-1"><FiEdit className="me-2" /> Paste your JSON</li>
          <li className="mb-1"><FiArrowRight className="me-2" /> Convert to CSV</li>
          <li className="mb-1"><FiDownload className="me-2" /> Download CSV for Excel or DBs</li>
        </ul>
      </Col>
    </Row>

    {/* CTA */}
    <div className="text-center mt-5">
 <Button
  as={Link}
  to="/all-convertion-features"
  variant="outline-info"
  size="lg"
  className="px-4 py-2 rounded-pill shadow-sm"
>
  <FiRefreshCw className="me-2" /> Start Another Conversion
</Button>
    </div>
  </Container>
</section>
{/* carousal */}

<Container className="my-5" id="tool-info-carousel">

  <Carousel fade interval={5000} controls indicators className="shadow-lg border rounded overflow-hidden">
    {/* JSON Tool */}
    <Carousel.Item>
      <div className="p-4 bg-light">
        <h3 className="text-info fw-bold animate__animated animate__fadeInDown"> What is JSON?</h3>
        <p className="mt-3 animate__animated animate__fadeIn">
          JSON (JavaScript Object Notation) is a lightweight data-interchange format. It's easy to read and write for humans, and easy for machines to parse and generate. Widely used in APIs and web applications.
        </p>
        <ul className="animate__animated animate__fadeInUp">
          <li>✔️ Format: Key-Value Pairs</li>
          <li>✔️ Commonly used in APIs & Config Files</li>
          <li>✔️ Easily convert to Excel or CSV</li>
        </ul>
      </div>
    </Carousel.Item>

    {/* Excel Tool */}
    <Carousel.Item>
      <div className="p-4 bg-white">
        <h3 className="text-success fw-bold animate__animated animate__fadeInDown"> What is Excel?</h3>
        <p className="mt-3 animate__animated animate__fadeIn">
          Excel is a spreadsheet program by Microsoft used to store, organize, and analyze data. It supports formulas, charts, and pivot tables.
        </p>
        <ul className="animate__animated animate__fadeInUp">
          <li>✔️ File Extensions: .xls, .xlsx</li>
          <li>✔️ Great for tabular data</li>
          <li>✔️ Easily convert to JSON, CSV, PDF</li>
        </ul>
      </div>
    </Carousel.Item>

    {/* CSV Tool */}
    <Carousel.Item>
      <div className="p-4 bg-light">
        <h3 className="text-primary fw-bold animate__animated animate__fadeInDown"> What is CSV?</h3>
        <p className="mt-3 animate__animated animate__fadeIn">
          CSV (Comma Separated Values) is a plain text format that stores tabular data. Each line represents a row, with values separated by commas.
        </p>
        <ul className="animate__animated animate__fadeInUp">
          <li>✔️ Lightweight & human-readable</li>
          <li>✔️ Used in spreadsheets and databases</li>
          <li>✔️ Easily convert to Excel or JSON</li>
        </ul>
      </div>
    </Carousel.Item>

    {/* Markdown Tool */}
    <Carousel.Item>
      <div className="p-4 bg-white">
        <h3 className="text-dark fw-bold animate__animated animate__fadeInDown"> What is Markdown?</h3>
        <p className="mt-3 animate__animated animate__fadeIn">
          Markdown is a lightweight markup language that allows you to format plain text using easy-to-read syntax. Great for writing documentation and blogs.
        </p>
        <ul className="animate__animated animate__fadeInUp">
          <li>✔️ Converts to HTML, PDF, or DOCX</li>
          <li>✔️ Used in GitHub, Notion, etc.</li>
          <li>✔️ Easily readable and editable</li>
        </ul>
      </div>
    </Carousel.Item>

    {/* YAML Tool */}
    <Carousel.Item>
      <div className="p-4 bg-light">
        <h3 className="text-warning fw-bold animate__animated animate__fadeInDown"> What is YAML?</h3>
        <p className="mt-3 animate__animated animate__fadeIn">
          YAML (YAML Ain't Markup Language) is a human-friendly data format used for configuration files and data serialization.
        </p>
        <ul className="animate__animated animate__fadeInUp">
          <li>✔️ More readable than JSON</li>
          <li>✔️ Often used in DevOps and Kubernetes</li>
          <li>✔️ Convert to/from JSON easily</li>
        </ul>
      </div>
    </Carousel.Item>

    {/* SQL Tool */}
    <Carousel.Item>
      <div className="p-4 bg-white">
        <h3 className="text-danger fw-bold animate__animated animate__fadeInDown"> What is SQL?</h3>
        <p className="mt-3 animate__animated animate__fadeIn">
          SQL (Structured Query Language) is used to manage and query relational databases. You can generate SQL insert scripts from CSV and JSON.
        </p>
        <ul className="animate__animated animate__fadeInUp">
          <li>✔️ Used in MySQL, PostgreSQL, etc.</li>
          <li>✔️ Automate DB inserts with CSV to SQL</li>
          <li>✔️ Easy conversion for database imports</li>
        </ul>
      </div>
    </Carousel.Item>
  </Carousel>
</Container>
{/* tools */}
  <section className="py-5 bg-white border-top">
      <Container>
        <h2 className="text-center fw-bold mb-5 text-dark">
           All Converty Conversion Tools
        </h2>
        <Row>
          {conversionTools.map((tool, index) => (
            <Col key={index} sm={6} md={4} lg={3} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="mb-2">
                      <h6 className="fw-semibold text-dark">{tool.name}</h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <Link
                        to={tool.path}
                        className="text-info text-decoration-none fw-medium"
                      >
                        Try Tool <FiArrowRightCircle className="ms-1" />
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>



   
    </div>
  );
};

export default Home;
