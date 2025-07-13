import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import 'animate.css';

const faqList = [
  {
    question: 'What is JSON?',
    answer:
      "JSON (JavaScript Object Notation) is a lightweight format used to store and transfer data. It's popular in web development for its simplicity and human-readable syntax.",
  },
  {
    question: 'How do I convert Excel to JSON?',
    answer:
      'Upload your Excel file to Convertly, and the tool will automatically convert your sheet into a structured JSON format ready for APIs or front-end development.',
  },
  {
    question: 'Is Convertly free?',
    answer:
      'Yes! All conversion tools on Convertly are completely free and open to everyone—no signup required.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. Convertly prioritizes privacy. Most conversions are handled in-browser, meaning your data never leaves your device.',
  },
  {
    question: 'What formats do you support?',
    answer:
      'Convertly supports conversions between Excel, CSV, JSON, SQL, YAML, HTML, Markdown, QR Codes, and more.',
  },
  {
    question: 'Do I need to install anything?',
    answer: 'No installation is required. All tools work directly in your browser.',
  },
  {
    question: 'Can I convert large Excel files?',
    answer:
      'Yes, Convertly can handle large Excel files and convert them into structured JSON while maintaining data integrity.',
  },
  {
    question: 'Does it support mobile?',
    answer:
      'Yes, Convertly tools are mobile-responsive and optimized for phones and tablets.',
  },
  {
    question: 'Can I export the converted data?',
    answer:
      'Yes, after conversion you can copy or download your data in the desired format instantly.',
  },
  {
    question: 'Do you provide support?',
    answer: 'You can contact us via email at support@convertly.dev for help or feedback.',
  },
];

const featureList = [
  {
    title: 'Excel ⇄ JSON',
    description:
      'Convert Excel spreadsheets (.xlsx, .xls) to JSON format and back. Ideal for developers needing structured data for APIs, dashboards, or frontend applications. Maintains cell data types and supports large files.',
  },
  {
    title: 'CSV ⇄ JSON',
    description:
      'Transform your CSV files into JSON objects for APIs or data analysis. Also supports reverse conversion from JSON to a flat CSV structure with customizable delimiters.',
  },
  {
    title: 'CSV ⇄ SQL',
    description:
      'Easily generate SQL insert statements from CSV rows for MySQL, PostgreSQL, or SQLite. Also supports converting SQL queries to downloadable CSV files.',
  },
  {
    title: 'CSV ⇄ Markdown',
    description:
      'Convert tabular CSV files into GitHub-ready Markdown tables. Also converts Markdown tables back to CSV for spreadsheet use or CSV-based APIs.',
  },
  {
    title: 'CSV ⇄ HTML Table',
    description:
      'Generate responsive HTML tables from CSV data. Perfect for embedding tables in blogs or websites, and converting HTML back into editable CSV formats.',
  },
  {
    title: 'JSON ⇄ YAML',
    description:
      'Convert structured JSON into readable YAML format and vice versa. Ideal for configuration files, CI/CD pipelines, and API data formatting.',
  },
  {
    title: 'HTML ⇄ Markdown',
    description:
      'Convert rich HTML content into clean Markdown syntax for documentation, emails, or static site generators. Includes reverse conversion too.',
  },

  {
    title: 'QR Code Generator/Scanner',
    description:
      'Create QR codes from text, links, or contact info. Use your device camera to scan QR codes live in-browser, with instant decoding.',
  },
  {
    title: 'Barcode to Text',
    description:
      'Scan barcodes using your camera and instantly extract the embedded text or numbers. Works well for inventory systems or product scanning.',
  },
  {
    title: 'Base64 ⇄ Text',
    description:
      'Easily encode text or binary data to Base64, and decode Base64 strings back to their original form. Common in image previews, data URLs, and emails.',
  },
  {
    title: 'Text ⇄ URL/HTML Encoder',
    description:
      'Securely encode text for use in URLs or HTML. Also decode encoded strings to retrieve clean, human-readable content—useful in web forms and debugging.',
  },
];

const ConversionFeaturesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 4;
  const totalPages = Math.ceil(faqList.length / faqsPerPage);
  const startIndex = (currentPage - 1) * faqsPerPage;
  const currentFaqs = faqList.slice(startIndex, startIndex + faqsPerPage);

  return (
    <>
      <Helmet>
        <title>Convertly Features | Data Converter Tools</title>
        <meta name="description" content="Explore all features of Convertly: a privacy-first data conversion toolkit supporting Excel, CSV, JSON, SQL, QR, YAML, Markdown, and more." />
        <meta name="keywords" content="data converter, csv to json, excel to json, qr generator, html validator, json to yaml, markdown converter, barcode reader" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Convertly - All Conversion Features" />
        <meta property="og:description" content="Powerful online tools to convert Excel, CSV, SQL, JSON, HTML, QR, and more. Free, fast, private." />
      </Helmet>

      <div className="py-5 bg-light animate__animated animate__fadeIn" id="top">
        <Container>
          <h1 className="text-center fw-bold mb-4 mt-5">🔧 All Conversion Features</h1>
          <p className="text-center text-muted mb-5">
            Convertly offers a wide range of data conversion tools built for speed, privacy, and ease of use. Each tool is carefully designed for developers, data analysts, and anyone working with structured data.
          </p>

          <Row className="g-4">
            {featureList.map((feature, index) => (
              <Col key={index} sm={12} md={6} lg={4} className={`animate__animated animate__fadeInUp animate__delay-${(index % 5) + 1}s`}>
                <Card className="h-100 shadow-sm border-0 feature-card transition">
                  <Card.Body>
                    <h5 className="fw-bold mb-2">{feature.title}</h5>
                    <p className="text-muted small">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* FAQ Section */}
          <div className="mt-5 pt-5 border-top">
            <h2 className="text-center fw-bold mb-4">📘 Frequently Asked Questions</h2>

            <Row className="g-4">
              {currentFaqs.map((faq, idx) => (
                <Col md={6} key={idx}>
                  <h5 className="fw-bold">{faq.question}</h5>
                  <p className="text-muted">{faq.answer}</p>
                </Col>
              ))}
            </Row>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ◀ Previous
              </button>
              <span className="align-self-center text-muted">Page {currentPage} of {totalPages}</span>
              <button
                className="btn btn-outline-secondary ms-2"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next ▶
              </button>
            </div>
          </div>
        </Container>

        <style>{`
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          }
          .transition {
            transition: all 0.3s ease-in-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default ConversionFeaturesPage;
