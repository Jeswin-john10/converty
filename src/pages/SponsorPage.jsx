import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiUsers, FiStar, FiGift, FiSmile, FiMail, FiLink, FiMonitor } from 'react-icons/fi';
import 'animate.css';

const SponsorPage = () => {
  return (
    <Container className="py-5 my-5 animate__animated animate__fadeIn">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">Become a Converty Sponsor </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '720px' }}>
          Support Converty and empower data conversion tools. Your sponsorship fuels innovation and gives your brand visibility among thousands of developers.
        </p>
        <Button
          variant="success"
          size="lg"
          href="mailto:sponsor@convertly.app?subject=Sponsorship%20Inquiry"
          className="mt-3"
        >
          <FiMail className="me-2" /> Sponsor Us via Email 
        </Button>
      </div>

      {/* About Sponsorship */}
      <section className="mb-5 text-center">
        <h2 className="fw-bold mb-4">Why Sponsor Converty?</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>
          Converty is a free and platform that makes converting Excel, JSON, CSV, and YAML files easy for developers, students, and data teams.
          With over <strong>thousands of monthly users</strong> and growing, sponsoring us offers an opportunity to connect with a passionate tech audience.
        </p>
      </section>

      {/* Sponsorship Benefits */}
      <Row className="g-4 mb-5">
        <Col md={6} lg={3} className="animate__animated animate__fadeInUp">
          <Card className="h-100 shadow-sm border-0 text-center">
            <Card.Body>
              <FiStar className="fs-1 text-warning mb-3" />
              <h5>Brand Exposure</h5>
              <p className="text-muted">Your logo featured on our site + backlinks, with visibility across our documentation and tools.</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="animate__animated animate__fadeInUp animate__delay-1s">
          <Card className="h-100 shadow-sm border-0 text-center">
            <Card.Body>
              <FiUsers className="fs-1 text-info mb-3" />
              <h5>Reach Developers</h5>
              <p className="text-muted">Engage with thousands of developers, analysts, and product builders every month.</p>
            </Card.Body>
          </Card>
        </Col>

     <Col md={6} lg={3} className="animate__animated animate__fadeInUp animate__delay-3s">
  <Card className="h-100 shadow-sm border-0 text-center">
    <Card.Body>
      <FiMonitor className="fs-1 text-warning mb-3" />
      <h5>Ad Placement Spotlight</h5>
      <p className="text-muted">
Your brand, your way. Sponsors can run custom ads across the Converty site — including banners, callouts, or featured mentions — to reach thousands of data-focused users daily.      </p>
    </Card.Body>
  </Card>
</Col>


        <Col md={6} lg={3} className="animate__animated animate__fadeInUp animate__delay-3s">
          <Card className="h-100 shadow-sm border-0 text-center">
            <Card.Body>
              <FiSmile className="fs-1 text-success mb-3" />
              <h5>Support Innovation</h5>
              <p className="text-muted">Enable us to keep Converty free, fast, and open to the community. Your impact is real.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quote/Testimonial */}
      <section className="text-center mb-5 animate__animated animate__fadeInUp animate__delay-2s">
        <blockquote className="blockquote px-4 mx-auto" style={{ maxWidth: '700px' }}>
          <p className="lead fst-italic text-muted">
            “Converty solves a real-world problem with elegance. Sponsoring them gives us purpose and reach at the same time.”
          </p>
          <footer className="blockquote-footer mt-3">A Happy Sponsor</footer>
        </blockquote>
      </section>

      {/* CTA */}
      <div className="text-center mt-4 animate__animated animate__fadeInUp animate__delay-3s">
        <h4 className="fw-bold mb-3">Let’s Build Together </h4>
        <p className="text-muted mb-4">
          Whether you’re a startup or a big company, we’d love to hear from you. Let’s create something meaningful for the developer community.
        </p>
        <Button
          variant="outline-success"
          size="lg"
          href="mailto:sponsor@converty.app?subject=Convertly%20Sponsorship"
        >
          <FiMail className="me-2" /> Get in Touch
        </Button>
      </div>
      <div className="text-center mt-5 animate__animated animate__fadeInUp animate__delay-3s">
  <h4 className="mb-3">Custom Ad Spots for Sponsors</h4>
  <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
    As a Converty sponsor, you get more than just recognition. We'll display your custom ads or announcements in strategic locations on our site — headers, footers, or converter pages — tailored to your preferred day or event. Promote launches, discounts, hiring, and more!
  </p>
 <Button 
  variant="outline-primary" 
  size="lg" 
  href="mailto:sponsor@converty.app?subject=Sponsorship%20Ad%20Inquiry"
>
  Become a Sponsor
</Button>

</div>

    </Container>
  );
};

export default SponsorPage;
