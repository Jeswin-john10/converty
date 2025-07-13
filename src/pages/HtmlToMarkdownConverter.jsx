import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import showdown from 'showdown';
import { saveAs } from 'file-saver';
import 'animate.css';

const HtmlToMarkdownConverter = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [markdownOutput, setMarkdownOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const converter = new showdown.Converter({ simpleLineBreaks: true });

  const handleConvert = () => {
    try {
      const markdown = converter.makeMarkdown(htmlInput);
      setMarkdownOutput(markdown);
      setError('');
    } catch {
      setError('Conversion failed. Please check your HTML input.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdownOutput], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, 'converty.md');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith('.html')) {
      setError('Please upload a valid HTML file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setHtmlInput(event.target.result);
      setMarkdownOutput('');
    };
    reader.readAsText(file);
  };
const handleClear = () => {
  setHtmlInput('');
  setMarkdownOutput('');
  setCopied(false);
  setError('');
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
};

  return (
    <>
      <Helmet>
        <title>HTML to Markdown Converter | Convertly</title>
        <meta name="description" content="Convert HTML code into clean Markdown format instantly. Simple, browser-based HTML to Markdown converter." />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center animate__animated animate__fadeInDown"> HTML to Markdown Converter</h1>
        <p className="text-center text-muted mb-4">
          Paste or upload HTML to get clean Markdown instantly. 100% private, runs in your browser.
        </p>

        <Row className="justify-content-center mb-4">
          <Col md={6} className="text-center">
            <input
              type="file"
              ref={fileInputRef}
              accept=".html"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <Button
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              className="animate__animated animate__pulse animate__infinite"
            >
               Upload HTML File
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card className="shadow-sm animate__animated animate__fadeIn">
              <Card.Header className="fw-bold">HTML Input</Card.Header>
              <Card.Body>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="<h1>Hello</h1><p>This is HTML.</p>"
                  value={htmlInput}
                  onChange={(e) => setHtmlInput(e.target.value)}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm animate__animated animate__fadeIn">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <strong>Markdown Output</strong>
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
                <Form.Control as="textarea" rows={10} value={markdownOutput} readOnly />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3 text-center">
          <Col>
            <Button variant="success" onClick={handleConvert}>
               Convert HTML to Markdown
            </Button>
          </Col>
        </Row>

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
        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <Card className="p-4 shadow-sm animate__animated animate__fadeInUp">
              <h5 className="fw-bold mb-2"> How it works</h5>
              <ul className="text-muted small ps-3">
                <li>Paste your raw HTML code or upload an `.html` file</li>
                <li>Click Convert to see equivalent Markdown output</li>
                <li>Copy or download the Markdown result instantly</li>
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
                  <h6> Clean Markdown</h6>
                  <p className="text-muted small">Preserves structure and formatting.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-1s">
                  <h6> File Upload</h6>
                  <p className="text-muted small">Supports .html files and direct paste.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-2s">
                  <h6> 100% Private</h6>
                  <p className="text-muted small">Runs entirely in your browser – no uploads.</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HtmlToMarkdownConverter;
