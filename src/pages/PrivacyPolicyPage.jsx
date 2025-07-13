import React from 'react';
import { Container } from 'react-bootstrap';
import 'animate.css';

const PrivacyPolicyPage = () => {
  return (
    <div className="py-5 mt-5 bg-light animate__animated animate__fadeIn">
      <Container>
        <h1 className="mb-4 text-center fw-bold">Privacy Policy</h1>
        <p className="text-muted">Last updated: June 14, 2025</p>

        <h4 className="mt-4">1. Introduction</h4>
        <p>
          At Converty, your privacy is important to us. This Privacy Policy explains how we collect, use,
          and protect your information when you use our services.
        </p>

        <h4 className="mt-4">2. Data We Collect</h4>
        <p>
          Converty does not store files or conversion data. All operations happen client-side or are
          processed temporarily in memory and then deleted. No personal or uploaded data is permanently stored.
        </p>

        <h4 className="mt-4">3. Usage Data</h4>
        <p>
          We collect anonymous usage data to understand how our tools are being used. This may include page
          views, clicks, browser type, IP region, or device info — but never identifiable user content or files.
        </p>

        <h4 className="mt-4">4. Cookies and Local Storage</h4>
        <p>
          Converty uses browser cookies and local storage to save preferences like selected tools, dark mode,
          and conversion settings. You can disable cookies in your browser if you prefer.
        </p>

        <h4 className="mt-4">5. Email Contact</h4>
        <p>
          If you email us (e.g., sponsor@convertly.app), we only use your email to respond and do not share
          it with third parties. We do not send newsletters or marketing emails unless explicitly requested.
        </p>

        <h4 className="mt-4">6. Third-Party Services</h4>
        <p>
          We may use services like Google Analytics or Ko-fi. These third parties may set their own cookies.
          Their use of data is governed by their own privacy policies. We recommend reviewing their terms.
        </p>

        <h4 className="mt-4">7. Ads and Sponsorship</h4>
        <p>
          Converty may show sponsor content or ads. All ads are manually approved to meet our quality and
          content standards. We do not track users for ad targeting. If you experience ad issues, please contact
          us. Converty is not responsible for sponsor behavior or external websites.
        </p>

        <h4 className="mt-4">8. Data Security</h4>
        <p>
          We use secure HTTPS and implement safeguards to protect all temporary data and communications.
          However, no web service can guarantee absolute security.
        </p>

        <h4 className="mt-4">9. No Account Required</h4>
        <p>
          Converty is free to use without registration. We do not require users to create accounts or provide
          personal information to access our tools.
        </p>

        <h4 className="mt-4">10. Children’s Privacy</h4>
        <p>
          Converty is not intended for users under 13. We do not knowingly collect personal information from
          children. If we learn we have inadvertently collected such information, we will delete it promptly.
        </p>

        <h4 className="mt-4">11. Changes to This Policy</h4>
        <p>
          We may update this Privacy Policy periodically. Changes will be posted here with an updated date.
          Your continued use of Converty implies acceptance of the updated policy.
        </p>

        <h4 className="mt-4">12. Contact Us</h4>
        <p>
          For any questions or concerns about your privacy or this policy, please contact us at:{" "}
          <a href="mailto:support@convertly.app">support@convertly.app</a>
        </p>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;
