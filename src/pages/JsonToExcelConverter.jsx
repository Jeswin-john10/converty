import React, { useState } from 'react';
import { Container, Button, Form, Row, Col, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import 'animate.css';

const JsonToExcelConverter = () => {
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDownload = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      if (!Array.isArray(parsedData)) {
        setError('JSON must be an array of objects.');
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(parsedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'converty.xlsx');
      setError('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Invalid JSON format. Make sure it is a valid JSON array.');
    }
  };

  const handleClear = () => {
    setJsonData('');
    setError('');
  };

  return (
    <>
      <Helmet>
        <title>JSON to Excel Converter | Convertly</title>
        <meta
          name="description"
          content="Convert JSON data to Excel .xlsx format instantly. Easy, free, and works in your browser. Download Excel files with a single click!"
        />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center mb-4 animate__animated animate__fadeInDown"> JSON to Excel Converter</h1>
        <p className="text-center text-muted mb-4">
          Paste your JSON data below to instantly download an Excel (.xlsx) file.
        </p>

        {/* JSON Input Box */}
        <Row className="justify-content-center mb-3">
          <Col md={10}>
            <Card className="shadow-sm animate__animated animate__fadeInUp">
              <Card.Header className="fw-bold"> Input JSON Data</Card.Header>
              <Card.Body>
                <Form.Control
                  as="textarea"
                  rows={15}
                  placeholder='Paste JSON array here, e.g. [{"name":"John","age":30}]'
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  className="font-monospace"
                />
                <div className="d-flex gap-2 justify-content-end mt-3">
                  <Button variant="success" onClick={handleDownload}>
                    Download Excel
                  </Button>
                  <Button variant="outline-danger" onClick={handleClear}>
                     Clear
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Success & Error Alerts */}
        <Row className="justify-content-center">
          <Col md={8}>
            {error && (
              <Alert variant="danger" className="animate__animated animate__fadeIn">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="animate__animated animate__fadeIn">
                ✅ Excel file downloaded successfully!
              </Alert>
            )}
          </Col>
        </Row>

        {/* How It Works */}
        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <Card className="p-4 shadow-sm animate__animated animate__fadeIn">
              <h5 className="fw-bold mb-2"> How it works</h5>
              <ul className="text-muted small ps-3">
                <li> Paste your JSON data in array format</li>
                <li> Make sure it's an array of objects</li>
                <li> Click "Download Excel" to generate `.xlsx` file</li>
                <li> No data is uploaded — it's all in your browser!</li>
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Features */}
        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <Row className="g-3">
              <Col md={4}>
                <Card className="text-center p-3 h-100 shadow-sm animate__animated animate__fadeInUp">
                  <h6> Instant Export</h6>
                  <p className="text-muted small">Download Excel in seconds from your JSON input.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
                  <h6> Fully Local</h6>
                  <p className="text-muted small">All processing happens in your browser — private and fast.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-3 h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
                  <h6> Developer Friendly</h6>
                  <p className="text-muted small">Paste any valid JSON array and convert without fuss.</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JsonToExcelConverter;
