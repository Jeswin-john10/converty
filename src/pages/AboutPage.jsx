import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaRocket, FaCode, FaUsers, FaHeart, FaGlobe, FaLightbulb, FaGithub } from 'react-icons/fa';
import 'animate.css';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="py-5 mt-5 bg-light animate__animated animate__fadeIn">
      <Container>
        <h1 className="text-center fw-bold mb-4">About Converty</h1>
        <p className="text-center text-muted mb-5">
          Converty is your all-in-one, open-source tool for converting data between Excel, JSON, CSV, YAML and more — right from your browser.
        </p>

        {/* What We Do Section */}
        <Row className="mb-5 g-4">
          <Col md={6} className="animate__animated animate__fadeInLeft">
            <h4 className="fw-bold"> What We Do</h4>
            <p className="text-muted">
              Converty helps developers, analysts, and everyday users transform data formats quickly and securely — no signup, no upload, no waiting.
            </p>
            <p className="text-muted">
Whether you're working with Excel files, JSON data, or CSV documents, Converty offers instant, in-browser conversion tools — no uploads, no APIs, no servers.
            </p>
          </Col>
          <Col md={6} className="animate__animated animate__fadeInRight">
            <h4 className="fw-bold"> How It Works</h4>
            <p className="text-muted">
              We use modern browser technologies to process your data directly on your device. Your files never leave your computer — keeping your information private and secure.
            </p>
            <p className="text-muted">
              All tools are powered by open-source libraries you can trust.
            </p>
          </Col>
        </Row>

        {/* Feature Cards */}
        <Row className="g-4">
          <Col md={6} lg={4} className="animate__animated animate__fadeInUp animate__delay-1s">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <FaRocket className="fs-1 text-primary mb-3" />
                <h5 className="fw-bold">Fast & Free</h5>
<p className="text-muted">
  All conversions happen in real time and are free forever for core features — no limits, no hidden charges. Premium plans available for advanced tools and priority support.
</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4} className="animate__animated animate__fadeInUp animate__delay-2s">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <FaCode className="fs-1 text-success mb-3" />
                <h5 className="fw-bold">100% Open Source</h5>
                <p className="text-muted">
                  Built with open-source NPM packages. View and contribute to the code on GitHub.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4} className="animate__animated animate__fadeInUp animate__delay-3s">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <FaUsers className="fs-1 text-warning mb-3" />
                <h5 className="fw-bold">Privacy-First</h5>
                <p className="text-muted">
                  No uploads, no tracking, no logins. Everything stays on your machine.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={6} className="animate__animated animate__fadeInUp animate__delay-4s">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <FaHeart className="fs-1 text-danger mb-3" />
                <h5 className="fw-bold">Community Powered</h5>
                <p className="text-muted">
                  Converty is shaped by your feedback, ideas, and code. Help us grow and improve.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={6} className="animate__animated animate__fadeInUp animate__delay-5s">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <FaGlobe className="fs-1 text-info mb-3" />
                <h5 className="fw-bold">Cross-Platform</h5>
                <p className="text-muted">
                  Use Converty on any device — phone, tablet, or desktop. It just works.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Final CTA */}
        <div className="text-center mt-5 animate__animated animate__fadeInUp animate__delay-6s">
          <p className="text-muted">Have an idea or want to contribute?</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
           <Link to={'/contact'} style={{textDecoration:"none"}}>
            <Button variant="primary" >
              Contact Us
            </Button></Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
