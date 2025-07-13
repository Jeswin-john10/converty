import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import { Helmet } from 'react-helmet';
import 'animate.css';

const QrCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [size, setSize] = useState(200);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [level, setLevel] = useState('M');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  const handleDownload = () => {
    if (!input) {
      setError('Please enter text to generate QR code.');
      return;
    }
    const canvas = canvasRef.current.querySelector('canvas');
    canvas.toBlob((blob) => {
      saveAs(blob, 'Converty-qr-code.png');
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy.');
    }
  };

  const handleClear = () => {
    setInput('');
    setCopied(false);
    setError('');
  };

  return (
    <>
      <Helmet>
        <title>QR Code Generator | Convertly</title>
        <meta
          name="description"
          content="Generate QR codes instantly with custom colors and sizes. Free, animated, browser-based QR generator with download support."
        />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center animate__animated animate__fadeInDown">QR Code Generator</h1>
        <p className="text-center text-muted mb-4">
          Enter text or a URL to instantly generate a QR code with custom options.
        </p>

        <Row className="justify-content-center mb-4">
          <Col md={8}>
            <Card className="shadow-sm animate__animated animate__fadeIn">
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter text or URL"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setError('');
                    }}
                  />
                </Form.Group>

                <Row className="g-2">
                  <Col>
                    <Form.Label>Size (px)</Form.Label>
                    <Form.Control
                      type="number"
                      min="100"
                      max="1000"
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Foreground Color</Form.Label>
                    <Form.Control
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Background Color</Form.Label>
                    <Form.Control
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </Col>
                
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {input && (
          <Row className="justify-content-center animate__animated animate__zoomIn">
            <Col md={4} className="text-center">
              <div ref={canvasRef} className="bg-white p-3 rounded shadow-sm d-inline-block">
                <QRCodeCanvas
                  value={input}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level={level}
                />
              </div>
            </Col>
          </Row>
        )}

        {error && (
          <Row className="justify-content-center mt-3">
            <Col md={6}>
              <Alert variant="danger" className="animate__animated animate__fadeIn">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        <Row className="justify-content-center mt-4">
          <Col md="auto" className="d-flex gap-2 flex-wrap justify-content-center">
            <Button variant="success" onClick={handleDownload}>
               Download PNG
            </Button>
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? '✅ Copied Input' : ' Copy Input'}
            </Button>
            <Button variant="outline-danger" onClick={handleClear}>
               Clear
            </Button>
          </Col>
        </Row>

        {/* How It Works Section */}
        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <Card className="p-4 shadow-sm animate__animated animate__fadeInUp">
              <h5 className="fw-bold mb-2">How It Works</h5>
              <ul className="text-muted small ps-3">
                <li>Enter any URL, text, or contact info into the input box.</li>
                <li>Customize the QR size, colors, and error correction level.</li>
                <li>Instantly see the QR code update live as you type.</li>
                <li>Download the QR code as a PNG image or copy the input.</li>
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
                  <h6> Customizable</h6>
                  <p className="text-muted small">Change size, colors, and error level easily.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-1s">
                  <h6> Download Ready</h6>
                  <p className="text-muted small">Download your QR code as a high-quality PNG file.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-2s">
                  <h6> Private & Secure</h6>
                  <p className="text-muted small">All processing is done in your browser.</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QrCodeGenerator;
