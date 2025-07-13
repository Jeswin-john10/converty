import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const TextEncoderTool = () => {
  const [text, setText] = useState('');
  const [urlEncoded, setUrlEncoded] = useState('');
  const [htmlEncoded, setHtmlEncoded] = useState('');
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  const encodeText = () => {
    if (!text.trim()) {
      setError('Please enter some text to encode.');
      return;
    }
    setError('');
    const urlSafe = encodeURIComponent(text);
    const htmlSafe = text.replace(/[\u00A0-\u9999<>\&"'`]/gim, (i) => `&#${i.charCodeAt(0)};`);
    setUrlEncoded(urlSafe);
    setHtmlEncoded(htmlSafe);
    setCopied('');
  };

  const handleCopy = (type) => {
    const value = type === 'url' ? urlEncoded : htmlEncoded;
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const clearAll = () => {
    setText('');
    setUrlEncoded('');
    setHtmlEncoded('');
    setCopied('');
    setError('');
  };

  return (
    <>
      <Helmet>
        <title>Text to URL/HTML Encoder | Convertly</title>
        <meta
          name="description"
          content="Convert plain text into URL-encoded or HTML-encoded formats instantly. Use this free developer tool online."
        />
      </Helmet>

      <Container className="py-5 mt-4">
        <h2 className="text-center mb-4 mt-5 animate__animated animate__fadeInDown">
           Text to URL/HTML Encoder
        </h2>
        <p className="text-center text-muted animate__animated animate__fadeIn">
          Convert your plain text into safe formats for use in URLs and HTML documents.
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
                  <Form.Label>Enter Plain Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex gap-2 flex-wrap mb-4">
                  <Button variant="primary" onClick={encodeText}>
                     Encode
                  </Button>
                  <Button variant="outline-secondary" onClick={clearAll}>
                     Clear
                  </Button>
                </div>

                {urlEncoded && (
                  <Form.Group className="mt-3">
                    <Form.Label> URL Encoded</Form.Label>
                    <Form.Control as="textarea" rows={3} readOnly value={urlEncoded} />
                    <Button
                      variant="success"
                      className="mt-2"
                      onClick={() => handleCopy('url')}
                    >
                      {copied === 'url' ? '✅ Copied' : ' Copy URL Encoded'}
                    </Button>
                  </Form.Group>
                )}

                {htmlEncoded && (
                  <Form.Group className="mt-4">
                    <Form.Label> HTML Encoded</Form.Label>
                    <Form.Control as="textarea" rows={3} readOnly value={htmlEncoded} />
                    <Button
                      variant="success"
                      className="mt-2"
                      onClick={() => handleCopy('html')}
                    >
                      {copied === 'html' ? '✅ Copied' : ' Copy HTML Encoded'}
                    </Button>
                  </Form.Group>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <Card className="p-4 shadow-sm animate__animated animate__fadeInUp">
              <h5 className="fw-bold mb-2"> How It Works</h5>
              <ul className="text-muted small ps-3">
                <li>Type or paste any plain text into the input field.</li>
                <li>Click "Encode" to convert it into URL-safe and HTML-safe formats.</li>
                <li>Copy the results for use in web development or programming.</li>
                <li>All processing is done in your browser — safe & private.</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TextEncoderTool;
