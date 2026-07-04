import LegalPageLayout, { type LegalSection } from './LegalPageLayout'
import SEO from './SEO'

const sections: LegalSection[] = [
  {
    heading: '1. General Policy',
    body: [
      'All purchases made on Divine Arra — including astrology consultations, reports, and courses — are non-refundable once the booking is confirmed and details are shared.',
      'This includes:',
    ],
    list: [
      'Personalized Consultations',
      'Couple Consultations',
      'Astrological Reports',
    ],
    note: 'Each service is manually prepared and involves dedicated time from the astrologer, hence refunds are not applicable after work has begun.',
  },
  {
    heading: '2. Rescheduling Policy',
    body: [
      'We understand that unforeseen circumstances may arise. If you wish to reschedule your session, you may do so by contacting our support team at least 24 hours before the scheduled consultation.',
      'Rescheduling is subject to astrologer availability and confirmation.',
    ],
  },
  {
    heading: '3. Duplicate or Accidental Payment',
    body: [
      'In case of duplicate or accidental payments due to technical issues or system errors, please email us within 48 hours of payment confirmation. Once verified, the excess amount will be refunded within 7–10 working days to the original payment method.',
    ],
  },
  {
    heading: '4. Service Delay or Non-Delivery',
    body: ['If, for any reason, Divine Arra is unable to deliver your booked service due to technical or internal issues, we will:'],
    list: [
      'Offer a rescheduled session at no extra cost, or',
      'Provide a full refund within 10 working days.',
    ],
    note: 'This applies only when the delay is from our side.',
  },
  {
    heading: '5. Course Enrollments',
    body: [
      'Fees for astrology courses (including Vedic Astrology, Numerology, and Palmistry) are non-refundable after enrollment, as access to study materials, sessions, and resources is immediately provided.',
      'In case of genuine technical issues or non-delivery of content, we will assist in resolving the problem or reschedule your classes.',
    ],
  },
  {
    heading: '6. Consultation Satisfaction',
    body: [
      'We aim for maximum satisfaction and genuine guidance. However, astrology is a spiritual and interpretive science — results may vary based on individual faith, effort, and karma.',
      'Refunds are not applicable based on personal expectations or perceived outcomes.',
    ],
  },
  {
    heading: '7. Contact for Support',
    body: ['For any payment or service-related concerns, please reach out using the details below. Our support team will review your query and respond within 2–3 business days.'],
  },
  {
    heading: '8. Final Note',
    body: ['At Divine Arra, every service is offered with sincerity, authenticity, and care. Our goal is not just to provide predictions — but to guide, heal, and empower. We appreciate your understanding and trust in our process.'],
  },
]

export default function RefundPolicy() {
  return (
    <>
      <SEO
        title="Refund Policy | Divine Arra"
        description="Understand Divine Arra's refund and rescheduling policy for astrology consultations, reports, and courses before you book your session."
        url="/refund-policy"
      />
      <LegalPageLayout
        eyebrow="Fair & Transparent"
        title="Refund Policy"
        intro="At Divine Arra, we strive to deliver authentic, personalized, and spiritually enriching astrology consultations and courses. Since our consultations and reports are custom-created and based on individual birth details, they require significant analysis and cannot be reused or resold. Therefore, we maintain a transparent and fair No Refund Policy, with limited exceptions as outlined below."
        sections={sections}
        closingNote="Your spiritual journey is sacred — and we're honored to be part of it."
      />
    </>
  )
}