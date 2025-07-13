import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'animate.css';

const conversionTools = [
  { name: "Excel ⇄ JSON", path: "/excel-to-json" },
  { name: "JSON ⇄ Excel", path: "/json-to-excel" },
  { name: "CSV ⇄ JSON", path: "/csv-to-json" },
  { name: "CSV ⇄ Markdown", path: "/csv-to-markdown" },
  { name: "CSV ⇄ SQL", path: "/csv-to-sql" },
  { name: "CSV ⇄ HTML Table", path: "/csv-to-html" },
  { name: "JSON ⇄ YAML", path: "/json-to-yaml" },
  { name: "HTML ⇄ Markdown", path: "/html-to-markdown" },

  { name: "QR Code Generator", path: "/qr-generator" },
  { name: "QR Code Scanner", path: "/qr-scanner" },
  { name: "Barcode to Text", path: "/barcode-to-text" },
  { name: "Base64 ⇄ Text", path: "/base64-decode" },
  { name: "Text ⇄ URL/HTML Encoder", path: "/text-encoder" }
];

const ToolListPage = () => {
  return (
    <div className="py-5 mt-4 bg-light animate__animated animate__fadeIn">
      <Helmet>
        <title>All Tools – Convertly | Free Online Format Converters</title>
        <meta
          name="description"
          content="Browse all data conversion tools by Convertly. Convert CSV, Excel, JSON, Markdown, YAML, QR codes, Base64, and more instantly, for free."
        />
        <link rel="canonical" href="https://convertly.app/all-convertion-tool" />
      </Helmet>

      <Container>
        <h1 className="text-center fw-bold mb-4 mt-4"> All Conversion Tools</h1>
        <p className="text-center text-muted mb-5">
          Instantly convert data between various formats. Fast, private, and easy to use—powered by open-source tools.
        </p>

        <Row className="g-4">
          {conversionTools.map((tool, index) => (
            <Col
              key={tool.path}
              sm={12}
              md={6}
              lg={4}
              className={`animate__animated animate__fadeInUp animate__delay-${(index % 5) + 1}s`}
            >
              <Card className="h-100 border-0 shadow-sm hover-shadow transition">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <h2 className="h5 fw-bold">{tool.name}</h2>
                  <div className="mt-3">
                    <Link to={tool.path}>
                      <Button variant="primary" className="w-100" aria-label={`Open ${tool.name} Tool`}>
                        Open Tool
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }
        .transition {
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ToolListPage;
