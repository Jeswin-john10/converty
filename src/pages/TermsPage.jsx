import React from 'react';
import { Container } from 'react-bootstrap';
import 'animate.css';

const TermsPage = () => {
  return (
    <div className="py-5 mt-5 bg-light animate__animated animate__fadeIn">
      <Container>
        <h1 className="mb-4 text-center fw-bold">Terms of Service</h1>
        <p className="text-muted text-center">Last updated: June 14, 2025</p>

        <h4 className="mt-4">1. Acceptance of Terms</h4>
        <p>
          By using Converty, you agree to comply with and be legally bound by these Terms of Service.
          If you do not agree to these terms, please do not use the platform.
        </p>

        <h4 className="mt-4">2. Description of Service</h4>
        <p>
          Converty is a free web-based tool that allows users to convert files and data between formats such as Excel, JSON, CSV, and YAML.
          The service is provided "as is" and may be updated or changed at any time without prior notice.
        </p>

        <h4 className="mt-4">3. Use of the Service</h4>
        <p>
          You agree not to misuse Converty or use it to transmit malicious data, perform illegal conversions,
          or overload the system with harmful traffic. You may not reverse-engineer, replicate, or interfere
          with the service’s functionality.
        </p>

        <h4 className="mt-4">4. Intellectual Property</h4>
        <p>
          All branding, tools, user interface designs, and content on Converty are the intellectual property of Converty
          or its partners. You may not copy, modify, or distribute any part of the platform without permission.
        </p>

        <h4 className="mt-4">5. Data Privacy</h4>
        <p>
          Converty does not store or share your uploaded or converted data. All conversions are processed in real-time
          and are removed from memory once completed. We do not track or store personal data unless explicitly provided.
        </p>

      <h4 className="mt-4">6. Sponsorship and Advertising</h4>
<p>
  Sponsors may display their logo or advertisements on Converty. All sponsorships are approved manually
  and must comply with our brand and content guidelines. Sponsored content will be clearly labeled and
  will not interfere with conversions or user experience.
</p>
<p>
  Please note: Converty is not responsible for the content, accuracy, or claims made in sponsored advertisements.
  Any complaints or disputes regarding sponsor ads should be directed to the advertiser. Converty does not offer
  support or mediation for such matters.
</p>


        <h4 className="mt-4">7. Payment and Donations</h4>
        <p>
          Converty offers options to support the platform through one-time donations or sponsorships.
          Payments are handled by third-party services like Stripe or Ko-fi. We do not store any credit card or payment information.
        </p>

        <h4 className="mt-4">8. Limitation of Liability</h4>
        <p>
          Converty is provided without warranties of any kind. We are not liable for any damage or loss resulting from
          the use or inability to use the platform. Use the service at your own risk.
        </p>

        <h4 className="mt-4">9. Modifications to Terms</h4>
        <p>
          We may revise these terms at any time. You are responsible for checking this page periodically.
          Continued use of Converty after changes means you accept the new terms.
        </p>

        <h4 className="mt-4">10. Contact Us</h4>
        <p>
          For questions about these Terms of Service or any other concerns, please email us at:{" "}
          <a href="mailto:support@convertly.app">support@convertly.app</a>
        </p>
      </Container>
    </div>
  );
};

export default TermsPage;
