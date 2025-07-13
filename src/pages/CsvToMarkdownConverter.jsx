import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import 'animate.css';

const CsvToMarkdownConverter = () => {
  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleUploadClick = () => fileInputRef.current?.click();

const convertToMarkdown = (data) => {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const headerLine = `| ${headers.map(h => h.trim()).join(' | ')} |`;
  const separatorLine = `| ${headers.map(() => '---').join(' | ')} |`;

  const escapeMarkdown = (value) =>
    String(value ?? '')
      .replace(/\|/g, '\\|')  // Escape pipes
      .replace(/\r?\n|\r/g, ' ')  // Remove newlines
      .trim();

  const rows = data.map(row =>
    `| ${headers.map(header => escapeMarkdown(row[header])).join(' | ')} |`
  );

  return [headerLine, separatorLine, ...rows].join('\n');
};


  const handleFileUpload = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a valid CSV file.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const md = convertToMarkdown(results.data);
          setMarkdown(md);
        } catch {
          setError('Failed to convert CSV to Markdown.');
        }
      },
      error: () => {
        setError('Error reading CSV file.');
      },
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy Markdown.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, 'converty.md');
  };

  const handleClear = () => setMarkdown('');

  return (
    <>
      <Helmet>
        <title>CSV to Markdown Table Converter | Convertly</title>
        <meta name="description" content="Convert your CSV files to clean, editable Markdown tables instantly. Free, private, and browser-based." />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center mb-4 animate__animated animate__fadeInDown">CSV to Markdown Converter</h1>
        <p className="text-center text-muted mb-4">
          Upload your CSV and get a well-formatted Markdown table. No server, full browser privacy.
        </p>

        <Row className="justify-content-center mb-4">
          <Col md={6} className="text-center">
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <Button
              variant="primary"
              className="w-100 d-flex align-items-center justify-content-center gap-2 animate__animated animate__pulse animate__infinite"
              onClick={handleUploadClick}
            >
              <span role="img" aria-label="Upload"></span> Upload CSV File
            </Button>
          </Col>
        </Row>

        {markdown && (
          <Card className="shadow-sm animate__animated animate__fadeInUp">
            <Card.Header className="d-flex flex-wrap justify-content-between align-items-center">
              <span className="fw-bold"> Markdown Table</span>
              <div className="mt-2 mt-sm-0 d-flex flex-wrap gap-2">
                <Button variant="outline-secondary" size="sm" onClick={handleCopy}>
                  {copied ? '✅ Copied!' : 'Copy'}
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleDownload}>
                  Download
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
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
              />
            </Card.Body>
          </Card>
        )}

        {error && (
          <Row className="justify-content-center mt-3">
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
              <h5 className="fw-bold mb-2"> How it works</h5>
              <ul className="text-muted small ps-3">
                <li> Upload `.csv` file with headers</li>
                <li> Converts data into clean Markdown format</li>
                <li> Editable and copy-friendly output</li>
                <li> 100% local conversion – no file uploads</li>
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Highlights */}
        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <Row className="g-3">
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp">
                  <h6> Markdown Table</h6>
                  <p className="text-muted small">Create readable Markdown from tabular data.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-1s">
                  <h6> Easy Export</h6>
                  <p className="text-muted small">Download the Markdown as a `.md` file.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-2s">
                  <h6> Local Only</h6>
                  <p className="text-muted small">Runs 100% in your browser. Nothing is stored.</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CsvToMarkdownConverter;
