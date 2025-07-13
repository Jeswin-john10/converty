import React, { useRef, useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { Html5Qrcode } from 'html5-qrcode';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const BarcodeTool = () => {
  const [barcodeText, setBarcodeText] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const barcodeRef = useRef(null);
  const scannerRef = useRef(null);
  const barcodeSvgWrapper = useRef(null);

  useEffect(() => {
    if (barcodeText && barcodeRef.current) {
      JsBarcode(barcodeRef.current, barcodeText, {
        format: 'CODE128',
        displayValue: true,
        lineColor: "#007bff",
        width: 2,
        height: 80,
        fontSize: 16,
        background: '#ffffff',
        margin: 10,
      });
    }
  }, [barcodeText]);

  const startScanner = async () => {
    if (scanning || scannerRef.current) return;

    setError('');
    setScanning(true);
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText) => {
          setScanResult(decodedText);
          stopScanner();
        },
        (err) => {
          console.warn("Scanning error", err);
        }
      );
    } catch (err) {
      setError('❌ Failed to start scanner. Please allow camera access.');
      console.error(err);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        scannerRef.current.clear();
        scannerRef.current = null;
        setScanning(false);
      });
    }
  };

  const clearAll = () => {
    setBarcodeText('');
    setScanResult('');
    setError('');
    stopScanner();
  };

  const downloadBarcode = () => {
    if (!barcodeText || !barcodeSvgWrapper.current) return;
    html2canvas(barcodeSvgWrapper.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'converty-barcode.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const qrCodeScanner = new Html5Qrcode("reader");
    qrCodeScanner
      .scanFile(file, true)
      .then((decodedText) => {
        setScanResult(decodedText);
        setError('');
      })
      .catch((err) => {
        console.error(err);
        setError('❌ Failed to read barcode from image.');
      });
  };

  return (
    <>
      <Helmet>
        <title>Barcode Generator & Scanner | Convertly</title>
        <meta
          name="description"
          content="Generate, download, and scan barcodes online with Convertly. All-in-one browser-based barcode tool with camera and upload support."
        />
      </Helmet>

      <Container className="py-5 mt-4">
        <h2 className="text-center mb-4 mt-5 animate__animated animate__fadeInDown">
           Barcode Generator & Scanner
        </h2>
        <p className="text-center text-muted mb-4 animate__animated animate__fadeIn">
          Create, scan, and download barcodes instantly in your browser.
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

        <Row>
          {/* Generator */}
          <Col md={6} className="mb-4 animate__animated animate__fadeInLeft">
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="fw-bold mb-3"> Generate Barcode</h5>
                <Form.Group controlId="barcodeText">
                  <Form.Control
                    type="text"
                    placeholder="Enter text to generate barcode"
                    value={barcodeText}
                    onChange={(e) => {
                      setBarcodeText(e.target.value);
                      setError('');
                    }}
                  />
                </Form.Group>

                <div ref={barcodeSvgWrapper} className="text-center mt-4">
                  {barcodeText ? (
                    <svg ref={barcodeRef}></svg>
                  ) : (
                    <p className="text-muted small">Generated barcode will appear here</p>
                  )}
                </div>

                <div className="mt-3 d-flex gap-2 flex-wrap justify-content-center">
                  <Button variant="success" onClick={downloadBarcode} disabled={!barcodeText}>
                     Download PNG
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Scanner */}
          <Col md={6} className="animate__animated animate__fadeInRight">
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="fw-bold mb-3"> Scan Barcode</h5>
                <div id="reader" style={{ width: '100%', height: '250px' }} className="border mb-3"></div>
                <div className="d-flex gap-2 flex-wrap mb-3">
                  <Button variant="primary" onClick={startScanner} disabled={scanning}>
                    {scanning ? '🔄 Scanning...' : ' Start Scanner'}
                  </Button>
                  <Button variant="outline-danger" onClick={stopScanner} disabled={!scanning}>
                    🛑 Stop Scanner
                  </Button>
                </div>
                <Form.Group controlId="uploadBarcode" className="mb-3">
                  <Form.Label className="fw-bold">Or Upload Barcode Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                </Form.Group>
                {scanResult && (
                  <Alert variant="success" className="animate__animated animate__fadeInUp">
                    ✅ Scanned: <strong>{scanResult}</strong>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* How it Works */}
        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <Card className="p-4 shadow-sm animate__animated animate__fadeInUp">
              <h5 className="fw-bold mb-2"> How It Works</h5>
              <ul className="text-muted small ps-3">
                <li> Enter text to generate a barcode instantly.</li>
                <li> Click “Download” to save your barcode as PNG.</li>
                <li> Use the camera to scan barcodes live or upload an image.</li>
                <li> 100% client-side: no server, no data saved.</li>
              </ul>
              <Button variant="outline-secondary" onClick={clearAll} className="mt-3">
                Clear All
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BarcodeTool;
