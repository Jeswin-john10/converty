import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import 'animate.css';

const ContactPage = () => {
  return (
    <div className="py-5 mt-5 bg-light animate__animated animate__fadeIn">
      <Container>
        <h1 className="text-center fw-bold mb-4">Contact Us</h1>
        <p className="text-center text-muted mb-5">
          Have a question, feature request, or want to support Converty? We're happy to hear from you.
        </p>

        <Row className="g-4">
          <Col md={6} className="animate__animated animate__fadeInLeft">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="How can we help?" />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="animate__animated animate__fadeInRight">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h5 className="fw-bold mb-3">Contact Info</h5>
                <p><FaEnvelope className="me-2 text-primary" /> <a href="mailto:support@convertly.app">support@converty.app</a></p>
                <p><FaPhoneAlt className="me-2 text-primary" /> +91 9876 543 210 (Support Email Preferred)</p>
                <p><FaMapMarkerAlt className="me-2 text-primary" /> India (Remote)</p>

                <hr />

                <h6 className="text-muted mb-3">
                  You can also reach us for sponsorships, contributions, or bug reports.
                </h6>

                <div className="d-flex gap-3 mt-3">
                  <a href="https://instagram.com/converty" target="_blank" rel="noopener noreferrer" title="Instagram">
                    <FaInstagram size={24} className="text-danger hover-opacity" />
                  </a>
                  <a href="https://twitter.com/converty" target="_blank" rel="noopener noreferrer" title="Twitter">
                    <FaTwitter size={24} className="text-info hover-opacity" />
                  </a>
                  <a href="https://github.com/converty" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <FaGithub size={24} className="text-dark hover-opacity" />
                  </a>
                  <a href="https://linkedin.com/company/convertly" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <FaLinkedin size={24} className="text-primary hover-opacity" />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        .hover-opacity:hover {
          opacity: 0.7;
          transition: opacity 0.3s;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
