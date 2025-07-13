import React, { useRef, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Html5Qrcode } from 'html5-qrcode';
import 'animate.css';

const QrCodeScannerFromImage = () => {
  const fileInputRef = useRef(null);
  const [scannedText, setScannedText] = useState('');
  const [scanHistory, setScanHistory] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectType, setDetectType] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedImage(URL.createObjectURL(file));

    const qrCodeScanner = new Html5Qrcode("image-reader");

    qrCodeScanner
      .scanFile(file, true)
      .then((decodedText) => {
        setScannedText(decodedText);
        setScanHistory((prev) => [decodedText, ...prev]);
        setError('');
      })
      .catch((err) => {
        setError('❌ Failed to scan QR code. Please upload a clear image.');
        console.error(err);
      });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scannedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('❌ Failed to copy text.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([scannedText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'converty.txt';
    link.href = url;
    link.click();
  };

  const clearHistory = () => {
    setScannedText('');
    setScanHistory([]);
    setError('');
    setUploadedImage(null);
  };

  const isValidURL = (text) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const detectQRType = (text) => {
    if (text.startsWith('http')) return '🌐 URL';
    if (text.startsWith('BEGIN:VCARD')) return '👤 Contact Card';
    if (text.includes('@')) return '📧 Email';
    return '📄 Plain Text';
  };

  return (
    <>
      <Helmet>
        <title>QR Code Scanner from Image | Convertly</title>
        <meta
          name="description"
          content="Upload an image to scan and decode QR codes instantly. 100% private, secure, browser-based tool."
        />
      </Helmet>

      <Container className="py-5 mb-5 mt-5">
        <h1 className="text-center animate__animated animate__fadeInDown">
          QR Code Scanner
        </h1>
        <p className="text-center text-muted mb-4">
          Upload a QR code image and scan its contents in your browser. No webcam or server needed.
        </p>

        <Row className="justify-content-center mb-4">
          <Col md={8} className="text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button variant="primary" onClick={triggerFileInput} className="me-2">
              Upload QR Image
            </Button>
            <Button variant="outline-danger" onClick={clearHistory}>
               Clear History
            </Button>
          </Col>
        </Row>

        {error && (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="danger" className="animate__animated animate__fadeIn">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {scannedText && (
          <Row className="justify-content-center mb-4">
            <Col md={6}>
              <Card className="shadow-sm text-center animate__animated animate__fadeIn">
                <Card.Body>
                  <Alert variant="success">
                    ✅ Scanned:{" "}
                    {isValidURL(scannedText) ? (
                      <a href={scannedText} target="_blank" rel="noopener noreferrer">
                        {scannedText}
                      </a>
                    ) : (
                      <strong>{scannedText}</strong>
                    )}
                  </Alert>

                  {detectType && (
                    <p className="text-muted small mb-3">
                      📌 Type: <strong>{detectQRType(scannedText)}</strong>
                    </p>
                  )}

                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <Button variant="secondary" onClick={handleCopy}>
                      {copied ? '✅ Copied' : 'Copy Text'}
                    </Button>
                    <Button variant="outline-success" onClick={handleDownload}>
                      ⬇ Download
                    </Button>
                    {isValidURL(scannedText) && (
                      <Button variant="outline-primary" href={scannedText} target="_blank">
                         Open Link
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {scanHistory.length > 0 && (
          <Row className="justify-content-center mb-4">
            <Col md={6}>
              <Card className="shadow-sm animate__animated animate__fadeInUp">
                <Card.Header><strong> Scan History</strong></Card.Header>
                <Card.Body>
                  <ul className="text-muted small mb-0">
                    {scanHistory.map((text, idx) => (
                      <li key={idx}>🔁 {text}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Feature explanation & extra toggle */}
<Row className="justify-content-center mt-5">
  <Col md={10}>
    <Card className="p-4 shadow-sm animate__animated animate__fadeInUp">
      <h5 className="fw-bold mb-2"> How it works</h5>
      <ul className="text-muted small ps-3">
        <li>Click the <strong>Upload QR Image</strong> button.</li>
        <li>Select a valid image with a visible QR code.</li>
        <li>We decode the content in your browser privately – no data is sent to any server.</li>
        <li>View the scanned result instantly without installing any app.</li>
        <li>You can <strong>copy</strong>, <strong>download</strong>, or <strong>open</strong> the scanned content in one click.</li>
        <li>All scans are saved in your browser temporarily for your convenience.</li>
        <li>Use the <strong>Clear</strong> button to reset and scan a new QR code.</li>
      </ul>
    </Card>
  </Col>
</Row>

      </Container>

      {/* Required hidden element for html5-qrcode */}
      <div id="image-reader" style={{ display: 'none' }}></div>
    </>
  );
};

export default QrCodeScannerFromImage;
