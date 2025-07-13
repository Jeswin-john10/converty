import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import 'animate.css';

const CsvToSqlConverter = () => {
  const [sqlOutput, setSqlOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const generateSQL = (tableName, data) => {
    if (!data.length) return '';

    const columns = Object.keys(data[0]).map(col => `\`${col.trim()}\``).join(', ');
    const values = data
      .map(row =>
        `(${Object.values(row)
          .map(val => `'${String(val ?? '').replace(/'/g, "''")}'`)
          .join(', ')})`
      )
      .join(',\n');

    return `INSERT INTO \`${tableName}\` (${columns}) VALUES\n${values};`;
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
          const sql = generateSQL('your_table', results.data);
          setSqlOutput(sql);
        } catch {
          setError('Failed to convert CSV to SQL.');
        }
      },
      error: () => {
        setError('Error reading CSV file.');
      },
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sqlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy SQL.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([sqlOutput], { type: 'text/sql;charset=utf-8' });
    saveAs(blob, 'converty.sql');
  };

  const handleClear = () => setSqlOutput('');

  return (
    <>
      <Helmet>
        <title>CSV to SQL Converter | Convertly</title>
        <meta
          name="description"
          content="Convert your CSV files to clean SQL INSERT statements instantly. Free, browser-based, and privacy-friendly."
        />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center mb-4 animate__animated animate__fadeInDown"> CSV to SQL Converter</h1>
        <p className="text-center text-muted mb-4">
          Upload your CSV and get instant SQL insert statements. All conversions happen locally in your browser.
        </p>

        {/* Upload */}
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

        {/* SQL Output */}
        {sqlOutput && (
          <Card className="shadow-sm animate__animated animate__fadeInUp">
            <Card.Header className="d-flex flex-wrap justify-content-between align-items-center">
              <span className="fw-bold"> SQL Output</span>
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
                value={sqlOutput}
                onChange={(e) => setSqlOutput(e.target.value)}
              />
            </Card.Body>
          </Card>
        )}

        {/* Error */}
        {error && (
          <Row className="justify-content-center mt-3">
            <Col md={8}>
              <Alert variant="danger" className="animate__animated animate__fadeIn">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {/* How It Works */}
        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <Card className="p-4 shadow-sm animate__animated animate__fadeIn">
              <h5 className="fw-bold mb-2"> How it works</h5>
              <ul className="text-muted small ps-3">
                <li> Upload `.csv` file with headers</li>
                <li> Converts data into clean SQL `INSERT` statements</li>
                <li> Auto-escapes single quotes and nulls</li>
                <li> Editable SQL preview with copy/download</li>
                <li> 100% browser-side conversion for privacy</li>
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Features */}
        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <Row className="g-3">
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp">
                  <h6> Instant Conversion</h6>
                  <p className="text-muted small">Convert CSV to SQL insert statements on the fly.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-1s">
                  <h6> Easy Export</h6>
                  <p className="text-muted small">Copy or download your SQL code easily.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-2s">
                  <h6> Fully Local</h6>
                  <p className="text-muted small">No uploads. Privacy preserved.</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CsvToSqlConverter;
