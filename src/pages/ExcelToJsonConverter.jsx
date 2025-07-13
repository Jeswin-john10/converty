import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Container, Button, Form, Row, Col, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { saveAs } from 'file-saver';
import 'animate.css';

const ExcelToJsonConverter = () => {
  const [jsonData, setJsonData] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isExcel = fileName.endsWith('.xls') || fileName.endsWith('.xlsx');

    if (!isExcel) {
      setError('Please upload a valid Excel file (.xls or .xlsx)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        setJsonData(JSON.stringify(json, null, 2)); // Properly formatted JSON
      } catch {
        setError('Failed to convert file. Please ensure it is a valid Excel document.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'converty.json');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy JSON to clipboard.');
    }
  };

  const handleClear = () => {
    setJsonData('');
  };

  return (
    <>
      <Helmet>
        <title>Excel to JSON Converter | Convertly</title>
        <meta
          name="description"
          content="Free online Excel to JSON converter. Upload Excel (.xls/.xlsx), view, edit, copy or download JSON instantly. SEO-friendly & responsive."
        />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center mb-4 animate__animated animate__fadeInDown">
           Excel to JSON Converter
        </h1>
        <p className="text-center text-muted mb-4">
          Upload your Excel file and convert it to editable JSON instantly. Free, responsive, and privacy-friendly.
        </p>

        {/* Upload Button */}
        <Row className="justify-content-center mb-4">
          <Col md={6} className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xls,.xlsx"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <Button
              variant="primary"
              size="md"
              className="w-100 d-flex align-items-center justify-content-center gap-2 animate__animated animate__pulse animate__infinite"
              onClick={handleButtonClick}
            >
              <span className="fs-6" role="img" aria-label="Upload Icon"></span>
              <span>Upload Excel File (.xls / .xlsx)</span>
            </Button>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Row className="justify-content-center mb-3">
            <Col md={8}>
              <Alert variant="danger" className="animate__animated animate__fadeIn">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {/* JSON Output Box */}
        {jsonData && (
          <Card className="shadow-sm animate__animated animate__fadeInUp">
            <Card.Header className="d-flex flex-wrap justify-content-between align-items-center">
              <span className="fw-bold"> Editable JSON Output</span>
              <div className="mt-2 mt-sm-0 d-flex flex-wrap gap-2">
                <Button variant="outline-secondary" size="sm" onClick={handleCopy}>
                  {copied ? '✅ Copied!' : 'Copy JSON'}
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleDownload}>
                  Download JSON
                </Button>
                <Button variant="outline-danger" size="sm" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Control
                as="textarea"
                rows={15}
                className="font-monospace"
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                aria-label="Editable JSON output"
                style={{ whiteSpace: 'pre', overflowX: 'auto' }}
              />
            </Card.Body>
          </Card>
        )}

        {/* How it works */}
        <Row className="justify-content-center mt-5 mb-4">
          <Col md={10}>
            <Card className="p-4 shadow-sm animate__animated animate__fadeIn">
              <h5 className="fw-bold mb-2">How it works</h5>
              <p className="text-muted mb-2">
                This tool lets you instantly convert Excel spreadsheets into clean JSON data. It works entirely in your browser – your files are never uploaded to any server.
              </p>
              <ul className="text-muted small ps-3">
                <li> Supports .xls and .xlsx files</li>
                <li> Edit your JSON data directly in the output box</li>
                <li> Copy to clipboard or  download as a .json file</li>
                <li> Clear data after you're done for privacy</li>
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Feature Highlights */}
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Row className="g-3">
              <Col md={4}>
                <Card className="text-center p-3 h-100 shadow-sm animate__animated animate__fadeInUp">
                  <h6>Live Conversion</h6>
                  <p className="text-muted small">Instant conversion of Excel to JSON right in your browser.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
                  <h6> Editable Output</h6>
                  <p className="text-muted small">Modify JSON in the textarea before copying or saving.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
                  <h6> No Upload</h6>
                  <p className="text-muted small">Your file is never sent to a server. Full client-side privacy.</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExcelToJsonConverter;
