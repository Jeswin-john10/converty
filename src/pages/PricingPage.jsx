import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ToggleButtonGroup, ToggleButton, Badge } from 'react-bootstrap';
import { FiCheckCircle, FiXCircle, FiZap, FiStar, FiBriefcase, FiClock } from 'react-icons/fi';
import 'animate.css';
import {
  FiShield,
  FiDollarSign,
  FiActivity,
  FiFile,
  FiChrome,
  FiPlusCircle,
  FiMessageSquare
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
const PricingPage = () => {
  const [billing, setBilling] = useState('monthly');

  const pricingData = {
    free: {
      title: "Free",
      price: "₹0",
      period: "Forever free",
      features: [
        { text: "Excel ⇄ JSON Conversion", available: true },
        { text: "CSV ⇄ JSON Conversion", available: true },
        { text: "QR Code Generator", available: true },
                { text: "Other 5+ Tools", available: true },
        { text: "No Bulk Uploading", available: false },

        { text: "Basic Text Tools", available: true },
        { text: "Unlimited Conversions", available: true },
        { text: "Community Support", available: true },
          { text: "Web-based (no installation)", available: true },
      { text: "Secure processing (files never stored)", available: true },
        { text: "File History", available: false },
        { text: "Advanced Converters", available: false },
        { text: "Priority Support", available: false }
      ],
      cta: "Start Converting Now",
      variant: "outline-primary"
    },
    premium: {
      title: "Premium",
      price: billing === 'yearly' ? "₹999" : "₹89",
      period: billing === 'yearly' ? "per year (Save 43%)" : "per month",
      features: [
        { text: "All Free Features", available: true },
        { text: "JSON ⇄ YAML Conversion", available: true },
        { text: "CSV ⇄ SQL Conversion", available: true },
        { text: "HTML ⇄ Markdown", available: true },
                        { text: "Other  Tools", available: true },
        { text: "Bulk Uploading", available: true },

        { text: "Unlimited Conversions", available: true },
        { text: "File History (30 days)", available: true },
        { text: "Ad-Free Experience", available: true },
        { text: "Priority Email Support", available: true },
        { text: "Batch Processing", available: true },
             { text: "Web-based (no installation)", available: true },
      { text: "Secure processing (files never stored)", available: true }
      ],
      cta: "Get Premium",
      variant: "success",
      popular: true
    },
    business: {
      title: "Business",
      price: "Custom",
      period: "Tailored for teams",
      features: [
        { text: "All Premium Features", available: true },
        { text: "Unlimited File Processing", available: true },
        { text: "Extended File History (1 year)", available: true },
        { text: "Dedicated Account Manager", available: true },
        { text: "Custom Converters", available: true },
        { text: "24/7 Priority Support", available: true },
        { text: "Team Management", available: true },
             { text: "Web-based (no installation)", available: true },
      { text: "Secure processing (files never stored)", available: true },
      ],
      cta: "Contact Sales",
      variant: "dark"
    }
  };

  const FeatureItem = ({ available, text }) => (
    <li className="d-flex align-items-start mb-2">
      {available ? 
        <FiCheckCircle className="text-success mt-1 me-2" /> : 
        <FiXCircle className="text-danger mt-1 me-2" />
      }
      <span>{text}</span>
    </li>
  );

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3 animate__animated animate__fadeInDown">
          💎 Choose Your Perfect Plan
        </h2>
        <p className="lead text-muted animate__animated animate__fadeIn">
          Powerful data conversion tools for everyone
        </p>

        {/* Billing Toggle */}
        <div className="d-flex justify-content-center my-4">
          <ToggleButtonGroup type="radio" name="billing" value={billing} onChange={setBilling}>
            <ToggleButton id="tbg-radio-1" value="monthly" variant="outline-secondary">
              Monthly Billing
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" value="yearly" variant="outline-secondary">
              Yearly Billing (Save 43%)
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <Row className="g-4">
        {/* Free Plan */}
        <Col lg={4}>
          <Card className="h-100 border-primary border-2 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <FiZap className="fs-3 text-primary me-2" />
                  <h4 className="fw-bold text-primary mb-0">{pricingData.free.title}</h4>
                </div>
                <h1 className="display-5 fw-bold my-3">{pricingData.free.price}</h1>
                <p className="text-muted">{pricingData.free.period}</p>
              </div>
              
              <ul className="list-unstyled mb-4 flex-grow-1">
                {pricingData.free.features.map((feature, index) => (
                  <FeatureItem key={index} available={feature.available} text={feature.text} />
                ))}
              </ul>
              
              <Button variant={pricingData.free.variant} size="lg" className="w-100">
          <Link to={'/'} style={{textDecoration:"none"}}>  {pricingData.free.cta}</Link>    
              </Button>
            </Card.Body>
          </Card>
        </Col>

     {/* Premium Plan - Highlighted as Best Plan Forever */}
<Col lg={4}>
  <Card className="h-100 border-warning border-2 shadow-lg position-relative">
    {/* Best Plan Forever Badge */}
    <div className="position-absolute top-0 start-50 translate-middle">
      <Badge bg="warning" pill className="px-3 py-2 fs-6 shadow text-dark">
        <FiStar className="me-1" /> Best Plan Forever
      </Badge>
    </div>
    
    <Card.Body className="d-flex flex-column pt-5">
      <div className="text-center mb-4">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <FiStar className="fs-3 text-warning me-2" />
          <h4 className="fw-bold text-warning mb-0">{pricingData.premium.title}</h4>
        </div>
        <h1 className="display-5 fw-bold my-3">{pricingData.premium.price}</h1>
        <p className="text-muted">{pricingData.premium.period}</p>
        <Badge bg="light" text="dark" className="mt-2">
          Most Value for Money
        </Badge>
      </div>
      
      <ul className="list-unstyled mb-4 flex-grow-1">
        {pricingData.premium.features.map((feature, index) => (
          <FeatureItem key={index} available={feature.available} text={feature.text} />
        ))}
      </ul>
      
     <Button 
  variant="warning" 
  size="lg" 
  className="w-100 fw-bold" 
  disabled
>
  <FiClock className="me-2" /> Coming Soon
</Button>
    </Card.Body>
  </Card>
</Col>

{/* Business Plan - With Coming Soon Features */}
<Col lg={4}>
  <Card className="h-100 border-secondary border-2 shadow">
    <Card.Body className="d-flex flex-column">
      <div className="text-center mb-4">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <FiBriefcase className="fs-3 text-secondary me-2" />
          <h4 className="fw-bold text-secondary mb-0">{pricingData.business.title}</h4>
        </div>
        <h1 className="display-5 fw-bold my-3">{pricingData.business.price}</h1>
        <p className="text-muted">{pricingData.business.period}</p>
        <Badge bg="secondary" className="mt-2">
          Enterprise Solution
        </Badge>
      </div>
      
      <ul className="list-unstyled mb-4 flex-grow-1">
        {pricingData.business.features.map((feature, index) => (
          <li key={index} className="d-flex align-items-start mb-2">
            {feature.available ? (
              <>
                <FiCheckCircle className="text-success mt-1 me-2" />
                <span>{feature.text}</span>
              </>
            ) : (
              <>
                <FiClock className="text-secondary mt-1 me-2" />
                <span className="text-muted">{feature.text} <Badge bg="light" text="secondary" className="ms-2">Coming Soon</Badge></span>
              </>
            )}
          </li>
        ))}
      </ul>
      
      <Button variant="outline-secondary" size="lg" className="w-100" disabled>
        <FiClock className="me-2" /> Coming Soon
      </Button>
      <div className="text-center mt-2 small text-muted">
        Contact us for early access
      </div>
    </Card.Body>
  </Card>
</Col>
      </Row>

   {/* Feature Comparison Table */}
<div className="mt-5 pt-5">
  <h3 className="text-center fw-bold mb-4">Detailed Feature Comparison</h3>
  <div className="table-responsive">
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Feature</th>
          <th className="text-center">Free</th>
          <th className="text-center">Premium</th>
          <th className="text-center">Business</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Basic Converters</td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
        </tr>
        <tr>
          <td>Advanced Converters</td>
          <td className="text-center"><FiXCircle className="text-danger" /></td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
        </tr>
        <tr>
          <td>Conversions Limit</td>
          <td className="text-center">Unlimited</td>
          <td className="text-center">Unlimited</td>
          <td className="text-center">Unlimited</td>
        </tr>
        <tr>
          <td>File History</td>
          <td className="text-center"><FiXCircle className="text-danger" /></td>
          <td className="text-center">30 days</td>
          <td className="text-center">1 year</td>
        </tr>
        <tr>
          <td>Support</td>
          <td className="text-center">Community</td>
          <td className="text-center">Priority Email</td>
          <td className="text-center">24/7 Dedicated</td>
        </tr>
        <tr>
          <td>Bulk Uploading</td>
          <td className="text-center"><FiXCircle className="text-danger" /></td>
          <td className="text-center">Basic</td>
          <td className="text-center">Enterprise</td>
        </tr>
        <tr>
          <td>Batch Conversion</td>
          <td className="text-center"><FiXCircle className="text-danger" /></td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
        </tr>
        <tr>
          <td>No Ads</td>
          <td className="text-center"><FiXCircle className="text-danger" /></td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
        </tr>
     
        <tr>
          <td>Downloadable Reports</td>
          <td className="text-center"><FiXCircle className="text-danger" /></td>
          <td className="text-center">Monthly</td>
          <td className="text-center">Weekly + Custom</td>
        </tr>
        <tr>
          <td>Team Collaboration</td>
          <td className="text-center"><FiXCircle className="text-danger" /></td>
          <td className="text-center"><FiXCircle className="text-danger" /></td>
          <td className="text-center"><FiCheckCircle className="text-success" /></td>
        </tr>
       
     
      </tbody>
    </table>
  </div>
</div>


   {/* FAQ Section */}
<div className="mt-5 pt-5 px-3 px-md-0">
  <div className="text-center mb-5">
    <h2 className="fw-bold mb-3">Common Questions</h2>
    <p className="lead text-muted">Get answers about our free conversion tools</p>
  </div>

  <Row className="g-4 justify-content-center">
    {/* Security */}
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 border-0 shadow-sm hover-effect">
        <Card.Body className="p-4">
          <div className="d-flex align-items-start mb-3">
            <FiShield className="fs-4 text-primary mt-1 me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold mb-2">Is my data private and secure?</h5>
              <p className="text-muted mb-0">
                All conversions happen 100% in your browser - we never upload or store your files. 
                Your data never leaves your device.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* Free Tools */}
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 border-0 shadow-sm hover-effect">
        <Card.Body className="p-4">
          <div className="d-flex align-items-start mb-3">
            <FiDollarSign className="fs-4 text-success mt-1 me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold mb-2">Are all tools completely free?</h5>
              <p className="text-muted mb-0">
                Yes! All {pricingData.free.features.length} conversion tools are free forever with 
                no usage limits or hidden charges.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* Usage */}
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 border-0 shadow-sm hover-effect">
        <Card.Body className="p-4">
          <div className="d-flex align-items-start mb-3">
            <FiActivity className="fs-4 text-info mt-1 me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold mb-2">Are there any usage limits?</h5>
              <p className="text-muted mb-0">
                No limits! Convert as many files as you need. Performance depends only on your device.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* File Support */}
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 border-0 shadow-sm hover-effect">
        <Card.Body className="p-4">
          <div className="d-flex align-items-start mb-3">
            <FiFile className="fs-4 text-warning mt-1 me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold mb-2">What file types are supported?</h5>
              <p className="text-muted mb-0">
                We support Excel, CSV, JSON, HTML, Markdown, and more. Most files under 10MB work perfectly.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* Browser Support */}
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 border-0 shadow-sm hover-effect">
        <Card.Body className="p-4">
          <div className="d-flex align-items-start mb-3">
            <FiChrome className="fs-4 text-danger mt-1 me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold mb-2">Which browsers work best?</h5>
              <p className="text-muted mb-0">
                Chrome, Firefox, Edge, and Safari. For large files, Chrome/Firefox recommended.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* Future */}
    <Col xs={12} md={6} lg={4}>
      <Card className="h-100 border-0 shadow-sm hover-effect">
        <Card.Body className="p-4">
          <div className="d-flex align-items-start mb-3">
            <FiPlusCircle className="fs-4 text-secondary mt-1 me-3 flex-shrink-0" />
            <div>
              <h5 className="fw-bold mb-2">Will you add more tools?</h5>
              <p className="text-muted mb-0">
                Yes! New converters coming regularly. Suggest tools via our feedback form.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  </Row>

  {/* CTA */}
  <div className="text-center mt-5">
   <Link to="/Faq">
  <Button variant="outline-primary" size="lg" className="px-4">
    <FiMessageSquare className="me-2" /> Need different answers?
  </Button>
</Link>
    <p className="small text-muted mt-2">
      Contact our support team for specific questions
    </p>
  </div>
</div>

      {/* Footer */}
      <div className="text-center mt-5 pt-4 border-top">
        <p className="text-muted">
          Need help deciding? <a href="/contact">Contact our sales team</a>
        </p>
        <p className="small text-muted mt-2">
          By using our service, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </Container>
  );
};

export default PricingPage;