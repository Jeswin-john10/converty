import React, { useState, useRef } from 'react';
import { Container, Button, Form, Row, Col, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import 'animate.css';

const CsvToJsonConverter = () => {
  const [jsonData, setJsonData] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a valid CSV file.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          setJsonData(JSON.stringify(result.data, null, 2));
        } catch {
          setError('Could not convert CSV to JSON.');
        }
      },
      error: () => {
        setError('Error reading CSV file.');
      }
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy JSON.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'converty.json');
  };

  const handleClear = () => {
    setJsonData('');
  };

  return (
    <>
      <Helmet>
        <title>CSV to JSON Converter | Convertly</title>
        <meta
          name="description"
          content="Convert CSV to JSON instantly online. Upload your CSV file and view, edit, or download your JSON data securely and fast."
        />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center mb-4 animate__animated animate__fadeInDown"> CSV to JSON Converter</h1>
        <p className="text-center text-muted mb-4">
          Upload your CSV file to convert and edit JSON output right in your browser.
        </p>

        {/* File Upload */}
        <Row className="justify-content-center mb-4">
          <Col md={6} className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <Button
              variant="primary"
              size="md"
              className="w-100 d-flex align-items-center justify-content-center gap-2 animate__animated animate__pulse animate__infinite"
              onClick={handleFileSelect}
            >
              <span role="img" aria-label="Upload"></span> Upload CSV File
            </Button>
          </Col>
        </Row>

        {/* JSON Output */}
        {jsonData && (
          <Card className="shadow-sm animate__animated animate__fadeInUp">
            <Card.Header className="d-flex justify-content-between flex-wrap align-items-center">
              <span className="fw-bold"> JSON Output</span>
              <div className="d-flex flex-wrap gap-2 mt-2 mt-sm-0">
                <Button variant="outline-secondary" size="sm" onClick={handleCopy}>
                  {copied ? '✅ Copied!' : 'Copy'}
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
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                aria-label="Editable JSON output"
              />
            </Card.Body>
          </Card>
        )}

        {/* Error */}
        {error && (
          <Row className="justify-content-center my-3">
            <Col md={8}>
              <Alert variant="danger" className="animate__animated animate__fadeIn">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {/* Info Card */}
        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <Card className="p-4 shadow-sm animate__animated animate__fadeIn">
              <h5 className="fw-bold mb-2">How it works</h5>
              <ul className="text-muted small ps-3">
                <li>Upload any valid `.csv` file (UTF-8 recommended)</li>
                <li>Instant JSON conversion with editable output</li>
                <li>No server uploads — data stays in your browser</li>
                <li>Copy or download JSON with one click</li>
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Feature Highlights */}
        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <Row className="g-3">
              <Col md={4}>
                <Card className="text-center p-3 h-100 shadow-sm animate__animated animate__fadeInUp">
                  <h6> Quick Upload</h6>
                  <p className="text-muted small">Supports standard CSV formats including headers.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
                  <h6> Editable JSON</h6>
                  <p className="text-muted small">You can manually tweak the result in the editor box.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
                  <h6>Private Conversion</h6>
                  <p className="text-muted small">All conversions happen locally — no uploads or tracking.</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CsvToJsonConverter;
