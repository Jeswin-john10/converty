import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="py-4 bg-dark text-white-50">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} Converty. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <a href="/terms" className="text-white-50 me-3">Terms</a>
              <a href="/privacy" className="text-white-50 me-3">Privacy</a>
              <a href="/contact" className="text-white-50 me-3">Contact</a>
              <a href="/sponsor" className="text-white-50">Sponsor</a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Footer
