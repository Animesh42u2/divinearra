export interface PricingPlan {
  name: string
  tagline: string
  originalPrice: string
  discountedPrice: string
  features: { label: string; included: boolean }[]
  highlight?: boolean
}

export interface ReportConfig {
  slug: string
  title: string
  subtitle: string
  tagline: string
  heroDescription: string
  accentColor: string
  gradientFrom: string
  gradientTo: string
  icon: string
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
  pricingPlans: PricingPlan[]
  faqs: { question: string; answer: string }[]
  testimonials: { name: string; text: string }[]
}

export const reportsConfig: ReportConfig[] = [
  {
    slug: 'love-report',
    title: 'Love Report',
    subtitle: 'A Mystery the Heart Loves to Chase',
    tagline: 'An Exclusive Love Report to Uncover Your True Love Patterns',
    heroDescription:
      'Love feels right, yet something often feels missing. Your birth chart reveals the deeper truth behind your love life.',
    accentColor: '#e05c8a',
    gradientFrom: '#3d0a1a',
    gradientTo: '#1a0408',
    icon: '💝',
    whatIs: {
      heading: 'Your Guide to Understanding Your Love Life',
      description:
        "Astro Arun Pandit's Love Report is a personalized astrological guide that reveals deep insights into your emotional world and relationship patterns. Based on your birth chart, planetary positions, and key houses like the 5th and 7th, this report helps you understand how you love, what you seek, and how your journey in relationships unfolds over time.",
      bullets: [
        'Reveals your natural love patterns and emotional needs.',
        'Explains how Venus and key houses influence your romantic life.',
        'Decodes your approach to love, attraction, and commitment.',
        'Guides you toward building deeper, more fulfilling relationships.',
      ],
    },
    whatsInside: [
      {
        icon: '♀️',
        title: 'Love Personality Analysis',
        description:
          'Detailed Venus & Moon sign analysis revealing your romantic nature, emotional needs, and what you truly seek in a partner.',
      },
      {
        icon: '🏛️',
        title: '7th House & Partnership Reading',
        description:
          'Deep dive into your 7th house of marriage and partnerships to understand your relationship patterns and ideal partner traits.',
      },
      {
        icon: '🔮',
        title: 'Love & Marriage Predictions',
        description:
          'Timing predictions for romance, engagement, and marriage based on planetary transits and Dasha periods in your chart.',
      },
      {
        icon: '🧠',
        title: 'Your Relationship Mindset Decoded',
        description:
          'Discover how your thoughts, fears, and expectations influence your love life and the kind of relationships you naturally attract.',
      },
      {
        icon: '🪬',
        title: 'Remedies & Guidance',
        description:
          'Personalized Vedic remedies including crystals, mantras, gemstones, and rituals to attract love and overcome relationship obstacles.',
      },
    ],
    steps: [
      { title: 'Tell Us About You', description: 'Enter your birth details — date, time, and place.' },
      { title: 'We Study Your Chart', description: 'Our expert astrologers analyze your planets and houses.' },
      { title: 'Get Your Report', description: 'An exclusive love report created just for you.' },
    ],
    forWhom: [
      { title: 'Singles Seeking Clarity', description: 'Confused about your love life or repeating the same patterns? Understand what you truly seek.' },
      { title: 'Couples Wanting Deeper Understanding', description: 'Gain insight into emotional needs, communication styles, and relationship dynamics.' },
      { title: 'Those Facing Relationship Challenges', description: 'Dealing with confusion, heartbreak, or emotional distance? Discover the root causes through your chart.' },
      { title: 'Individuals on a Journey of Self-Discovery', description: 'Explore your emotional nature, love patterns, and relationship tendencies to make more conscious choices in love.' },
    ],
    pricingPlans: [
      {
        name: 'Love Report',
        tagline: 'Get Clarity On Your Love Life',
        originalPrice: '₹1,000',
        discountedPrice: '₹499',
        features: [
          { label: 'Personalized Love Report', included: true },
          { label: 'Detailed Relationship Insights', included: true },
          { label: 'Compatibility & Relationship Guidance', included: true },
          { label: 'Remedies & Suggestions', included: true },
          { label: 'Ask 1 Question to Astrologer', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Love Report + Ask The Astrologer',
        tagline: 'One Question on Your Mind? Get a Direct Answer.',
        originalPrice: '₹1,499',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Personalized Love Report', included: true },
          { label: 'Detailed Relationship Insights', included: true },
          { label: 'Compatibility & Relationship Guidance', included: true },
          { label: 'Remedies & Suggestions', included: true },
          { label: 'Ask 1 Question to Astrologer', included: true },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Love Report + 1-on-1 Consultation',
        tagline: 'Talk About Your Love Life with an Expert Astrologer',
        originalPrice: '₹5,600',
        discountedPrice: '₹1,299',
        features: [
          { label: 'Personalized Love Report', included: true },
          { label: 'Detailed Relationship Insights', included: true },
          { label: 'Compatibility & Relationship Guidance', included: true },
          { label: 'Remedies & Suggestions', included: true },
          { label: 'Ask 1 Question to Astrologer', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'How is this report created?', answer: 'Based on your birth date, time, and place, Astro Arun Pandit personally analyzes your chart focusing on Venus, Moon, 5th and 7th houses to craft your personalized Love Report.' },
      { question: 'Is this suitable for singles?', answer: 'Absolutely. The report reveals your love patterns, what you seek in a partner, and the best timing for romantic opportunities.' },
      { question: 'How long will it take to receive my report?', answer: 'You will receive your detailed Love Report within 3–5 business days via email and WhatsApp.' },
      { question: 'What if I want deeper guidance?', answer: 'You can opt for the Love Report + Ask The Astrologer or the 1-on-1 Consultation package for personalized, real-time guidance.' },
      { question: 'Is this report in Hindi or English?', answer: 'The report is available in both Hindi and English. You can specify your preference at the time of ordering.' },
    ],
    testimonials: [
      { name: 'Priya S.', text: 'The report explained exactly why I keep attracting unavailable people. The Venus analysis was spot-on and gave me so much clarity.' },
      { name: 'Rahul M.', text: 'I was skeptical at first, but the 7th house reading described my relationship struggles perfectly. The remedies actually helped.' },
      { name: 'Anjali K.', text: 'Finally understood my emotional patterns. This report was the wake-up call I needed to stop repeating the same mistakes in love.' },
    ],
  },
  {
    slug: 'lal-kitab-report',
    title: 'Lal Kitab Report',
    subtitle: 'Facing Repeated Problems? Lal Kitab Has the Answers!',
    tagline: 'Simple Remedies. Real Results. Based on Your Birth Chart.',
    heroDescription:
      'Despite your best efforts, problems keep repeating. Lal Kitab uncovers the hidden karmic patterns behind your challenges and offers simple, practical remedies.',
    accentColor: '#c8952a',
    gradientFrom: '#2a1500',
    gradientTo: '#1a0a00',
    icon: '📖',
    whatIs: {
      heading: 'Simple Remedies Rooted in Time-Tested Wisdom',
      description:
        'A Personalized Lal Kitab Report reveals the real reasons behind your struggles and offers simple, effective remedies to correct them. Based on time-tested Lal Kitab principles, it focuses on practical solutions you can easily apply without complex rituals or expensive procedures.',
      bullets: [
        'Simple, easy-to-understand insights without complex astrology jargon.',
        'Practical remedies using everyday items you can easily apply.',
        'Noticeable results often experienced within a few weeks.',
        'Rooted in time-tested Lal Kitab wisdom and astrological insights.',
      ],
    },
    whatsInside: [
      { icon: '🗺️', title: 'Personalized Lal Kitab Chart', description: 'Your complete Lal Kitab birth chart drawn up with precise planetary placements and house analysis.' },
      { icon: '⚖️', title: 'Planet Strength & Weakness Analysis', description: 'Detailed analysis of which planets are working for you and which are creating obstacles in your life.' },
      { icon: '🔗', title: 'Yog, Dosh & Karmic Pattern Insights', description: 'Uncover the karmic debts and planetary combinations that are influencing your repeated life challenges.' },
      { icon: '📅', title: '35-Year Life Cycle Predictions', description: 'A roadmap of your life journey across different phases with key turning points highlighted.' },
      { icon: '🌿', title: 'Powerful Lal Kitab Remedies', description: 'Simple, actionable daily-life remedies using everyday items — no complex rituals required.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Provide your date, time, and place of birth for your personalized Lal Kitab Report.' },
      { title: 'Complete the Payment', description: 'Make a secure payment to confirm your order and begin your Lal Kitab analysis.' },
      { title: 'Get Your Report & Implement Remedies', description: 'Receive your Lal Kitab E-Book report in 2–5 days and start implementing practical remedies.' },
    ],
    forWhom: [
      { title: 'People Facing Repeated Problems', description: 'Those dealing with ongoing issues in career, relationships, money, or health despite consistent efforts.' },
      { title: 'Individuals Seeking Simple Remedies', description: 'Ideal for those who want easy, actionable solutions instead of complex rituals or confusing astrology.' },
      { title: 'Those Experiencing Delays or Obstacles', description: 'Helpful for people facing delays in marriage, career growth, finances, or important life events.' },
      { title: 'Anyone Looking for Clarity and Direction', description: 'Perfect for those who want to understand the root cause of their problems and take the right steps forward.' },
    ],
    pricingPlans: [
      {
        name: 'Lal Kitab Report',
        tagline: 'Complete Karmic Analysis with Practical Remedies',
        originalPrice: '₹3,500',
        discountedPrice: '₹1,699',
        features: [
          { label: 'Personalized Lal Kitab Chart', included: true },
          { label: 'Planet Strength & Weakness Analysis', included: true },
          { label: 'Yog, Dosh & Karmic Pattern Insights', included: true },
          { label: '35-Year Life Cycle Predictions', included: true },
          { label: 'Yearly Forecast (Varshphal)', included: true },
          { label: '30-Min 1-On-1 Consultation', included: false },
        ],
      },
      {
        name: 'Lal Kitab Report + Consultation',
        tagline: 'Personalized Remedies with Expert Advice',
        originalPrice: '₹8,499',
        discountedPrice: '₹2,799',
        highlight: true,
        features: [
          { label: 'Personalized Lal Kitab Chart', included: true },
          { label: 'Planet Strength & Weakness Analysis', included: true },
          { label: 'Yog, Dosh & Karmic Pattern Insights', included: true },
          { label: '35-Year Life Cycle Predictions', included: true },
          { label: 'Yearly Forecast (Varshphal)', included: true },
          { label: '30-Min 1-On-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'How accurate is the Lal Kitab report?', answer: 'Lal Kitab astrology is highly precise when birth details are accurate. Astro Arun Pandit has analyzed over 2 lakh kundlis and delivers remarkably accurate readings.' },
      { question: 'How soon can I see results from the remedies?', answer: 'Many users report noticeable improvements within a few weeks of consistently following the Lal Kitab remedies.' },
      { question: 'Is the report personalized?', answer: 'Yes, every report is uniquely prepared based on your specific birth date, time, and place — no two reports are the same.' },
      { question: 'In which format will the report be delivered?', answer: 'The report is delivered as a detailed PDF E-Book via email and WhatsApp.' },
      { question: 'When will I receive the report?', answer: 'You will receive your report within 2–5 business days after successful payment and submission of birth details.' },
    ],
    testimonials: [
      { name: 'Khushi', text: 'I was honestly surprised by how accurately the report pointed out my recurring career issues. The Lal Kitab remedies were so simple that I actually followed them, and within a few weeks, things at work started improving.' },
      { name: 'Richa Kanojia', text: "The section on karmic debts hit very close to home. It explained patterns I've been repeating for years, especially in relationships. The lifestyle corrections felt practical and made a noticeable difference." },
      { name: 'Mukesh Kumar', text: 'The report highlighted a dosh I was not even aware of and connected it to my financial instability. The Astro Vastu tips were simple, but I have already started seeing better control over my expenses.' },
    ],
  },
  {
    slug: 'career-report',
    title: 'Career Report',
    subtitle: 'Unlock Your Professional Destiny',
    tagline: 'Discover the Career Path Written in Your Stars',
    heroDescription:
      'Your birth chart holds the blueprint of your professional potential. Stop guessing and start building the career you were born for.',
    accentColor: '#4a9eff',
    gradientFrom: '#001a3d',
    gradientTo: '#000d1a',
    icon: '💼',
    whatIs: {
      heading: 'Your Astrological Guide to Career Clarity',
      description:
        'The Career Report is a deeply personalized analysis of your 10th house, Saturn, Sun, and professional yogas in your birth chart. It reveals your natural strengths, ideal career fields, and timing for major professional breakthroughs.',
      bullets: [
        'Identifies your strongest career fields based on planetary positions.',
        'Reveals the ideal timing for job changes, promotions, and business ventures.',
        'Uncovers hidden professional strengths you may not be utilizing.',
        'Provides remedies to overcome career blocks and delays.',
      ],
    },
    whatsInside: [
      { icon: '🎯', title: '10th House Career Analysis', description: 'In-depth analysis of your 10th house to identify your natural professional strengths and ideal career domains.' },
      { icon: '📈', title: 'Career Growth Timeline', description: 'Key phases for promotions, business success, and professional milestones based on your Dasha periods.' },
      { icon: '🪐', title: 'Saturn & Sun Influence', description: 'How the planets of career and authority affect your professional journey and what to do about it.' },
      { icon: '💡', title: 'Strength & Skill Mapping', description: 'Discover your planetary-gifted talents and how to align them with the right profession.' },
      { icon: '🛠️', title: 'Career Remedies', description: 'Practical Vedic remedies to accelerate growth, remove obstacles, and attract the right opportunities.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Enter your date, time, and place of birth accurately.' },
      { title: 'Expert Chart Analysis', description: 'Astro Arun Pandit analyzes your 10th house, planets, and professional yogas.' },
      { title: 'Receive Your Career Blueprint', description: 'Get your personalized career report with actionable guidance within 3–5 days.' },
    ],
    forWhom: [
      { title: 'Professionals at a Crossroads', description: 'Unsure whether to switch jobs, industries, or start a business? Your chart has the answer.' },
      { title: 'Fresh Graduates', description: 'Choose the right career path from the start, aligned with your natural planetary strengths.' },
      { title: 'Entrepreneurs', description: 'Find the right timing to launch, scale, or pivot your business based on your cosmic cycles.' },
      { title: 'Those Facing Career Stagnation', description: 'Understand why you feel stuck and what planetary shifts will open new doors for you.' },
    ],
    pricingPlans: [
      {
        name: 'Career Report',
        tagline: 'Your Complete Career Roadmap',
        originalPrice: '₹2,000',
        discountedPrice: '₹699',
        features: [
          { label: 'Personalized Career Report', included: true },
          { label: '10th House Analysis', included: true },
          { label: 'Career Growth Timeline', included: true },
          { label: 'Vedic Career Remedies', included: true },
          { label: 'Ask 1 Question to Astrologer', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Career Report + Ask The Astrologer',
        tagline: 'Get a Direct Answer to Your Burning Career Question',
        originalPrice: '₹2,499',
        discountedPrice: '₹1,199',
        highlight: true,
        features: [
          { label: 'Personalized Career Report', included: true },
          { label: '10th House Analysis', included: true },
          { label: 'Career Growth Timeline', included: true },
          { label: 'Vedic Career Remedies', included: true },
          { label: 'Ask 1 Question to Astrologer', included: true },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Career Report + 1-on-1 Consultation',
        tagline: 'Deep-Dive Career Strategy Session with an Expert',
        originalPrice: '₹6,000',
        discountedPrice: '₹1,499',
        features: [
          { label: 'Personalized Career Report', included: true },
          { label: '10th House Analysis', included: true },
          { label: 'Career Growth Timeline', included: true },
          { label: 'Vedic Career Remedies', included: true },
          { label: 'Ask 1 Question to Astrologer', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Can astrology really guide my career?', answer: 'Yes. Vedic astrology has mapped professional tendencies through the 10th house, Saturn, and Sun for thousands of years with remarkable accuracy.' },
      { question: 'What if I am already in an established career?', answer: 'The report reveals timing for growth, salary hikes, authority expansion, and when to make strategic moves within your current field.' },
      { question: 'How is this different from a career counselor?', answer: 'A career counselor uses your skills and market trends. This report uses your unique birth chart to reveal your cosmic professional blueprint.' },
      { question: 'When will I receive the report?', answer: 'Within 3–5 business days after order confirmation and receipt of your birth details.' },
    ],
    testimonials: [
      { name: 'Vikas R.', text: 'The report told me to wait 6 months before switching jobs. I did, and the offer I got was beyond what I imagined. Incredible accuracy.' },
      { name: 'Meera T.', text: 'I always felt like I was in the wrong field. The career report confirmed it and pointed me toward creative fields — which I am now pursuing successfully.' },
      { name: 'Aditya P.', text: 'The Saturn analysis explained 3 years of professional struggles in one paragraph. The remedies helped me shift my energy completely.' },
    ],
  },
  {
    slug: 'finance-report',
    title: 'Finance Report',
    subtitle: 'Decode Your Wealth Blueprint',
    tagline: 'Understand Your Money Karma and Attract Lasting Prosperity',
    heroDescription:
      'Why do some people attract wealth effortlessly while others struggle? Your 2nd and 11th house reveal the cosmic truth about your financial destiny.',
    accentColor: '#2ecc71',
    gradientFrom: '#001a0d',
    gradientTo: '#000d07',
    icon: '💰',
    whatIs: {
      heading: 'Your Personal Wealth & Prosperity Analysis',
      description:
        "The Finance Report analyzes your 2nd house of accumulated wealth, 11th house of gains, and Jupiter's influence in your chart to reveal your money patterns, wealth-building potential, and the best times for financial decisions.",
      bullets: [
        'Reveals your wealth-accumulation patterns and money mindset.',
        'Identifies the best periods for investments, business, and savings.',
        'Uncovers financial doshas causing leakage of wealth.',
        'Provides remedies to attract abundance and financial stability.',
      ],
    },
    whatsInside: [
      { icon: '🏦', title: '2nd & 11th House Wealth Analysis', description: 'Deep analysis of your money houses to understand your earning potential and wealth accumulation capacity.' },
      { icon: '📊', title: 'Investment Timing Guide', description: 'Auspicious periods for investments, real estate decisions, and major financial commitments based on your Dasha cycles.' },
      { icon: '🪐', title: 'Jupiter & Venus Influence', description: "How the planets of abundance and luxury position in your chart and what they mean for your financial future." },
      { icon: '🔓', title: 'Wealth Blockage Analysis', description: 'Identify the planetary combinations causing financial stress, debt cycles, or unexpected money losses.' },
      { icon: '🌱', title: 'Prosperity Remedies', description: 'Vedic remedies including mantras, rituals, and lifestyle adjustments to invite lasting financial abundance.' },
    ],
    steps: [
      { title: 'Enter Your Birth Details', description: 'Provide your date, time, and place of birth for precise chart creation.' },
      { title: 'Wealth Chart Analysis', description: 'Your 2nd, 11th houses and wealth yogas are thoroughly analyzed.' },
      { title: 'Receive Your Finance Blueprint', description: 'Get your personalized finance report with actionable wealth-building guidance.' },
    ],
    forWhom: [
      { title: 'Those Struggling Financially', description: 'Understand the root planetary causes of your financial challenges and how to overcome them.' },
      { title: 'Investors & Business Owners', description: 'Time your financial decisions with the cosmos for maximum returns and success.' },
      { title: 'Salaried Professionals', description: 'Discover when salary hikes, bonuses, and new income streams are favored by your chart.' },
      { title: 'Anyone Seeking Abundance', description: 'Align your actions with your wealth karma to build lasting financial security and prosperity.' },
    ],
    pricingPlans: [
      {
        name: 'Finance Report',
        tagline: 'Your Complete Wealth & Prosperity Roadmap',
        originalPrice: '₹2,000',
        discountedPrice: '₹699',
        features: [
          { label: 'Personalized Finance Report', included: true },
          { label: '2nd & 11th House Analysis', included: true },
          { label: 'Investment Timing Guide', included: true },
          { label: 'Prosperity Remedies', included: true },
          { label: 'Ask 1 Question to Astrologer', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Finance Report + Consultation',
        tagline: 'Expert Guidance on Your Financial Journey',
        originalPrice: '₹6,000',
        discountedPrice: '₹1,499',
        highlight: true,
        features: [
          { label: 'Personalized Finance Report', included: true },
          { label: '2nd & 11th House Analysis', included: true },
          { label: 'Investment Timing Guide', included: true },
          { label: 'Prosperity Remedies', included: true },
          { label: 'Ask 1 Question to Astrologer', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Can astrology predict my financial future?', answer: 'Vedic astrology reveals your wealth tendencies, favorable periods, and potential obstacles — giving you the insight to make better financial decisions.' },
      { question: 'I keep losing money despite working hard. Can this help?', answer: 'Yes. The report identifies specific planetary doshas causing financial leakage and provides targeted remedies to correct them.' },
      { question: 'Is this useful for business owners?', answer: 'Absolutely. Business timing, partnership decisions, and expansion phases can be perfectly aligned with your wealth Dasha periods.' },
      { question: 'When will I receive my report?', answer: 'Within 3–5 business days of order confirmation.' },
    ],
    testimonials: [
      { name: 'Santosh K.', text: 'The report identified a debt yoga I had and gave me simple remedies. Within months, I cleared a loan I had been struggling with for years.' },
      { name: 'Deepa M.', text: 'The investment timing was incredibly accurate. I waited for the period mentioned in the report and my portfolio has grown significantly since.' },
      { name: 'Ramesh B.', text: 'I always wondered why money slipped through my fingers. The 2nd house analysis explained everything. The remedies changed my money habits completely.' },
    ],
  },
]

export function getReportBySlug(slug: string): ReportConfig | undefined {
  return reportsConfig.find((r) => r.slug === slug)
}
