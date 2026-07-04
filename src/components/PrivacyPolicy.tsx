import LegalPageLayout from './LegalPageLayout'
import type { LegalSection } from './LegalPageLayout'

const sections: LegalSection[] = [
  {
    heading: '1. Information We Collect',
    body: ['We collect personal information only when necessary to deliver our services effectively. This may include:'],
    list: [
      'Personal Details: Name, email address, contact number, and date of birth.',
      'Birth Information: Date, time, and place of birth (required for astrology consultations).',
      'Payment Details: Processed securely through trusted third-party payment gateways; we do not store your financial data.',
      'Communication Data: Messages or emails exchanged with our support team or astrologers.',
      'Website Usage Data: Information like IP address, browser type, and interaction data collected via cookies for analytics and performance improvement.',
    ],
  },
  {
    heading: '2. How We Use Your Information',
    body: ['Your information is used solely for the following purposes:'],
    list: [
      'To provide personalized astrology consultations and reports.',
      'To schedule appointments and deliver services.',
      'To communicate important updates, confirmations, or changes to your session.',
      'To improve user experience and website performance.',
      'To send occasional updates or offers (only with your consent).',
      'We do not sell, rent, or trade your personal information to any third party.',
    ],
  },
  {
    heading: '3. Confidentiality and Data Security',
    body: [
      'We take your privacy seriously. All client details, birth charts, and discussions are kept strictly confidential. We use appropriate administrative, technical, and physical safeguards to protect your data against unauthorized access, misuse, or loss.',
      'Only authorized personnel and the consulting astrologer have access to client information.',
    ],
  },
  {
    heading: '4. Cookies and Tracking',
    body: ['Our website may use cookies to enhance your browsing experience and analyze website traffic. You can modify your browser settings to disable cookies, though some parts of the website may not function optimally.'],
  },
  {
    heading: '5. Third-Party Services',
    body: [
      'We may use third-party tools such as payment gateways, email platforms, or analytics providers. These services operate under their own privacy policies, and we encourage you to review them for better understanding.',
      'Examples: Razorpay, Google Analytics, Meta (Facebook), and email communication tools.',
    ],
  },
 {
    heading: '6. Your Rights',
    body: ['You have full control over your personal data. You may:'],
    list: [
      'Request access to the information we hold about you.',
      'Ask for corrections or updates to your data.',
      'Withdraw consent for promotional communications.',
      'Request deletion of your personal data (subject to legal or service-related obligations).',
      'For such requests, contact us via support@divinearra.com.',
    ],
  },
  {
    heading: '7. Data Retention',
    body: ['We retain personal information only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, or resolve disputes.'],
  },
  {
    heading: "8. Children's Privacy",
    body: ['Our services are not intended for individuals under 18 years of age without parental or guardian consent. We do not knowingly collect personal data from minors.'],
  },
  {
    heading: '9. Policy Updates',
    body: ['Divine Arra reserves the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page with the revised date. Continued use of our website or services indicates your acceptance of the updated policy.'],
  },
]

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      eyebrow="Your Trust, Protected"
      title="Privacy Policy"
      intro="At Divine Arra, we value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you access our website, book consultations, or enroll in astrology courses. By using our services, you consent to the practices described in this Privacy Policy."
      sections={sections}
      closingNote="At Divine Arra, your trust is sacred — and so is your privacy. We remain committed to maintaining the highest standards of integrity, confidentiality, and respect in every interaction."
    />
  )
}
