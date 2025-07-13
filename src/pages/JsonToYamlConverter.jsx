import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { saveAs } from 'file-saver';
import yaml from 'js-yaml';
import 'animate.css';

const JsonToYamlConverter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToYaml = () => {
    setError('');
    try {
      const jsonData = JSON.parse(jsonInput);
      const yamlData = yaml.dump(jsonData);
      setYamlOutput(yamlData);
    } catch (err) {
      setError('Invalid JSON format.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yamlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy YAML.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([yamlOutput], { type: 'text/yaml;charset=utf-8' });
    saveAs(blob, 'converty.yaml');
  };

  const handleClear = () => {
    setJsonInput('');
    setYamlOutput('');
    setError('');
  };

  return (
    <>
      <Helmet>
        <title>JSON to YAML Converter | Convertly</title>
        <meta
          name="description"
          content="Convert your JSON to YAML instantly with Convertly. Fast, browser-based, private JSON to YAML conversion tool."
        />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center mb-4 animate__animated animate__fadeInDown">JSON to YAML Converter</h1>
        <p className="text-center text-muted mb-4">
          Convert JSON to readable YAML instantly. 100% private, in-browser conversion.
        </p>

        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-sm animate__animated animate__fadeInLeft">
              <Card.Header><strong> JSON Input</strong></Card.Header>
              <Card.Body>
                <Form.Control
                  as="textarea"
                  rows={12}
                  value={jsonInput}
                  placeholder='Paste or type your JSON here...'
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm animate__animated animate__fadeInRight">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <strong> YAML Output</strong>
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
                  value={yamlOutput}
                  readOnly
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md={4} className="text-center">
            <Button
              variant="primary"
              className="px-5 py-2 mt-3 animate__animated animate__pulse animate__infinite"
              onClick={convertToYaml}
              disabled={!jsonInput}
            >
              Convert JSON to YAML
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
            <Card className="p-4 shadow-sm animate__animated animate__fadeIn">
              <h5 className="fw-bold mb-3"> How It Works</h5>
              <ul className="text-muted small ps-3">
                <li>Paste or type your JSON into the input box</li>
                <li>Click “Convert” to instantly convert it to YAML format</li>
                <li>Copy or download the YAML output for your use</li>
                <li>100% local conversion — nothing is sent to a server</li>
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
                  <h6> Fast Conversion</h6>
                  <p className="text-muted small">Get instant YAML from JSON with one click.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-1s">
                  <h6> 100% Private</h6>
                  <p className="text-muted small">Everything runs in your browser, nothing uploaded.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-2s">
                  <h6> Developer Ready</h6>
                  <p className="text-muted small">Use YAML in config files, APIs, and more.</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JsonToYamlConverter;
