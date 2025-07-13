import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const Base64ToText = () => {
  const [base64, setBase64] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const convertBase64ToText = () => {
    try {
      const decodedText = atob(base64.trim());
      setTextOutput(decodedText);
      setError('');
      setCopied(false);
    } catch (err) {
      setTextOutput('');
      setError('⚠️ Invalid Base64 string.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('❌ Failed to copy to clipboard.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([textOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converty-decoded-text.txt';
    link.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setBase64(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Helmet>
        <title>Base64 to Text Converter | Convertly</title>
        <meta
          name="description"
          content="Decode Base64 to text instantly with this online tool. Paste, convert, upload, copy, and download decoded results."
        />
      </Helmet>

      <Container className="py-5 mt-4">
        <h2 className="text-center mb-4 mt-5 animate__animated animate__fadeInDown">
           Base64 to Text Converter
        </h2>
        <p className="text-center text-muted animate__animated animate__fadeIn">
          Paste or upload a Base64 string to decode it into plain text.
        </p>

        {error && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Alert variant="danger" className="animate__animated animate__fadeIn">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow-sm animate__animated animate__fadeInUp">
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Base64</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={base64}
                    onChange={(e) => setBase64(e.target.value)}
                    placeholder="Paste your Base64 string here..."
                  />
                </Form.Group>

                <div className="d-flex gap-2 flex-wrap mb-3">
                  <Button variant="primary" onClick={convertBase64ToText}>
                    Convert
                  </Button>
                  <Button variant="outline-secondary" onClick={() => fileInputRef.current.click()}>
                    Upload File
                  </Button>
                  <input
                    type="file"
                    accept=".txt"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                </div>

                {textOutput && (
                  <>
                    <Form.Group className="mt-4">
                      <Form.Label>Decoded Text</Form.Label>
                      <Form.Control as="textarea" rows={5} readOnly value={textOutput} />
                    </Form.Group>

                    <div className="d-flex gap-2 mt-3 flex-wrap">
                      <Button variant="success" onClick={handleCopy}>
                        {copied ? '✅ Copied' : ' Copy Text'}
                      </Button>
                      <Button variant="outline-info" onClick={handleDownload}>
                        Download Text
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Explanation Section */}
        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <Card className="p-4 shadow-sm animate__animated animate__fadeInUp">
              <h5 className="fw-bold mb-2"> How It Works</h5>
              <ul className="text-muted small ps-3">
                <li>Paste or upload any Base64-encoded string.</li>
                <li>Click "Convert" to decode it into readable text.</li>
                <li>Copy or download the result with one click.</li>
                <li>No data is sent to any server. It works 100% in your browser.</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Base64ToText;
