import React, { useState } from 'react';
import { Container, Card, Button, Pagination, Row, Col, Collapse } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FiMessageSquare } from 'react-icons/fi';

const faqData = [
  {
    question: 'What is JSON?',
    answer: 'JSON (JavaScript Object Notation) is a lightweight data format used for data interchange between systems, especially in APIs.',
  },
  {
    question: 'How do I convert Excel to JSON?',
    answer: 'Upload your Excel file in .xls or .xlsx format and Converty will automatically convert it to structured JSON format.',
  },
  {
    question: 'Is Converty free?',
    answer: 'Yes, the basic tools are completely free with unlimited usage. Premium tiers offer more features.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'Converty supports Excel, CSV, JSON, SQL, YAML, Markdown, HTML, Base64, and more.',
  },
  {
    question: 'Does Converty store my data?',
    answer: 'No, Converty is privacy-first and processes data entirely in the browser without uploading it to any server.',
  },
  {
    question: 'Can I scan QR codes on Converty?',
    answer: 'Yes! Use your camera to scan QR codes directly in your browser.',
  },
  {
    question: 'What is Base64 encoding?',
    answer: 'Base64 is a way to encode binary data (like images) into text so it can be easily transmitted over text-based formats.',
  },
  {
    question: 'Do I need to install anything?',
    answer: 'No installation is required. Converty works entirely online in your browser.',
  },
  {
    question: 'What is CSV?',
    answer: 'CSV (Comma Separated Values) is a plain-text format used to store tabular data.',
  },
  {
    question: 'How do I convert Markdown to HTML?',
    answer: 'Paste your Markdown and Converty will convert it to clean HTML code for your website or blog.',
  },
  {
    question: 'Can I validate HTML and CSS?',
    answer: 'Yes. Use the HTML & CSS Validator tool to check your code for errors and outdated tags.',
  },
  {
    question: 'Is there a limit to file size?',
    answer: 'In the Free plan, file size is limited to 5MB. Premium plans support larger files.',
  },
  {
    question: 'Is API access available?',
    answer: 'Yes. Premium and Business plans offer API access for integration with your apps.',
  },
  {
    question: 'Can I download the converted data?',
    answer: 'Yes. All tools offer options to copy or download the converted file in one click.',
  },
  {
    question: 'What’s the difference between Free and Premium?',
    answer: 'Premium offers advanced converters, file history, API access, and priority support.',
  },
  {
    question: 'Is Converty safe for sensitive data?',
    answer: 'Yes. Since everything runs in-browser, your data never leaves your computer.',
  },
  {
    question: 'What is YAML?',
    answer: 'YAML (YAML Ain’t Markup Language) is a human-friendly data format often used in configuration files.',
  },
  {
    question: 'Can I use Converty on mobile?',
    answer: 'Yes, Converty is fully responsive and mobile-friendly.',
  },
  {
    question: 'How to report a bug or request a feature?',
    answer: 'Email us or use the contact form at the bottom of the page.',
  }
 
];

const ITEMS_PER_PAGE = 8;

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const paginatedFaq = faqData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(faqData.length / ITEMS_PER_PAGE);

  return (
    <>
      <Helmet>
        <title>FAQ | Converty - Data Conversion Tools</title>
        <meta
          name="description"
          content="Frequently asked questions about Convertly data conversion tools including Excel to JSON, CSV to SQL, QR scanning and more."
        />
      </Helmet>

      <Container className="py-5 mt-5">
        <h1 className="text-center mb-4 animate__animated animate__fadeInDown">❓ Frequently Asked Questions</h1>
        <p className="text-center text-muted mb-5">All your questions about Convertly answered in one place.</p>

        <Row className="g-4">
          {paginatedFaq.map((item, index) => {
            const realIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
            return (
              <Col key={realIndex} sm={12}>
                <Card className="shadow-sm border-0 mb-3">
                  <Card.Header
                    onClick={() => handleToggle(realIndex)}
                    className="fw-bold bg-white"
                    style={{ cursor: 'pointer' }}
                    aria-expanded={activeIndex === realIndex}
                  >
                    {item.question}
                  </Card.Header>
                  <Collapse in={activeIndex === realIndex}>
                    <div>
                      <Card.Body className="text-muted small">{item.answer}</Card.Body>
                    </div>
                  </Collapse>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>

        {/* Developer Help Section */}
        <div className="text-center mt-5">
          <p className="text-muted">
            Still need help? Reach out to us at{' '}
            <a href="mailto:support@convertly.app">support@convertly.app</a>
          </p>
          <Button as={Link} to="/faq" variant="outline-primary" size="lg" className="px-4">
            <FiMessageSquare className="me-2" /> Need different answers?
          </Button>
        </div>
      </Container>
    </>
  );
};

export default FaqPage;
