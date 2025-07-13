import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import 'animate.css';

const CsvToHtmlTableConverter = () => {
  const [htmlTable, setHtmlTable] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const convertToHtml = (data) => {
    if (!data || !data.length) return '';

    const headers = Object.keys(data[0]);
    const headerRow = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    const bodyRows = data
      .map(row => `<tr>${headers.map(h => `<td>${row[h] ?? ''}</td>`).join('')}</tr>`) 
      .join('\n');

    return `<table border="1">\n<thead>\n${headerRow}\n</thead>\n<tbody>\n${bodyRows}\n</tbody>\n</table>`;
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
          const html = convertToHtml(results.data);
          setHtmlTable(html);
        } catch {
          setError('Failed to convert CSV to HTML.');
        }
      },
      error: () => {
        setError('Error reading CSV file.');
      },
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlTable);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy HTML.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlTable], { type: 'text/html;charset=utf-8' });
    saveAs(blob, 'converty.html');
  };

  const handleClear = () => setHtmlTable('');

  return (
    <>
      <Helmet>
        <title>CSV to HTML Table Converter | Convertly</title>
        <meta
          name="description"
          content="Convert CSV to clean, downloadable HTML tables instantly. Fully private & browser-based CSV to HTML table converter tool."
        />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center mb-4 animate__animated animate__fadeInDown"> CSV to HTML Table Converter</h1>
        <p className="text-center text-muted mb-4">
          Convert CSV files into beautiful HTML tables in your browser. No upload needed.
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

        {htmlTable && (
          <Card className="shadow-sm animate__animated animate__fadeInUp">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong> HTML Table Output</strong>
              <div className="d-flex gap-2">
                <Button size="sm" variant="outline-secondary" onClick={handleCopy}>
                  {copied ? '✅ Copied' : 'Copy'}
                </Button>
                <Button size="sm" variant="outline-success" onClick={handleDownload}>
                  Download
                </Button>
                <Button size="sm" variant="outline-danger" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Control
                as="textarea"
                rows={12}
                value={htmlTable}
                onChange={(e) => setHtmlTable(e.target.value)}
              />
            </Card.Body>
          </Card>
        )}

        {error && (
          <Row className="justify-content-center mt-3">
            <Col md={8}>
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        )}
        {/* How it Works Section */}
<Row className="justify-content-center mt-5">
  <Col md={10}>
    <Card className="p-4 shadow-sm animate__animated animate__fadeIn">
      <h5 className="fw-bold mb-3"> How It Works</h5>
      <ul className="text-muted small ps-3">
        <li> Upload a valid <code>.csv</code> file from your computer</li>
        <li> The tool automatically parses your file using <code>Papaparse</code></li>
        <li> Converts rows into a styled HTML table with header and data rows</li>
        <li> You can copy, download or edit the resulting HTML table markup</li>
        <li> Everything is processed inside your browser — no server, no data sent</li>
      </ul>
    </Card>
  </Col>
</Row>

{/* Features Section */}
<Row className="justify-content-center mt-4">
  <Col md={10}>
    <Row className="g-3">
      <Col md={4}>
        <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp">
          <h6>HTML Table Generator</h6>
          <p className="text-muted small">Transforms CSV files into clean HTML table elements.</p>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-1s">
          <h6> Easy Export</h6>
          <p className="text-muted small">Download the converted HTML as a standalone file.</p>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-2s">
          <h6> Private Conversion</h6>
          <p className="text-muted small">All operations are local in your browser. No uploads.</p>
        </Card>
      </Col>
    </Row>
  </Col>
</Row>

      </Container>
    </>
  );
};

export default CsvToHtmlTableConverter;
