export interface ConsultationPlan {
  name: string
  tagline: string
  originalPrice: string
  discountedPrice: string
  features: { label: string; included: boolean }[]
  highlight?: boolean
}

export interface ConsultationConfig {
  slug: string
  title: string
  subtitle: string
  tagline: string
  heroDescription: string
  accentColor: string
  gradientFrom: string
  gradientTo: string
  icon: string
  image: string
  image2: string
  whatIs: {
    heading: string
    description: string
    bullets: string[]
  }
  whatsInside: {
    icon: string
    title: string
    description: string
  }[]
  steps: { title: string; description: string }[]
  forWhom: { title: string; description: string }[]
  pricingPlans: ConsultationPlan[]
  faqs: { question: string; answer: string }[]
  testimonials: { name: string; text: string }[]
}

export const consultationsConfig: ConsultationConfig[] = [
  {
    slug: 'personal',
    title: 'Personal Consultation',
    subtitle: 'One-on-One Guidance, Just for You',
    tagline: 'A Live Personal Consultation to Get Real Answers on Any Area of Your Life',
    heroDescription:
      'Sometimes a report isn\'t enough — you need to talk, ask questions, and hear the answers in real time. Connect directly with Astro Aaditya Narayan for personalized, judgment-free guidance.',
    accentColor: '#c8791a',
    gradientFrom: '#2a1500',
    gradientTo: '#150a00',
    icon: '🔮',
    image: '/personal.png',
    image2: '/personal.jpeg',
    whatIs: {
      heading: 'Direct, One-on-One Astrological Guidance',
      description:
        'The Personal Consultation is a live audio or video session with Astro Aaditya Narayan, where your birth chart is discussed in real time and your specific questions are answered directly. Whether you\'re facing a single pressing issue or want an overview of your life\'s direction, this session gives you clarity through conversation, not just paperwork.',
      bullets: [
        'Live, real-time conversation with an expert Vedic astrologer.',
        'Ask follow-up questions and get immediate clarification.',
        'Covers any area of life — career, love, finance, health, or family.',
        'Personalized remedies explained and discussed during the call.',
      ],
    },
    whatsInside: [
      { icon: 'PhoneCall', title: 'Live 1-on-1 Session', description: 'A scheduled audio or video call with Astro Aaditya Narayan at a time that works for you.' },
      { icon: 'Compass', title: 'Birth Chart Walkthrough', description: 'Your kundali is reviewed live, with key planetary positions and houses explained in simple terms.' },
      { icon: 'MessageCircle', title: 'Open Q&A on Your Concerns', description: 'Bring your questions — career, relationships, finances, health, or anything on your mind.' },
      { icon: 'Wand2', title: 'On-Call Remedy Guidance', description: 'Practical Vedic remedies suggested and explained based on your specific situation.' },
      { icon: 'ListChecks', title: 'Session Summary Notes', description: 'A short written summary of key points and remedies discussed, sent after your call.' },
    ],
    steps: [
      { title: 'Book Your Slot', description: 'Choose a date and time that works for you and confirm your booking.' },
      { title: 'Share Your Birth Details', description: 'Provide your date, time, and place of birth before the session.' },
      { title: 'Join Your Live Session', description: 'Connect via audio or video call and get your questions answered directly.' },
    ],
    forWhom: [
      { title: 'Those With Specific Questions', description: 'Have one or two pressing questions you want answered clearly and directly? This session is for you.' },
      { title: 'People Who Prefer Conversation', description: 'If reading a report isn\'t enough and you\'d rather talk through your chart, a live session works better.' },
      { title: 'Those Facing a Decision Point', description: 'Weighing a big decision — job change, relocation, marriage, investment? Get real-time guidance before you decide.' },
      { title: 'Anyone Wanting a Second Opinion', description: 'Already explored astrology before but want a fresh, expert perspective on your chart and current phase of life.' },
    ],
    pricingPlans: [
      {
        name: 'Quick Consultation',
        tagline: 'Focused Guidance for Your Most Pressing Question',
        originalPrice: '₹999',
        discountedPrice: '₹499',
        features: [
          { label: '15-Minute Live Call', included: true },
          { label: 'Audio Consultation', included: true },
          { label: 'Answers to Up to 2 Questions', included: true },
          { label: 'Basic Remedy Suggestions', included: true },
          { label: 'Video Call Option', included: false },
          { label: 'Session Summary Notes', included: false },
          { label: 'Priority Scheduling', included: false },
          { label: '30-Minute Extended Session', included: false },
        ],
      },
      {
        name: 'Extended Consultation',
        tagline: 'A Deeper, Unhurried Conversation About Your Life',
        originalPrice: '₹2,999',
        discountedPrice: '₹1,299',
        highlight: true,
        features: [
          { label: '30-Minute Live Call', included: true },
          { label: 'Audio Consultation', included: true },
          { label: 'Answers to Up to 2 Questions', included: true },
          { label: 'Basic Remedy Suggestions', included: true },
          { label: 'Video Call Option', included: true },
          { label: 'Session Summary Notes', included: true },
          { label: 'Priority Scheduling', included: true },
          { label: '30-Minute Extended Session', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'How does the live session work?', answer: 'After booking, you\'ll receive a confirmed time slot. At that time, you\'ll connect with Astro Aaditya Narayan via phone or video call, depending on the plan you choose.' },
      { question: 'What information do I need to provide beforehand?', answer: 'Your accurate date, time, and place of birth. The more accurate your birth time, the more precise the chart analysis will be.' },
      { question: 'Can I ask about multiple topics in one session?', answer: 'Yes, though the Quick Consultation works best for 1–2 focused questions. The Extended Consultation gives more room to cover multiple areas.' },
      { question: 'What if I need to reschedule?', answer: 'You can reschedule your session up to 12 hours before the booked time through the link sent in your confirmation message.' },
      { question: 'Is this available in Hindi?', answer: 'Yes, sessions can be conducted in Hindi or English based on your preference — just let us know at the time of booking.' },
    ],
    testimonials: [
      { name: 'Rohit S.', text: 'I had been stuck on a job decision for weeks. The 15-minute call gave me the clarity I needed — straightforward, no fluff, and the timing advice turned out to be right on the mark.' },
      { name: 'Sneha D.', text: 'Being able to actually ask follow-up questions made all the difference. The extended session felt like talking to someone who genuinely understood my chart and my situation.' },
      { name: 'Manish A.', text: 'The remedies were explained so simply during the call that I started them the same evening. The summary notes afterward were a nice touch too.' },
    ],
  },

  {
    slug: 'couple',
    title: 'Couple Consultation',
    subtitle: 'Navigate Your Relationship, Together',
    tagline: 'A Joint Live Session for Couples to Understand Compatibility and Strengthen Their Bond',
    heroDescription:
      'Every relationship has its own rhythm. In a live joint session with Astro Aaditya Narayan, both partners can explore their charts together, understand each other better, and get practical guidance for the road ahead.',
    accentColor: '#e05c8a',
    gradientFrom: '#3d0a1a',
    gradientTo: '#1a0408',
    icon: '💑',
    image: '/love.webp',
    image2: '/love.jpeg',
    whatIs: {
      heading: 'A Shared Session for a Shared Journey',
      description:
        'The Couple Consultation is a live session where both partners join together to discuss their individual charts and their compatibility. Astro Aaditya Narayan walks you through your Ashtakoot Milan, key planetary placements, and relationship dynamics — and answers questions from both partners in real time.',
      bullets: [
        'A joint live session for both partners — together, in real time.',
        'Covers compatibility, communication styles, and shared challenges.',
        'Identifies doshas (if any) and explains practical remedies.',
        'Open discussion space for questions from both partners.',
      ],
    },
    whatsInside: [
      { icon: 'Users', title: 'Joint Live Session', description: 'A single scheduled call where both partners participate together with Astro Aaditya Narayan.' },
      { icon: 'Hash', title: 'Compatibility Walkthrough', description: 'Live discussion of your Guna Milan score and what it means for your relationship in practical terms.' },
      { icon: 'MessageCircle', title: 'Communication & Conflict Insights', description: 'Understand how each partner naturally communicates, handles stress, and approaches decisions.' },
      { icon: 'AlertTriangle', title: 'Dosha Discussion & Remedies', description: 'Any doshas present in either chart are explained clearly, along with simple remedies to address them.' },
      { icon: 'Heart', title: 'Joint Q&A', description: 'Both partners get the chance to ask questions and receive guidance together, in the same conversation.' },
    ],
    steps: [
      { title: 'Book a Shared Slot', description: 'Choose a time that works for both partners and confirm your booking.' },
      { title: 'Share Both Birth Details', description: 'Provide date, time, and place of birth for both partners before the session.' },
      { title: 'Join the Session Together', description: 'Connect on the same call and explore your charts and compatibility live.' },
    ],
    forWhom: [
      { title: 'Couples Before Marriage', description: 'Want to talk through your compatibility together, with room for questions from both sides? This is built for that.' },
      { title: 'Couples Facing Friction', description: 'If recurring misunderstandings are creating distance, a joint session can help both partners see the bigger picture.' },
      { title: 'Long-Distance or Newly Engaged Couples', description: 'A live video session is a meaningful way to connect on something important, even from different cities.' },
      { title: 'Couples Wanting Shared Clarity', description: 'Rather than each partner reading a separate report, get insights together and discuss them in the moment.' },
    ],
    pricingPlans: [
      {
        name: 'Couple Quick Session',
        tagline: 'A Focused Compatibility Conversation',
        originalPrice: '₹1,999',
        discountedPrice: '₹799',
        features: [
          { label: '30-Minute Joint Live Call', included: true },
          { label: 'Audio Consultation', included: true },
          { label: 'Guna Milan Overview', included: true },
          { label: 'Basic Dosha Check', included: true },
          { label: 'Video Call Option', included: false },
          { label: 'Detailed Remedy Plan', included: false },
          { label: 'Session Summary Notes', included: false },
          { label: '60-Minute Extended Session', included: false },
        ],
      },
      {
        name: 'Couple Deep-Dive Session',
        tagline: 'A Thorough Compatibility & Relationship Session',
        originalPrice: '₹4,999',
        discountedPrice: '₹1,599',
        highlight: true,
        features: [
          { label: '30-Minute Joint Live Call', included: true },
          { label: 'Audio Consultation', included: true },
          { label: 'Guna Milan Overview', included: true },
          { label: 'Basic Dosha Check', included: true },
          { label: 'Video Call Option', included: true },
          { label: 'Detailed Remedy Plan', included: true },
          { label: 'Session Summary Notes', included: true },
          { label: '60-Minute Extended Session', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Do both partners need to be present?', answer: 'Yes, this session is designed for both partners to join together so insights and discussion happen in real time for both of you.' },
      { question: 'What if we are not yet married or engaged?', answer: 'That\'s completely fine — the session is equally valuable for dating couples who want clarity before taking the next step.' },
      { question: 'Will sensitive topics be handled respectfully?', answer: 'Yes. Astro Aaditya Narayan approaches every relationship with care, focusing on awareness and constructive guidance rather than judgment.' },
      { question: 'Can we join from different locations?', answer: 'Yes, the session can be conducted over a group video or audio call, so you can join from wherever you each are.' },
      { question: 'How soon can we book a session?', answer: 'Slots are generally available within 2–4 days of booking, depending on availability.' },
    ],
    testimonials: [
      { name: 'Aman & Riya', text: 'We were nervous going in, but the session felt more like a helpful conversation than a verdict. The dosha explanation finally made sense of something we\'d both been worried about.' },
      { name: 'Kavita J.', text: 'My partner and I have very different communication styles, and hearing it explained through our charts — together, live — helped us understand each other so much better.' },
      { name: 'Sahil & Pooja', text: 'The deep-dive session was worth every rupee. We got to ask questions as they came up, and the remedies suggested were simple enough for both of us to actually follow.' },
    ],
  },

  {
    slug: 'tarot-card-reading',
    title: 'Tarot Card Reading',
    subtitle: 'Let the Cards Reveal Your Path',
    tagline: 'An Intuitive Live Tarot Session for Clarity on Love, Career, or Life Decisions',
    heroDescription:
      'When you need a fresh perspective on a question that\'s been on your mind, a live tarot reading offers intuitive insight and clarity — drawn card by card, in real time, just for you.',
    accentColor: '#7c5cbf',
    gradientFrom: '#1a0a3d',
    gradientTo: '#0d0520',
    icon: '🃏',
    image: '/taroot.png',
    image2: '/taroot.webp',
    whatIs: {
      heading: 'Intuitive Insight Through the Cards',
      description:
        'A Tarot Card Reading session is a live, conversational reading where cards are drawn in real time to explore your question — whether it\'s about love, career, a decision you\'re weighing, or simply where things are headed. Each card is explained as it\'s drawn, with space for follow-up questions along the way.',
      bullets: [
        'Live card draws with real-time interpretation, not pre-written results.',
        'Focused spreads for love, career, decisions, or general life direction.',
        'Space to ask follow-up questions as the reading unfolds.',
        'A reflective, intuitive complement to your astrological insights.',
      ],
    },
    whatsInside: [
      { icon: 'Sparkles', title: 'Live Card Draw', description: 'Cards are drawn during your session and interpreted in the moment based on your question.' },
      { icon: 'Heart', title: 'Love & Relationship Spread', description: 'A focused spread exploring your current relationship energy, feelings, and likely direction.' },
      { icon: 'TrendingUp', title: 'Career & Decision Spread', description: 'A spread designed to bring clarity to career moves, choices, or paths you\'re weighing.' },
      { icon: 'Eye', title: 'General Life Direction Spread', description: 'A broader reading covering the energies and themes likely to shape your near future.' },
      { icon: 'MessageCircle', title: 'Follow-Up Questions', description: 'Ask clarifying questions as cards are drawn, for a reading that responds to what matters to you.' },
    ],
    steps: [
      { title: 'Book Your Session', description: 'Choose a time slot and let us know the area you\'d like the reading to focus on.' },
      { title: 'Set Your Question or Focus', description: 'Share the question or theme you\'d like the cards to explore.' },
      { title: 'Join Your Live Reading', description: 'Connect via call and watch the cards unfold with real-time interpretation.' },
    ],
    forWhom: [
      { title: 'Those Seeking a Fresh Perspective', description: 'When you\'re too close to a situation to see it clearly, the cards can offer a different angle.' },
      { title: 'People Facing a Decision', description: 'Weighing two paths and want intuitive insight to go alongside your own thinking? A focused spread can help.' },
      { title: 'Those Curious About Love or Career Energy', description: 'Get a read on the current energy around your relationship or professional life.' },
      { title: 'Anyone Open to a Reflective Conversation', description: 'If you enjoy exploring ideas through symbolism and conversation, a tarot session offers exactly that.' },
    ],
    pricingPlans: [
      {
        name: 'Single Question Reading',
        tagline: 'A Focused Reading on One Specific Question',
        originalPrice: '₹799',
        discountedPrice: '₹349',
        features: [
          { label: '15-Minute Live Reading', included: true },
          { label: 'Audio Session', included: true },
          { label: 'One Focused Spread (3 Cards)', included: true },
          { label: 'Follow-Up Questions', included: false },
          { label: 'Video Session', included: false },
          { label: 'Multiple Spreads', included: false },
          { label: 'Session Recording', included: false },
          { label: 'Written Summary', included: false },
        ],
      },
      {
        name: 'Full Life Reading',
        tagline: 'A Deeper Reading Across Love, Career & General Direction',
        originalPrice: '₹2,499',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: '45-Minute Live Reading', included: true },
          { label: 'Audio Session', included: true },
          { label: 'One Focused Spread (3 Cards)', included: true },
          { label: 'Follow-Up Questions', included: true },
          { label: 'Video Session', included: true },
          { label: 'Multiple Spreads', included: true },
          { label: 'Session Recording', included: true },
          { label: 'Written Summary', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Do I need to ask a specific question?', answer: 'It helps, but it isn\'t required. You can come with a specific question or simply ask for a general reading on what\'s ahead.' },
      { question: 'Is tarot the same as astrology?', answer: 'No, tarot is a separate, intuitive practice that doesn\'t rely on your birth chart. Many people use both together for a fuller picture.' },
      { question: 'Can I record the session?', answer: 'The Full Life Reading includes a session recording. For the Single Question Reading, recording is not included but can be requested.' },
      { question: 'How many cards will be drawn?', answer: 'The Single Question Reading uses a focused 3-card spread. The Full Life Reading uses multiple spreads covering different areas of life.' },
      { question: 'Can this be done for someone else, like a family member?', answer: 'Yes, as long as the person whose reading it is consents and is comfortable with the questions being asked on their behalf.' },
    ],
    testimonials: [
      { name: 'Naina K.', text: 'I went in with one question about a job offer and came out with so much more clarity than I expected. The reading felt grounded, not vague at all.' },
      { name: 'Yash T.', text: 'The full life reading covered exactly the areas I was curious about — love, work, and what\'s coming next. Being able to ask questions as we went made it feel like a real conversation.' },
      { name: 'Ishita R.', text: 'I was skeptical about tarot, but the love spread described my situation so precisely that it gave me a lot to think about. Worth trying with an open mind.' },
    ],
  },

  {
    slug: 'gemstone-rudraksha',
    title: 'Gemstone & Rudraksha Consultation',
    subtitle: 'Wear What Truly Aligns With Your Energy',
    tagline: 'Expert Guidance on the Right Gemstones & Rudraksha for Your Birth Chart',
    heroDescription:
      'Not every gemstone suits every chart — and the wrong one can do more harm than good. Get a personalized recommendation on gemstones and Rudraksha based on your planetary positions, before you invest in either.',
    accentColor: '#2ecc71',
    gradientFrom: '#001a0d',
    gradientTo: '#000d07',
    icon: '💎',
    image: '/gemstonee.jpg',
    image2: '/gemstone.jpg',
    whatIs: {
      heading: 'Personalized Gemstone & Rudraksha Guidance',
      description:
        'This live consultation analyzes your birth chart to identify which planets need strengthening, which need pacifying, and which gemstones or Rudraksha beads are genuinely suited to your chart — along with practical guidance on quality, weight, metal, and how to wear them correctly.',
      bullets: [
        'Identifies which planets in your chart would benefit from gemstone support.',
        'Recommends suitable gemstones along with weight, metal, and finger/day guidance.',
        'Suggests appropriate Rudraksha based on your chart and life goals.',
        'Flags any gemstones you may currently be wearing that don\'t suit your chart.',
      ],
    },
    whatsInside: [
      { icon: 'Gem', title: 'Planetary Strength Analysis', description: 'A review of which planets in your chart are weak, afflicted, or could benefit from gemstone support.' },
      { icon: 'Star', title: 'Gemstone Recommendations', description: 'Specific primary and alternative gemstone suggestions suited to your chart, with reasoning explained.' },
      { icon: 'Layers', title: 'Rudraksha Guidance', description: 'Recommendations on which Mukhi Rudraksha may support your goals, based on your planetary placements.' },
      { icon: 'ShieldCheck', title: 'Wearing Guidelines', description: 'Guidance on correct weight, metal, finger, day, and time for wearing your recommended gemstone or Rudraksha.' },
      { icon: 'AlertTriangle', title: 'Existing Jewelry Review', description: 'If you already wear gemstones, we\'ll discuss whether they suit your chart or may need to be reconsidered.' },
    ],
    steps: [
      { title: 'Book Your Consultation', description: 'Choose a convenient time slot for your live session.' },
      { title: 'Share Your Birth Details', description: 'Provide your date, time, and place of birth for accurate chart analysis.' },
      { title: 'Get Your Personalized Recommendations', description: 'Discuss your chart live and receive clear gemstone and Rudraksha guidance.' },
    ],
    forWhom: [
      { title: 'Those Considering a Gemstone', description: 'Before investing in a gemstone, find out whether it actually suits your chart and current planetary periods.' },
      { title: 'Those Already Wearing Gemstones', description: 'Want a second opinion on whether what you\'re currently wearing is helping or working against you? Get clarity here.' },
      { title: 'People Exploring Rudraksha', description: 'Curious about which Rudraksha bead aligns with your goals — career, peace of mind, health, or relationships?' },
      { title: 'Anyone Seeking Practical, No-Pressure Advice', description: 'Get straightforward, chart-based recommendations without being pushed toward expensive purchases.' },
    ],
    pricingPlans: [
      {
        name: 'Gemstone Consultation',
        tagline: 'Chart-Based Gemstone Recommendation',
        originalPrice: '₹1,499',
        discountedPrice: '₹599',
        features: [
          { label: '20-Minute Live Call', included: true },
          { label: 'Audio Consultation', included: true },
          { label: 'Planetary Strength Analysis', included: true },
          { label: 'Primary Gemstone Recommendation', included: true },
          { label: 'Rudraksha Guidance', included: false },
          { label: 'Existing Jewelry Review', included: false },
          { label: 'Sourcing Guidance', included: false },
          { label: 'Written Summary', included: false },
        ],
      },
      {
        name: 'Gemstone + Rudraksha Consultation',
        tagline: 'Complete Gemstone & Rudraksha Guidance with Sourcing Tips',
        originalPrice: '₹3,499',
        discountedPrice: '₹1,099',
        highlight: true,
        features: [
          { label: '40-Minute Live Call', included: true },
          { label: 'Audio Consultation', included: true },
          { label: 'Planetary Strength Analysis', included: true },
          { label: 'Primary Gemstone Recommendation', included: true },
          { label: 'Rudraksha Guidance', included: true },
          { label: 'Existing Jewelry Review', included: true },
          { label: 'Sourcing Guidance', included: true },
          { label: 'Written Summary', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Will I be told which exact gemstone to buy?', answer: 'You\'ll receive a clear recommendation of the gemstone(s) most suited to your chart, along with guidance on weight, metal, and how to wear it. Sourcing guidance is included in the full plan.' },
      { question: 'What if a gemstone I\'m already wearing doesn\'t suit me?', answer: 'We\'ll explain why, based on your chart, and suggest whether to discontinue, replace, or pair it differently — without pressure to buy anything new immediately.' },
      { question: 'Do you sell gemstones or Rudraksha directly?', answer: 'This consultation focuses on guidance and recommendations based on your chart. Sourcing guidance points you toward what to look for and where, rather than a direct sale.' },
      { question: 'Is Rudraksha guidance suitable for everyone?', answer: 'Yes, Rudraksha recommendations are generally gentle and can be suggested for most charts, though the specific Mukhi recommended will depend on your individual goals and placements.' },
      { question: 'How soon can I book a session?', answer: 'Sessions are typically available within 2–3 days of booking, subject to availability.' },
    ],
    testimonials: [
      { name: 'Vivek N.', text: 'I had been wearing a gemstone for years on a friend\'s suggestion. This consultation revealed it wasn\'t doing me any favors. The alternative recommendation felt much more aligned, and the explanation made complete sense.' },
      { name: 'Lakshmi P.', text: 'Straightforward and honest — no pressure to buy anything expensive. Just clear guidance on what would actually help based on my chart, plus a Rudraksha suggestion I hadn\'t considered.' },
      { name: 'Tarun B.', text: 'The planetary strength analysis explained exactly why certain areas of my life felt stuck. The gemstone guidance was practical, and the sourcing tips saved me from an overpriced purchase I was about to make.' },
    ],
  },
]

export function getConsultationBySlug(slug: string): ConsultationConfig | undefined {
  return consultationsConfig.find((c) => c.slug === slug)
}