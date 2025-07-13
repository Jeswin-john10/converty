import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';

import {
  FiCoffee,
  FiHeart,
  FiServer,
  FiZap,
  FiUsers,
  FiPlus,
  FiShield,
  FiShare2,
  FiEdit3
} from 'react-icons/fi';

import 'animate.css';
import logo from "../assets/img-convertly.png";

// ✅ Replace with your actual Stripe public key
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');

const handleStripePayment = async () => {
  const stripe = await stripePromise;

  await stripe.redirectToCheckout({
    lineItems: [
      {
        price: 'price_1Oxxxxxxxxxxxx', // ✅ Replace with your actual Price ID from Stripe
        quantity: 1,
      },
    ],
    mode: 'payment',
    successUrl: window.location.origin + '/success',
    cancelUrl: window.location.origin + '/support',
  });
};

const SupportUs = () => {
  return (
    <Container className="my-5 py-5">
      {/* Header */}
      <div className="text-center mb-5 animate__animated animate__fadeIn">
        <h2 className="display-5 fw-bold mb-3">Support Converty</h2>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Your support helps keep Converty fast, free, and feature-rich for everyone.
        </p>
      </div>

      {/* Support Options */}
    <Row className="g-4 mb-5">
  {/* Stripe - Payment */}
  <Col md={4} className="animate__animated animate__fadeInUp">
    <Card className="h-100 border-0 shadow-sm text-center hover-effect">
      <Card.Body className="p-4">
        <FiCoffee className="fs-1 text-info mb-3" />
        <h4>Fuel This Project</h4>
        <p className="text-muted mb-4">
          Converty runs on passion and caffeine  — consider a one-time donation via Stripe.
        </p>
        <Button variant="outline-info" onClick={handleStripePayment}>
          Donate Now
        </Button>
      </Card.Body>
    </Card>
  </Col>

  {/* Share Card */}
  <Col md={4} className="animate__animated animate__fadeInUp animate__delay-1s">
    <Card className="h-100 border-0 shadow-sm text-center hover-effect">
      <Card.Body className="p-4">
        <FiShare2 className="fs-1 text-primary mb-3" />
        <h4>Spread the Word</h4>
        <p className="text-muted mb-4">
          Know someone who’d love Converty? Share it with your friends and community!
        </p>
        <Button
          variant="outline-primary"
          onClick={() =>
            navigator.share
              ? navigator.share({
                  title: 'Convertly',
                  text: 'Check out this free and easy data converter!',
                  url: window.location.origin,
                })
              : window.open(
                  `https://twitter.com/intent/tweet?text=Check+out+Convertly:+${window.location.origin}`,
                  '_blank'
                )
          }
        >
          Share Now 
        </Button>
      </Card.Body>
    </Card>
  </Col>

  {/* Feature Suggestion / GitHub */}

<Col md={4} className="animate__animated animate__fadeInUp animate__delay-2s">
  <Card className="h-100 border-0 shadow-sm text-center hover-effect">
    <Card.Body className="p-4">
      <FiEdit3 className="fs-1 text-warning mb-3" />
      <h4>Suggest a Feature</h4>
      <p className="text-muted mb-4">
        Got a cool idea or missing tool? We'd love to hear from you — send us your suggestions directly.
      </p>
      <Button
        variant="outline-warning"
        href="mailto:support@convertly.dev?subject=Feature%20Suggestion%20for%20Convertly&body=Hi%20Convertly%20Team,%0A%0AI%20have%20a%20feature%20idea..."
        target="_blank"
      >
        Email Us
      </Button>
    </Card.Body>
  </Card>
</Col>

</Row>


  {/* Why Support Section */}
<Row className="align-items-center my-5 py-4 animate__animated animate__fadeIn">
  <Col lg={6} className="mb-4 mb-lg-0">
    <h3 className="fw-bold mb-4">
      <FiHeart className="text-danger me-2" /> Why Your Support Matters
    </h3>
   <p className="lead">
  Converty is proudly built and maintained by a solo developer dedicated to making data conversion effortless for everyone — developers, analysts, and creators alike.
</p>

    <p>
      Every contribution helps us improve tools like Excel ↔ JSON, CSV ↔ YAML, and more — keeping them accurate, fast, and free.
    </p>
    <p className="text-muted fst-italic">
      Fun fact: We’ve saved users **millions of lines** from being manually reformatted!
    </p>
  </Col>

  <Col lg={6}>
    <Card className="border-0 shadow-sm bg-light">
      <Card.Body className="p-4">
        <h5 className="fw-bold mb-4">Your support helps us:</h5>
        <ul className="list-unstyled">
          <li className="mb-3 d-flex">
            <FiZap className="text-primary mt-1 me-3 flex-shrink-0" />
            <span><strong>Speed up development</strong> of new converters and features</span>
          </li>
          <li className="mb-3 d-flex">
            <FiServer className="text-info mt-1 me-3 flex-shrink-0" />
            <span><strong>Scale our servers</strong> to handle thousands of users smoothly</span>
          </li>
          <li className="mb-3 d-flex">
            <FiUsers className="text-success mt-1 me-3 flex-shrink-0" />
            <span><strong>Offer community tools</strong> like real-time previews and auto-formatting</span>
          </li>
          <li className="mb-3 d-flex">
            <FiShield className="text-warning mt-1 me-3 flex-shrink-0" />
            <span><strong>Keep your data safe</strong> with robust security and no data logging</span>
          </li>
        </ul>
      </Card.Body>
    </Card>
  </Col>
</Row>


      {/* Sponsors Section */}
  <div className="text-center my-5 py-4 animate__animated animate__fadeIn">
  <h4 className="fw-bold mb-4">No Sponsors Yet — You Can Be the First!</h4>
  <p className="text-muted mb-4">
    We're currently self-funded. Your sponsorship could help us grow faster, reach more users, and build more amazing features.
  </p>

  <div className="d-flex justify-content-center">
    <img
    style={{width:"150px"}}
      src={logo}
      alt="Your Logo Here"
      className="img-fluid border p-2 bg-dark rounded shadow-sm"
    />
  </div>

<Button variant="primary" size="lg" className="mt-4 px-5 fw-semibold" href="/sponsor">
  Sponsor Us Now 
</Button>

</div>

    </Container>
  );
};

export default SupportUs;
