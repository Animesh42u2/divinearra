import LegalPageLayout, { type LegalSection } from './LegalPageLayout'

const sections: LegalSection[] = [
  {
    heading: '1. Purpose of Services',
    body: [
      'All consultations, reports, and courses offered by Divine Arra and Astro Aaditya Narayan are intended to provide guidance, awareness, and self-understanding based on the principles of Vedic Astrology and related sciences.',
      'These services are not a substitute for medical, legal, financial, or psychological advice. Clients are encouraged to exercise their own judgment and seek professional assistance where necessary.',
    ],
  },
  {
    heading: '2. Accuracy of Information',
    body: [
      "While every effort is made to ensure accuracy and authenticity, astrology is a spiritual and interpretive science. Predictions, insights, and suggestions are based on the astrologer's analysis of planetary positions and cosmic patterns.",
      'Divine Arra does not guarantee specific outcomes, results, or future events, as destiny is influenced by karma, free will, and personal effort.',
    ],
  },
  {
    heading: '3. Limitation of Liability',
    body: ['Under no circumstances shall Divine Arra, its astrologers, or associated members be held liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services, information, or products.'],
  },
  {
    heading: '4. Privacy and Confidentiality',
    body: [
      'All personal information, including birth details and consultation records, are treated with strict confidentiality. Divine Arra respects your privacy and will never share or sell your data to third parties without consent.',
      'For more details, please refer to our Privacy Policy.',
    ],
  },
  {
    heading: '5. Payment and Refund Policy',
    body: [
      'All payments made for consultations, courses, or other services are non-refundable once a session has been conducted or a course accessed, except under exceptional circumstances as approved by management.',
      'Clients are advised to review the Important Notes mentioned on individual service or course pages before booking.',
    ],
  },
  {
    heading: '6. Intellectual Property',
    body: ['All content, text, graphics, and materials available on the Divine Arra website are the intellectual property of Divine Arra and cannot be copied, reproduced, or distributed without prior written consent.'],
  },
  {
    heading: '7. Changes and Updates',
    body: ['Divine Arra reserves the right to modify, update, or change this Disclaimer at any time without prior notice. Continued use of the website and services constitutes acceptance of the updated terms.'],
  },
]

export default function Disclaimer() {
  return (
    <LegalPageLayout
      eyebrow="Know Before You Begin"
      title="Disclaimer"
      intro="Welcome to Divine Arra, an astrology platform dedicated to offering authentic astrological guidance, education, and spiritual insights. By accessing or using our website, services, or consultations, you acknowledge and agree to the following terms and conditions outlined in this Disclaimer."
      sections={sections}
      closingNote="By booking a consultation or enrolling in a course, you acknowledge that you have read, understood, and agreed to this Disclaimer."
    />
  )
}