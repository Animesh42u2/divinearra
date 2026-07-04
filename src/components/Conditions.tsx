import LegalPageLayout from './LegalPageLayout'
import type { LegalSection } from './LegalPageLayout'
import SEO from './SEO'

const sections: LegalSection[] = [
  {
    heading: '1. General Information',
    body: [
      'Divine Arra is a spiritual and educational platform offering astrology consultations, numerology guidance, name corrections, and astrology courses. All services are provided by Astro Aaditya Narayan and the Divine Arra team with sincerity, authenticity, and professional ethics.',
      'By accessing our website or purchasing any service, you confirm that:',
    ],
    list: [
      'You are 18 years or older, or have parental consent.',
      'You understand that astrology is a guidance-based and spiritual advisory system, not a substitute for professional medical, legal, or financial advice.',
    ],
  },
  {
    heading: '2. Service Usage',
    body: ['Our services include:'],
    list: [
      'Personalized Consultations',
      'Couple Consultations',
      'Astrological Reports',
    ],
    note: 'You agree to provide accurate personal details (name, birth date, time, and place) for consultations. Incorrect or incomplete data may affect the accuracy of results — Divine Arra is not liable for inaccuracies arising from user-provided data.',
  },
  {
    heading: '3. Booking & Payment',
    list: [
      'All bookings are confirmed only after full payment is received.',
      'Payments are processed through secure third-party payment gateways.',
      'Prices mentioned on the website are subject to change without prior notice.',
      'Once a consultation or course is booked, it cannot be canceled; refunds are governed by our Refund Policy.',
    ],
  },
  {
    heading: '4. Rescheduling',
    body: ['If you need to reschedule your booked consultation, please inform us at least 24 hours prior to the session. Rescheduling is subject to astrologer availability and confirmation.'],
  },
  {
    heading: '5. Confidentiality',
    body: ['All consultations, reports, and shared information are kept strictly confidential. We respect your privacy and will not disclose your personal or birth details to any third party without your consent. For more information, please read our Privacy Policy.'],
  },
  {
    heading: '6. Limitation of Liability',
    list: [
      'Astrology is a guidance-based science and does not guarantee specific outcomes.',
      'Divine Arra, its astrologers, or representatives shall not be held responsible for any loss, decision, or consequence arising from reliance on astrological guidance.',
      'Services provided are for spiritual and educational purposes only and should not replace professional medical, psychological, or legal consultation.',
    ],
  },
  {
    heading: '7. Intellectual Property',
    body: ['All content, materials, logos, and designs on the Divine Arra website — including texts, images, videos, and course materials — are the intellectual property of Divine Arra. You may not reproduce, distribute, or modify any content without prior written permission.'],
  },
  {
    heading: '8. Course Enrollment & Access',
    list: [
      'Once enrolled in a course, access credentials are personal and non-transferable.',
      'Sharing login details, course materials, or recordings with others is strictly prohibited.',
      'Violation of this policy may lead to termination of access without refund.',
    ],
  },
  {
    heading: '9. Disclaimer of Guarantees',
    body: [
      'Divine Arra does not guarantee outcomes, predictions, or timeframes. Astrological remedies (gemstones, mantras, donations, etc.) are suggestions, not compulsory actions.',
      'Your results depend on your faith, effort, and karmic alignment.',
    ],
  },
  {
    heading: '10. Modifications',
    body: ['Divine Arra reserves the right to modify, update, or amend these Terms & Conditions at any time without prior notice. Your continued use of our website or services constitutes your acceptance of the revised terms.'],
  },
  {
    heading: '11. Governing Law & Jurisdiction',
    body: ['These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to our services shall fall under the jurisdiction of Khordha, Odisha, India.'],
  },
]

export default function TermsAndConditions() {
  return (
    <>
      <SEO
        title="Terms & Conditions | Divine Arra"
        description="Read the terms and conditions for booking astrology consultations, reports, and courses with Divine Arra, including payment, rescheduling, and liability policies."
        url="/terms-and-conditions"
      />
      <LegalPageLayout
        eyebrow="Please Read Carefully"
        title="Terms & Conditions"
        intro="Welcome to Divine Arra. These Terms & Conditions govern your access to and use of our website, services, consultations, and courses. By using our website or booking any service, you agree to comply with these terms in full."
        sections={sections}
        closingNote="At Divine Arra, our mission is to guide individuals toward light, balance, and clarity through the sacred science of astrology. By engaging with our services, you acknowledge and respect the spiritual nature of our work and agree to use the insights received responsibly."
      />
    </>
  )
}