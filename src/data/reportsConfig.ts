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
  image: string
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
    image: '/reports/love-report.png',
    whatIs: {
      heading: 'Your Guide to Understanding Your Love Life',
      description:
        "Aditya Narayan Panigrahi's Love Report is a personalized astrological guide that reveals deep insights into your emotional world and relationship patterns. Based on your birth chart, planetary positions, and key houses like the 5th and 7th, this report helps you understand how you love, what you seek, and how your journey in relationships unfolds over time.",
      bullets: [
        'Reveals your natural love patterns and emotional needs.',
        'Explains how Venus and key houses influence your romantic life.',
        'Decodes your approach to love, attraction, and commitment.',
        'Guides you toward building deeper, more fulfilling relationships.',
      ],
    },
    whatsInside: [
      { icon: 'Heart', title: 'Love Personality Analysis', description: 'Detailed Venus & Moon sign analysis revealing your romantic nature, emotional needs, and what you truly seek in a partner.' },
      { icon: 'Building2', title: '7th House & Partnership Reading', description: 'Deep dive into your 7th house of marriage and partnerships to understand your relationship patterns and ideal partner traits.' },
      { icon: 'Sparkles', title: 'Love & Marriage Predictions', description: 'Timing predictions for romance, engagement, and marriage based on planetary transits and Dasha periods in your chart.' },
      { icon: 'Brain', title: 'Your Relationship Mindset Decoded', description: 'Discover how your thoughts, fears, and expectations influence your love life and the kind of relationships you naturally attract.' },
      { icon: 'Wand2', title: 'Remedies & Guidance', description: 'Personalized Vedic remedies including crystals, mantras, gemstones, and rituals to attract love and overcome relationship obstacles.' },
      { icon: 'Moon', title: 'Emotional Compatibility Patterns', description: 'Analysis of your Moon sign and its influence on your emotional responses, attachment style, and compatibility with different partners.' },
      { icon: 'Users', title: 'Past Relationship Karma', description: 'Uncover karmic patterns from past relationships that may be repeating and how to consciously break free from them.' },
      { icon: 'Star', title: 'Soulmate Timing Forecast', description: 'Astrological windows when a deep, meaningful connection is most likely to enter your life based on your chart cycles.' },
    ],
    steps: [
      { title: 'Tell Us About You', description: 'Enter your birth details — date, time, and place.' },
      { title: 'We Study Your Chart', description: 'Our expert astrologers analyze your planets and houses.' },
      { title: 'Get Your Report', description: 'An exclusive love report created just for you.' },
    ],
    forWhom: [
      { title: 'You Are Single and Seeking Clarity', description: 'Confused about your love life or repeating the same patterns? Understand what you truly seek.' },
      { title: 'You Are a Couple Wanting Deeper Understanding', description: 'Gain insight into emotional needs, communication styles, and relationship dynamics.' },
      { title: 'You Are Facing Relationship Challenges', description: 'Dealing with confusion, heartbreak, or emotional distance? Discover the root causes through your chart.' },
      { title: 'You Are on a Journey of Self-Discovery', description: 'Explore your emotional nature, love patterns, and relationship tendencies to make more conscious choices in love.' },
      { title: 'You Keep Attracting the Wrong People', description: 'Understand the planetary patterns behind your attraction tendencies and learn how to break the cycle.' },
      { title: 'You Are Ready to Invite Real Love In', description: 'Align your energy with your Venus placements and open yourself to the kind of love your chart truly supports.' },
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
          { label: 'Remedies & Suggestions for Love & Relationships', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
          { label: 'Real-Time Guidance', included: false },
        ],
      },
      {
        name: 'Love Report + 1-on-1 Consultation',
        tagline: 'Talk About Your Love Life with an Expert Astrologer',
        originalPrice: '₹5,600',
        discountedPrice: '₹1,299',
        highlight: true,
        features: [
          { label: 'Personalized Love Report', included: true },
          { label: 'Detailed Relationship Insights', included: true },
          { label: 'Compatibility & Relationship Guidance', included: true },
          { label: 'Remedies & Suggestions for Love & Relationships', included: true },
          { label: 'Priority Customer Support', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
          { label: 'Real-Time Guidance', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'How is this report created?', answer: 'Based on your birth date, time, and place, Aditya Narayan Panigrahi personally analyzes your chart focusing on Venus, Moon, 5th and 7th houses to craft your personalized Love Report.' },
      { question: 'Is this suitable for singles?', answer: 'Absolutely. The report reveals your love patterns, what you seek in a partner, and the best timing for romantic opportunities.' },
      { question: 'How long will it take to receive my report?', answer: 'You will receive your detailed Love Report within 3–5 business days via email and WhatsApp.' },
      { question: 'What if I want deeper guidance?', answer: 'You can opt for the Love Report + 1-on-1 Consultation package for personalized, real-time guidance.' },
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
    image: '/lal-kitab-report.jpg',
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
      { icon: 'Map', title: 'Personalized Lal Kitab Chart', description: 'Your complete Lal Kitab birth chart drawn up with precise planetary placements and house analysis.' },
      { icon: 'Scale', title: 'Planet Strength & Weakness Analysis', description: 'Detailed analysis of which planets are working for you and which are creating obstacles in your life.' },
      { icon: 'Link', title: 'Yog, Dosh & Karmic Pattern Insights', description: 'Uncover the karmic debts and planetary combinations that are influencing your repeated life challenges.' },
      { icon: 'Calendar', title: '35-Year Life Cycle Predictions', description: 'A roadmap of your life journey across different phases with key turning points highlighted.' },
      { icon: 'Leaf', title: 'Powerful Lal Kitab Remedies', description: 'Simple, actionable daily-life remedies using everyday items — no complex rituals required.' },
      { icon: 'Home', title: 'Astro Vastu Guidance', description: 'Lal Kitab-based home and workspace tips to correct environmental energy and reduce planetary afflictions.' },
      { icon: 'RefreshCw', title: 'Debt & Blockage Clearance Plan', description: 'Specific remedies targeting your most persistent financial, relational, or career blockages to break the cycle.' },
      { icon: 'Sun', title: 'Daily Lifestyle Corrections', description: 'Simple day-to-day behavioral and lifestyle adjustments recommended by Lal Kitab to align your actions with positive planetary energy.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Provide your date, time, and place of birth for your personalized Lal Kitab Report.' },
      { title: 'Complete the Payment', description: 'Make a secure payment to confirm your order and begin your Lal Kitab analysis.' },
      { title: 'Get Your Report & Implement Remedies', description: 'Receive your Lal Kitab E-Book report in 2–5 days and start implementing practical remedies.' },
    ],
    forWhom: [
      { title: 'You Are Facing Repeated Problems', description: 'Those dealing with ongoing issues in career, relationships, money, or health despite consistent efforts.' },
      { title: 'You Are Seeking Simple, Practical Remedies', description: 'Ideal for those who want easy, actionable solutions instead of complex rituals or confusing astrology.' },
      { title: 'You Are Experiencing Delays or Obstacles', description: 'Helpful for people facing delays in marriage, career growth, finances, or important life events.' },
      { title: 'You Are Looking for Clarity and Direction', description: 'Perfect for those who want to understand the root cause of their problems and take the right steps forward.' },
      { title: 'You Feel Stuck Despite Your Best Efforts', description: 'When hard work alone is not delivering results, Lal Kitab reveals the hidden planetary cause and the remedy to break free.' },
      { title: 'You Want Results Without Complicated Rituals', description: 'Lal Kitab remedies use everyday items and simple acts — perfect if you want real change without elaborate procedures.' },
    ],
    pricingPlans: [
      {
        name: 'Lal Kitab Report',
        tagline: 'Complete Karmic Analysis with Practical Remedies',
        originalPrice: '₹3,500',
        discountedPrice: '₹299',
        features: [
          { label: 'Personalized Lal Kitab Chart', included: true },
          { label: 'Planet Strength & Weakness Analysis', included: true },
          { label: 'Yog, Dosh & Karmic Pattern Insights', included: true },
          { label: '35-Year Life Cycle Predictions', included: true },
          { label: 'Yearly Forecast (Varshphal)', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-Min 1-On-1 Consultation', included: false },
        ],
      },
      {
        name: 'Lal Kitab Report + Consultation',
        tagline: 'Personalized Remedies with Expert Advice',
        originalPrice: '₹8,499',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Personalized Lal Kitab Chart', included: true },
          { label: 'Planet Strength & Weakness Analysis', included: true },
          { label: 'Yog, Dosh & Karmic Pattern Insights', included: true },
          { label: '35-Year Life Cycle Predictions', included: true },
          { label: 'Yearly Forecast (Varshphal)', included: true },
          { label: 'Priority Customer Support', included: true },
          { label: '30-Min 1-On-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'How accurate is the Lal Kitab report?', answer: 'Lal Kitab astrology is highly precise when birth details are accurate. Aditya Narayan Panigrahi has analyzed over 2 lakh kundlis and delivers remarkably accurate readings.' },
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
    image: '/career.png',
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
      { icon: 'Target', title: '10th House Career Analysis', description: 'In-depth analysis of your 10th house to identify your natural professional strengths and ideal career domains.' },
      { icon: 'TrendingUp', title: 'Career Growth Timeline', description: 'Key phases for promotions, business success, and professional milestones based on your Dasha periods.' },
      { icon: 'Globe', title: 'Saturn & Sun Influence', description: 'How the planets of career and authority affect your professional journey and what to do about it.' },
      { icon: 'Lightbulb', title: 'Strength & Skill Mapping', description: 'Discover your planetary-gifted talents and how to align them with the right profession.' },
      { icon: 'Wrench', title: 'Career Remedies', description: 'Practical Vedic remedies to accelerate growth, remove obstacles, and attract the right opportunities.' },
      { icon: 'Briefcase', title: 'Business vs. Job Suitability', description: 'Astrological analysis of whether entrepreneurship or employment is better aligned with your planetary strengths and timing.' },
      { icon: 'Award', title: 'Leadership & Authority Potential', description: 'Assessment of your potential for leadership roles, management positions, and public recognition based on your chart.' },
      { icon: 'ArrowUpRight', title: 'Foreign Career & Abroad Opportunities', description: 'Planetary indications of overseas work opportunities, foreign collaborations, or relocation for career advancement.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Enter your date, time, and place of birth accurately.' },
      { title: 'Expert Chart Analysis', description: 'Aditya Narayan Panigrahi analyzes your 10th house, planets, and professional yogas.' },
      { title: 'Receive Your Career Blueprint', description: 'Get your personalized career report with actionable guidance within 3–5 days.' },
    ],
    forWhom: [
      { title: 'You Are a Professional at a Crossroads', description: 'Unsure whether to switch jobs, industries, or start a business? Your chart has the answer.' },
      { title: 'You Are a Fresh Graduate', description: 'Choose the right career path from the start, aligned with your natural planetary strengths.' },
      { title: 'You Are an Entrepreneur', description: 'Find the right timing to launch, scale, or pivot your business based on your cosmic cycles.' },
      { title: 'You Are Facing Career Stagnation', description: 'Understand why you feel stuck and what planetary shifts will open new doors for you.' },
      { title: 'You Are Working Hard but Not Getting Recognition', description: 'Your chart reveals the planetary reason behind slow growth and the exact remedy to unlock the success you deserve.' },
      { title: 'You Want to Know If Abroad Opportunities Are in Your Stars', description: 'Discover whether foreign career prospects, international roles, or relocation are favored by your planetary placements.' },
    ],
    pricingPlans: [
      {
        name: 'Career Report',
        tagline: 'Your Complete Career Roadmap',
        originalPrice: '₹2,000',
        discountedPrice: '₹349',
        features: [
          { label: 'Personalized Career Report', included: true },
          { label: '10th House Analysis', included: true },
          { label: 'Career Growth Timeline', included: true },
          { label: 'Vedic Career Remedies', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Career Report + 1-on-1 Consultation',
        tagline: 'Deep-Dive Career Strategy Session with an Expert',
        originalPrice: '₹6,000',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Personalized Career Report', included: true },
          { label: '10th House Analysis', included: true },
          { label: 'Career Growth Timeline', included: true },
          { label: 'Vedic Career Remedies', included: true },
          { label: 'Priority Customer Support', included: true },
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
    image: '/finance.webp',
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
      { icon: 'Landmark', title: '2nd & 11th House Wealth Analysis', description: 'Deep analysis of your money houses to understand your earning potential and wealth accumulation capacity.' },
      { icon: 'BarChart2', title: 'Investment Timing Guide', description: 'Auspicious periods for investments, real estate decisions, and major financial commitments based on your Dasha cycles.' },
      { icon: 'Star', title: 'Jupiter & Venus Influence', description: 'How the planets of abundance and luxury position in your chart and what they mean for your financial future.' },
      { icon: 'Unlock', title: 'Wealth Blockage Analysis', description: 'Identify the planetary combinations causing financial stress, debt cycles, or unexpected money losses.' },
      { icon: 'Sprout', title: 'Prosperity Remedies', description: 'Vedic remedies including mantras, rituals, and lifestyle adjustments to invite lasting financial abundance.' },
      { icon: 'PiggyBank', title: 'Savings & Accumulation Strategy', description: 'Planetary guidance on when to save, when to spend, and how to build sustainable long-term wealth based on your chart.' },
      { icon: 'Handshake', title: 'Business Partnership Suitability', description: 'Astrological assessment of your chart\'s indication for profitable business partnerships and collaborative ventures.' },
      { icon: 'TrendingDown', title: 'Debt & Loss Prevention Insights', description: 'Specific Dasha and transit periods when financial caution is most critical, with protective remedies to minimize losses.' },
    ],
    steps: [
      { title: 'Enter Your Birth Details', description: 'Provide your date, time, and place of birth for precise chart creation.' },
      { title: 'Wealth Chart Analysis', description: 'Your 2nd, 11th houses and wealth yogas are thoroughly analyzed.' },
      { title: 'Receive Your Finance Blueprint', description: 'Get your personalized finance report with actionable wealth-building guidance.' },
    ],
    forWhom: [
      { title: 'You Are Struggling Financially', description: 'Understand the root planetary causes of your financial challenges and how to overcome them.' },
      { title: 'You Are an Investor or Business Owner', description: 'Time your financial decisions with the cosmos for maximum returns and success.' },
      { title: 'You Are a Salaried Professional', description: 'Discover when salary hikes, bonuses, and new income streams are favored by your chart.' },
      { title: 'You Are Seeking Abundance', description: 'Align your actions with your wealth karma to build lasting financial security and prosperity.' },
      { title: 'You Work Hard but Money Never Seems to Stay', description: 'Your chart reveals the planetary dosha causing wealth leakage — and the exact remedy to finally retain and grow what you earn.' },
      { title: 'You Want to Make Smarter Investment Decisions', description: 'Stop guessing and start timing your financial moves with your most favorable Dasha and transit periods for maximum success.' },
    ],
    pricingPlans: [
      {
        name: 'Finance Report',
        tagline: 'Your Complete Wealth & Prosperity Roadmap',
        originalPrice: '₹2,000',
        discountedPrice: '₹349',
        features: [
          { label: 'Personalized Finance Report', included: true },
          { label: '2nd & 11th House Analysis', included: true },
          { label: 'Investment Timing Guide', included: true },
          { label: 'Prosperity Remedies', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Finance Report + Consultation',
        tagline: 'Expert Guidance on Your Financial Journey',
        originalPrice: '₹6,000',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Personalized Finance Report', included: true },
          { label: '2nd & 11th House Analysis', included: true },
          { label: 'Investment Timing Guide', included: true },
          { label: 'Prosperity Remedies', included: true },
          { label: 'Priority Customer Support', included: true },
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

  {
    slug: 'couple-matching-report',
    title: 'Couple Matching Report',
    subtitle: 'Are You Truly Compatible?',
    tagline: 'Discover Your Cosmic Compatibility & Build a Lasting Bond',
    heroDescription:
      'Beyond attraction lies deep astrological compatibility. Find out if your stars align for a loving, lasting relationship built on trust and mutual understanding.',
    accentColor: '#e05c8a',
    gradientFrom: '#3d0a1a',
    gradientTo: '#1a0408',
    icon: '💑',
    image: '/couple-matching-report.webp',
    whatIs: {
      heading: 'A Deep Astrological Compatibility Analysis for Couples',
      description:
        "The Couple Matching Report compares both partners' birth charts to assess compatibility across love, communication, values, and long-term potential. Using Vedic Kundli Milan and advanced chart analysis, it goes far beyond basic sun sign matching to give you real clarity on your relationship.",
      bullets: [
        'Compares Kundlis of both partners for deep compatibility insights.',
        'Analyzes Ashtakoot Milan — 8 key areas of relationship compatibility.',
        'Reveals emotional, physical, and spiritual alignment between partners.',
        'Guides couples toward stronger communication and mutual understanding.',
      ],
    },
    whatsInside: [
      { icon: 'Hash', title: 'Ashtakoot Guna Milan', description: 'Complete 36-point compatibility scoring across Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi.' },
      { icon: 'Orbit', title: 'Planetary Compatibility Analysis', description: 'How your Venus, Moon, Mars, and 7th house interact with your partner\'s chart for love and harmony.' },
      { icon: 'AlertTriangle', title: 'Dosha & Obstacle Identification', description: 'Identification of Mangal Dosha, Nadi Dosha, and other doshas with remedies to neutralize them.' },
      { icon: 'MessageCircle', title: 'Communication & Emotional Bonding', description: 'Analysis of how both partners communicate, express love, and handle conflict based on their charts.' },
      { icon: 'Flower2', title: 'Long-Term Compatibility Forecast', description: 'A forward-looking assessment of relationship milestones, challenges, and auspicious marriage timing.' },
      { icon: 'ShieldCheck', title: 'Navamsa Chart Compatibility', description: 'Advanced D9 (Navamsa) chart comparison revealing the deeper spiritual and marital compatibility between both partners.' },
      { icon: 'Flame', title: 'Physical & Intimate Compatibility', description: 'Planetary analysis of physical attraction, intimacy alignment, and long-term romantic satisfaction between the couple.' },
      { icon: 'Calendar', title: 'Auspicious Marriage Muhurta Guidance', description: 'Recommendations for the most favorable periods and dates for engagement and marriage based on both charts.' },
    ],
    steps: [
      { title: 'Share Both Birth Details', description: 'Provide date, time, and place of birth for both partners.' },
      { title: 'Dual Chart Analysis', description: 'Expert astrologers compare both charts across all compatibility dimensions.' },
      { title: 'Receive Your Compatibility Report', description: 'Get a comprehensive report with scores, insights, and remedies within 3–5 days.' },
    ],
    forWhom: [
      { title: 'You Are a Couple Planning Marriage', description: 'Confirm compatibility and identify potential challenges before making a lifelong commitment.' },
      { title: 'You Are a Family Arranging a Marriage', description: 'Get a thorough Kundli Milan to ensure a harmonious and auspicious match.' },
      { title: 'You Are Dating and Seeking Clarity', description: 'Understand if your relationship has the cosmic foundation for a lasting future together.' },
      { title: 'You Are a Married Couple Facing Challenges', description: 'Discover the planetary reasons behind friction and get remedies to restore harmony.' },
      { title: 'You Want to Know If Doshas Are Affecting Your Relationship', description: 'Get clarity on Mangal Dosha, Nadi Dosha, and other planetary conflicts — and learn the remedies to neutralize them before they cause harm.' },
      { title: 'You Love Each Other but Feel Something Is Off', description: 'When connection exists but friction persists, your charts reveal the hidden incompatibilities and how to bridge them consciously.' },
    ],
    pricingPlans: [
      {
        name: 'Couple Matching Report',
        tagline: 'Complete Compatibility Analysis for Both Partners',
        originalPrice: '₹2,000',
        discountedPrice: '₹499',
        features: [
          { label: 'Ashtakoot Guna Milan (36 Points)', included: true },
          { label: 'Planetary Compatibility Analysis', included: true },
          { label: 'Dosha Identification & Remedies', included: true },
          { label: 'Long-Term Compatibility Forecast', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Couple Matching + 1-on-1 Consultation',
        tagline: 'Deep-Dive Session on Your Relationship Compatibility',
        originalPrice: '₹6,500',
        discountedPrice: '₹1,100',
        highlight: true,
        features: [
          { label: 'Ashtakoot Guna Milan (36 Points)', included: true },
          { label: 'Planetary Compatibility Analysis', included: true },
          { label: 'Dosha Identification & Remedies', included: true },
          { label: 'Long-Term Compatibility Forecast', included: true },
          { label: 'Priority Customer Support', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'What is Ashtakoot Milan?', answer: 'Ashtakoot Milan is the traditional Vedic method of matching 8 key qualities of both charts, giving a total score out of 36. A score above 18 is considered compatible.' },
      { question: 'Can this report be done for love marriages too?', answer: 'Absolutely. The report is equally valuable for love marriages to understand long-term compatibility and resolve any planetary conflicts.' },
      { question: 'What if there is a Mangal Dosha in one chart?', answer: 'The report identifies Mangal Dosha and other doshas and provides specific Vedic remedies to neutralize their effects.' },
      { question: 'How long does it take?', answer: 'You will receive the report within 3–5 business days via email and WhatsApp.' },
      { question: 'Is the report available in Hindi?', answer: 'Yes, the report is available in both Hindi and English. Specify your preference at checkout.' },
    ],
    testimonials: [
      { name: 'Sneha & Arjun', text: 'We were unsure about our compatibility due to a Mangal Dosha concern. The report gave us full clarity and the remedies were simple to follow. We are now happily married.' },
      { name: 'Pooja R.', text: 'The Guna Milan score was 28 out of 36. The detailed analysis of our emotional and communication styles was incredibly accurate. Highly recommend.' },
      { name: 'Vikram S.', text: 'Our families were hesitant about our match. After getting this report, they were convinced. The planetary analysis went far beyond any basic horoscope matching we had done.' },
    ],
  },

  {
    slug: 'education-report',
    title: 'Education Report',
    subtitle: 'Align Your Studies with Your Stars',
    tagline: 'Discover the Subjects, Streams & Timing Where You Are Destined to Excel',
    heroDescription:
      'Struggling to choose the right field of study? Your birth chart reveals your natural intellectual strengths and the academic path where you will truly thrive.',
    accentColor: '#7c5cbf',
    gradientFrom: '#1a0a3d',
    gradientTo: '#0d0520',
    icon: '🎓',
    image: '/education-report.jpg',
    whatIs: {
      heading: 'Your Personalized Academic & Learning Blueprint',
      description:
        "The Education Report analyzes your 4th house of learning, 5th house of intelligence, Mercury's placement, and key educational yogas in your chart. It reveals your natural learning style, ideal academic streams, and the most favorable periods for studies and competitive exams.",
      bullets: [
        'Identifies your strongest subjects and academic fields based on your chart.',
        'Reveals favorable periods for exams, admissions, and academic milestones.',
        'Uncovers learning style, concentration ability, and intellectual strengths.',
        'Provides remedies to improve focus, memory, and academic performance.',
      ],
    },
    whatsInside: [
      { icon: 'BookOpen', title: '4th & 5th House Education Analysis', description: 'In-depth reading of your houses of learning and intelligence to map your academic potential.' },
      { icon: 'BrainCircuit', title: 'Mercury & Jupiter Influence', description: 'How the planets of intellect and wisdom influence your learning ability, communication, and academic success.' },
      { icon: 'Trophy', title: 'Exam & Competition Timing', description: 'Most favorable Dasha and transit periods for competitive exams, admissions, and academic achievements.' },
      { icon: 'Compass', title: 'Ideal Stream & Career Path Guidance', description: 'Science, Commerce, Arts, or technical fields — discover which aligns best with your planetary strengths.' },
      { icon: 'Zap', title: 'Education Remedies & Boosters', description: 'Vedic remedies including mantras, gemstones, and practices to enhance focus, memory, and academic performance.' },
      { icon: 'Globe2', title: 'Higher Education & Abroad Study Potential', description: 'Planetary indications of opportunities for postgraduate studies, scholarships, or education in foreign countries.' },
      { icon: 'Clock', title: 'Study Concentration & Timing Analysis', description: 'Ideal time-of-day and seasonal windows for peak mental performance and retention based on your chart.' },
      { icon: 'Layers', title: 'Multi-Language & Skill Aptitude', description: 'Assessment of your planetary potential for languages, arts, music, mathematics, or technical skill mastery.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Provide your date, time, and place of birth accurately.' },
      { title: 'Chart & Yoga Analysis', description: 'Expert astrologers analyze Mercury, Jupiter, 4th and 5th houses, and key educational yogas.' },
      { title: 'Receive Your Education Blueprint', description: 'Get your personalized report with stream guidance, exam timing, and remedies within 3–5 days.' },
    ],
    forWhom: [
      { title: 'You Are a Student at an Academic Crossroads', description: 'Unsure which stream or field to choose after 10th or 12th? Your chart has the answer.' },
      { title: 'You Are a Parent Planning Your Child\'s Future', description: 'Get astrological guidance on the best educational path for your child\'s natural strengths.' },
      { title: 'You Are Preparing for Competitive Exams', description: 'Understand when the stars favor your exam preparation and what remedies will improve your results.' },
      { title: 'You Are a Professional Considering Higher Education', description: 'Discover if this is the right time for an MBA, certification, or further studies.' },
      { title: 'You Are Struggling with Focus or Academic Performance', description: 'Your Mercury and 5th house placements reveal the root cause of concentration issues — and the remedies to sharpen your mind.' },
      { title: 'You Want to Know If Studying Abroad Is in Your Stars', description: 'Find out if foreign education, international scholarships, or overseas academic opportunities are written in your planetary chart.' },
    ],
    pricingPlans: [
      {
        name: 'Education Report',
        tagline: 'Your Complete Academic & Learning Roadmap',
        originalPrice: '₹1,500',
        discountedPrice: '₹299',
        features: [
          { label: 'Personalized Education Report', included: true },
          { label: '4th & 5th House Analysis', included: true },
          { label: 'Exam & Admission Timing', included: true },
          { label: 'Stream & Subject Guidance', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Education Report + 1-on-1 Consultation',
        tagline: 'Personal Guidance Session for Academic Direction',
        originalPrice: '₹5,000',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Personalized Education Report', included: true },
          { label: '4th & 5th House Analysis', included: true },
          { label: 'Exam & Admission Timing', included: true },
          { label: 'Stream & Subject Guidance', included: true },
          { label: 'Priority Customer Support', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Can astrology help with stream selection?', answer: 'Yes. Planetary positions in the 4th, 5th house and Mercury\'s strength clearly indicate natural aptitudes for science, arts, commerce, or technical fields.' },
      { question: 'Is this useful for competitive exam preparation?', answer: 'Absolutely. The report identifies your most favorable periods for exams like JEE, NEET, UPSC, CAT, and others based on your Dasha cycles.' },
      { question: 'Can this report be used for a child?', answer: 'Yes. The report is equally effective for children and teenagers to guide their academic path from an early stage.' },
      { question: 'When will I receive the report?', answer: 'Within 3–5 business days of order confirmation and submission of birth details.' },
    ],
    testimonials: [
      { name: 'Riya M.', text: 'I was confused between engineering and medicine. The report clearly indicated a strong Mercury and 5th house pointing toward sciences. I chose engineering and am now thriving.' },
      { name: 'Suresh P.', text: 'My son was struggling in school. The remedies suggested in the report — especially the Mercury mantra — made a visible difference in his concentration within weeks.' },
      { name: 'Kavya T.', text: 'The exam timing prediction was accurate. I appeared for my MBA entrance exactly during the favorable Dasha period mentioned in my report and cleared it.' },
    ],
  },

  {
    slug: 'health-report',
    title: 'Health Report',
    subtitle: 'Know Your Body Through the Stars',
    tagline: 'Understand Your Health Vulnerabilities & Protect Your Vitality with Vedic Wisdom',
    heroDescription:
      'Your birth chart reveals the organs, systems, and health areas that need your attention. Get ahead of potential health challenges with astrological foresight.',
    accentColor: '#27ae60',
    gradientFrom: '#012a10',
    gradientTo: '#001508',
    icon: '🏥',
    image: '/health-report.jpg',
    whatIs: {
      heading: 'Your Astrological Health & Vitality Analysis',
      description:
        "The Health Report analyzes your Ascendant, 6th house of illness, Sun's vitality, and health-related planetary yogas to reveal your constitution, areas of vulnerability, and the most sensitive health periods in your life cycle.",
      bullets: [
        'Identifies health-sensitive areas linked to your planetary placements.',
        'Reveals vulnerable periods for illness and preventive timing.',
        'Analyzes your natural constitution and immunity based on your chart.',
        'Provides Vedic remedies and lifestyle tips to maintain vitality.',
      ],
    },
    whatsInside: [
      { icon: 'Microscope', title: 'Ascendant & 6th House Health Analysis', description: 'Analysis of your rising sign and house of illness to understand your physical constitution and health tendencies.' },
      { icon: 'Sun', title: 'Sun & Mars Vitality Reading', description: 'How your Sun (life force) and Mars (physical energy) influence your stamina, immunity, and recovery capacity.' },
      { icon: 'Clock', title: 'Health-Sensitive Period Forecast', description: 'Dasha and transit periods when health vigilance is most important, along with protective measures.' },
      { icon: 'HeartPulse', title: 'Organ & System Vulnerability Map', description: 'Planetary connections to specific organs and body systems that need attention and care.' },
      { icon: 'Leaf', title: 'Ayurvedic & Vedic Health Remedies', description: 'Personalized remedies including herbs, lifestyle changes, mantras, and rituals to strengthen your health.' },
      { icon: 'Apple', title: 'Diet & Nutrition Guidance by Dosha', description: 'Ayurvedic dietary recommendations based on your Prakriti (body constitution) as revealed through your planetary chart.' },
      { icon: 'Wind', title: 'Mental Health & Stress Patterns', description: 'Planetary indicators of anxiety, stress, emotional imbalance, and the astrological periods requiring extra mental care.' },
      { icon: 'Activity', title: 'Longevity & Vitality Forecast', description: 'Analysis of your overall life force, recovery strength, and the planetary combinations supporting long-term health and longevity.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Provide your date, time, and place of birth for precise chart analysis.' },
      { title: 'Health Chart Analysis', description: 'Your Ascendant, 6th house, and health yogas are thoroughly examined by our expert.' },
      { title: 'Receive Your Health Blueprint', description: 'Get your personalized health report with insights and preventive guidance within 3–5 days.' },
    ],
    forWhom: [
      { title: 'You Are Dealing with Recurring Health Issues', description: 'Understand the planetary roots behind persistent health problems and get targeted remedies.' },
      { title: 'You Are a Health-Conscious Individual', description: 'Use astrological foresight to take preventive measures before health challenges arise.' },
      { title: 'You Are a Senior or Caring for an Elderly Loved One', description: 'Identify vulnerable health periods in advance and prepare with appropriate care and remedies.' },
      { title: 'You Are Seeking Holistic Wellness', description: 'Combine modern healthcare awareness with ancient Vedic health wisdom for complete well-being.' },
      { title: 'You Want to Know Which Body Systems Need Extra Attention', description: 'Your chart maps specific organs and systems linked to your planetary placements so you can take targeted, preventive care.' },
      { title: 'You Are Going Through Stress, Anxiety, or Emotional Burnout', description: 'Discover the astrological periods triggering mental strain and the Vedic practices that restore balance, calm, and resilience.' },
    ],
    pricingPlans: [
      {
        name: 'Health Report',
        tagline: 'Your Complete Astrological Health Blueprint',
        originalPrice: '₹2,000',
        discountedPrice: '₹299',
        features: [
          { label: 'Personalized Health Report', included: true },
          { label: 'Ascendant & 6th House Analysis', included: true },
          { label: 'Health-Sensitive Period Forecast', included: true },
          { label: 'Vedic Health Remedies', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Health Report + Consultation',
        tagline: 'Expert Health Guidance with Personal Consultation',
        originalPrice: '₹6,000',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Personalized Health Report', included: true },
          { label: 'Ascendant & 6th House Analysis', included: true },
          { label: 'Health-Sensitive Period Forecast', included: true },
          { label: 'Vedic Health Remedies', included: true },
          { label: 'Priority Customer Support', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Is this a substitute for medical advice?', answer: 'No. This report provides astrological insights into health tendencies and preventive timing. Always consult a qualified medical professional for diagnosis and treatment.' },
      { question: 'How accurate are health predictions?', answer: 'Vedic astrology identifies constitutional tendencies and vulnerable periods with notable accuracy, helping you take timely preventive action.' },
      { question: 'Can this help with chronic illness?', answer: 'The report identifies planetary doshas linked to chronic conditions and provides targeted Vedic remedies to support healing alongside medical treatment.' },
      { question: 'When will I receive my report?', answer: 'Within 3–5 business days after order confirmation.' },
    ],
    testimonials: [
      { name: 'Anita B.', text: 'The report identified a Saturn-related vulnerability in my joints. I took preventive care and avoided what could have been a serious issue. Truly valuable foresight.' },
      { name: 'Mohan L.', text: 'I have been dealing with digestive issues for years. The 6th house analysis pinpointed the exact planetary cause. The remedies significantly reduced my discomfort.' },
      { name: 'Sunita R.', text: 'As a senior citizen, knowing the health-sensitive periods in advance has helped me and my family prepare better. Highly recommend this report for elders.' },
    ],
  },

  {
    slug: 'fortune-report',
    title: 'Fortune Report',
    subtitle: 'Unlock the Secrets of Your Destiny',
    tagline: 'A Complete Life Reading — Career, Wealth, Love & Spiritual Path Combined',
    heroDescription:
      'Your birth chart is the map of your entire destiny. The Fortune Report reveals the full picture — your strengths, your challenges, your peak periods, and your life purpose.',
    accentColor: '#f39c12',
    gradientFrom: '#2a1800',
    gradientTo: '#150c00',
    icon: '🌟',
    image: '/fortune-report.jpg',
    whatIs: {
      heading: 'Your Complete Astrological Life Reading',
      description:
        "The Fortune Report is Aditya Narayan Panigrahi's most comprehensive offering — a full Kundli analysis covering all 12 houses, key planetary yogas, Dasha periods, and life predictions across every major domain: career, wealth, love, health, family, and spiritual growth.",
      bullets: [
        'Complete analysis of all 12 houses and their influence on your life.',
        'Identifies your most powerful yogas and life blessings.',
        'Covers career, wealth, love, health, and family in one comprehensive report.',
        'Reveals your peak periods and how to make the most of them.',
      ],
    },
    whatsInside: [
      { icon: 'LayoutGrid', title: 'Complete 12-House Analysis', description: 'Every area of your life examined — personality, wealth, siblings, home, children, health, relationships, transformation, luck, career, gains, and spirituality.' },
      { icon: 'Sparkles', title: 'Key Yoga & Blessing Identification', description: 'Discovery of Raj Yogas, Dhana Yogas, and other powerful combinations that define your life blessings and peak potential.' },
      { icon: 'CalendarDays', title: 'Dasha & Life Period Roadmap', description: 'A timeline of your major life periods showing when opportunities peak and when caution is advised.' },
      { icon: 'Globe2', title: 'Multi-Domain Life Predictions', description: 'Personalized predictions for career milestones, financial growth, relationship developments, and health phases.' },
      { icon: 'HandHeart', title: 'Comprehensive Remedies & Life Guidance', description: 'A full set of Vedic remedies, gemstone recommendations, and spiritual practices tailored to your chart.' },
      { icon: 'Infinity', title: 'Karmic Patterns & Past Life Influences', description: 'Insights into karmic debts, soul lessons, and past-life influences shaping your current life circumstances and relationships.' },
      { icon: 'Compass', title: 'Life Purpose & Soul Direction', description: 'Astrological revelation of your dharmic path, innate gifts, and the unique contribution you are meant to make in this lifetime.' },
      { icon: 'BarChart', title: 'Decade-by-Decade Life Arc', description: 'A sweeping overview of how your life unfolds across major decades, highlighting transformative turning points and periods of peak fortune.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Provide your date, time, and place of birth for a complete chart analysis.' },
      { title: 'Full Kundli Analysis', description: 'All 12 houses, yogas, and Dasha periods are thoroughly analyzed by Aditya Narayan Panigrahi.' },
      { title: 'Receive Your Fortune Report', description: 'Get your comprehensive life reading report within 5–7 business days.' },
    ],
    forWhom: [
      { title: 'You Are Seeking Complete Life Clarity', description: 'Want to understand your overall destiny, life purpose, and what lies ahead? This report covers it all.' },
      { title: 'You Are at a Major Life Crossroads', description: 'Facing big decisions about career, marriage, relocation, or business? Get a complete astrological perspective.' },
      { title: 'You Are a Spiritual Seeker', description: 'Understand your karmic path, past-life influences, and spiritual evolution through your birth chart.' },
      { title: 'You Want the Full Astrological Picture', description: 'Don\'t settle for partial insights — get a complete Vedic reading of your entire life map.' },
      { title: 'You Feel Like Something Is Missing but Cannot Identify What', description: 'When life seems incomplete despite external success, your Fortune Report reveals the deeper purpose and direction your soul is calling you toward.' },
      { title: 'You Want to Know Your Peak Periods and Plan Accordingly', description: 'Identify the most powerful years and Dasha windows in your chart so you can take bold action exactly when the cosmos is working in your favor.' },
    ],
    pricingPlans: [
      {
        name: 'Fortune Report',
        tagline: 'Complete Life Reading Across All Domains',
        originalPrice: '₹5,000',
        discountedPrice: '₹349',
        features: [
          { label: 'Complete 12-House Analysis', included: true },
          { label: 'Key Yoga & Blessing Identification', included: true },
          { label: 'Dasha & Life Period Roadmap', included: true },
          { label: 'Multi-Domain Life Predictions', included: true },
          { label: 'Comprehensive Remedies', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Fortune Report + 1-on-1 Consultation',
        tagline: 'Complete Life Reading with Expert Walkthrough',
        originalPrice: '₹10,000',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Complete 12-House Analysis', included: true },
          { label: 'Key Yoga & Blessing Identification', included: true },
          { label: 'Dasha & Life Period Roadmap', included: true },
          { label: 'Multi-Domain Life Predictions', included: true },
          { label: 'Comprehensive Remedies', included: true },
          { label: 'Priority Customer Support', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'How is the Fortune Report different from other reports?', answer: 'The Fortune Report covers all 12 houses and all major life areas in one complete reading — it is the most comprehensive report we offer, while individual reports focus on one specific domain.' },
      { question: 'How long is the report?', answer: 'The Fortune Report is typically 40–60 pages, covering your complete Kundli analysis in detail.' },
      { question: 'How long will it take?', answer: 'Given its comprehensive nature, the Fortune Report is delivered within 5–7 business days.' },
      { question: 'Is this available in Hindi?', answer: 'Yes, available in both Hindi and English. Specify your preference at checkout.' },
    ],
    testimonials: [
      { name: 'Deepak N.', text: 'This report was a revelation. It covered my entire life — career shifts I had already experienced, a wealth period coming up, and health areas to watch. Incredibly detailed and accurate.' },
      { name: 'Priyanka S.', text: 'I got the Fortune Report before making a major life decision and it gave me complete clarity. The Yoga analysis was particularly eye-opening. Worth every rupee.' },
      { name: 'Arvind K.', text: 'The 12-house analysis was thorough and precise. The remedies are practical and I have already started seeing positive shifts in multiple areas of my life.' },
    ],
  },

  {
    slug: 'shani-sadesati-report',
    title: 'Shani Sadesati Report',
    subtitle: 'Saturn\'s 7.5-Year Cycle Decoded',
    tagline: 'Navigate the Most Challenging Astrological Phase with Clarity & Confidence',
    heroDescription:
      'Shani Sadesati is one of the most significant and misunderstood phases in Vedic astrology. Know exactly where you stand, what to expect, and how to emerge stronger.',
    accentColor: '#7f8c8d',
    gradientFrom: '#1a1a2a',
    gradientTo: '#0d0d15',
    icon: '🪐',
    image: '/shani-sadesati-report.jpg',
    whatIs: {
      heading: 'Your Complete Shani Sadesati Analysis & Guidance',
      description:
        "The Shani Sadesati Report provides a complete analysis of Saturn's 7.5-year transit through your moon sign and the adjacent signs. It tells you exactly which phase of Sadesati you are in, what challenges and changes to expect, and the most powerful remedies to navigate this period successfully.",
      bullets: [
        'Identifies your current Sadesati phase — rising, peak, or setting.',
        'Explains how Saturn\'s transit specifically affects your moon sign and chart.',
        'Reveals which life areas will be most impacted during your Sadesati.',
        'Provides powerful Saturn remedies to minimize challenges and maximize growth.',
      ],
    },
    whatsInside: [
      { icon: 'MapPin', title: 'Sadesati Phase Identification', description: 'Precise analysis of whether you are in the rising, peak, or setting phase of Shani Sadesati and what each means.' },
      { icon: 'Orbit', title: 'Saturn Transit Impact Analysis', description: 'How Saturn\'s current position affects your Moon sign, Ascendant, and key houses in your birth chart.' },
      { icon: 'Eye', title: 'Domain-Wise Impact Forecast', description: 'Specific predictions on how Sadesati will affect your career, finances, relationships, health, and mental state.' },
      { icon: 'Zap', title: 'Dhaiya & Kantaka Shani Check', description: 'Analysis of whether you are also experiencing Dhaiya (2.5-year Saturn transit) or Kantaka Shani simultaneously.' },
      { icon: 'Shield', title: 'Saturn Remedies & Protection Practices', description: 'Powerful Saturn-specific remedies: Shani mantras, Saturdays fasts, blue sapphire guidance, charitable acts, and Hanuman worship.' },
      { icon: 'RefreshCw', title: 'Past & Future Sadesati Comparison', description: 'Review of how previous Sadesati cycles affected your life and what patterns to expect in the current and upcoming cycles.' },
      { icon: 'Brain', title: 'Mental Resilience & Mindset Guidance', description: 'Astrological insights on managing the psychological pressure of Sadesati and maintaining clarity and stability through the transit.' },
      { icon: 'Sunrise', title: 'Post-Sadesati Transformation Forecast', description: 'What Saturn leaves behind after the transit ends — the growth, wisdom, and new chapters that open once Sadesati concludes.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Provide your date, time, and place of birth for precise Saturn transit analysis.' },
      { title: 'Saturn Transit Analysis', description: 'Expert analysis of Saturn\'s current position relative to your Moon sign and complete chart.' },
      { title: 'Receive Your Sadesati Report', description: 'Get your complete Sadesati analysis with phase details, impact forecast, and remedies within 3–5 days.' },
    ],
    forWhom: [
      { title: 'You Are Currently in Sadesati', description: 'Experiencing unexpected challenges, delays, or mental stress? You may be in Sadesati. Get clarity and guidance.' },
      { title: 'You Are Approaching Sadesati', description: 'Prepare in advance for Saturn\'s upcoming 7.5-year influence with a complete roadmap of what to expect.' },
      { title: 'You Have Unexplained Difficulties Across Multiple Areas', description: 'Facing persistent problems across multiple areas of life? Saturn\'s transit may be the astrological reason.' },
      { title: 'You Want to Earn Saturn\'s Blessings', description: 'Understand how to work with Saturn\'s energy rather than against it and emerge transformed and stronger.' },
      { title: 'You Want to Know How Long This Difficult Phase Will Last', description: 'Get precise timing on when your Sadesati phase ends so you can plan ahead with confidence and see the light at the end of the tunnel.' },
      { title: 'You Have Been Through Sadesati Before and Want to Understand the Pattern', description: 'Compare past and current Sadesati cycles to recognize Saturn\'s recurring lessons and prepare more consciously for what lies ahead.' },
    ],
    pricingPlans: [
      {
        name: 'Shani Sadesati Report',
        tagline: 'Complete Sadesati Analysis with Remedies',
        originalPrice: '₹2,500',
        discountedPrice: '₹299',
        features: [
          { label: 'Sadesati Phase Identification', included: true },
          { label: 'Saturn Transit Impact Analysis', included: true },
          { label: 'Domain-Wise Impact Forecast', included: true },
          { label: 'Dhaiya & Kantaka Shani Check', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Shani Sadesati + Consultation',
        tagline: 'Navigate Saturn\'s Cycle with Expert Personal Guidance',
        originalPrice: '₹7,000',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Sadesati Phase Identification', included: true },
          { label: 'Saturn Transit Impact Analysis', included: true },
          { label: 'Domain-Wise Impact Forecast', included: true },
          { label: 'Dhaiya & Kantaka Shani Check', included: true },
          { label: 'Priority Customer Support', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Is Shani Sadesati always bad?', answer: 'Not at all. While Sadesati can bring challenges, it is also a period of deep learning, transformation, and spiritual growth. Proper remedies can significantly reduce difficulties.' },
      { question: 'How do I know if I am in Sadesati?', answer: 'Sadesati occurs when Saturn transits the sign before, the sign of, and the sign after your Moon sign. Our report will tell you exactly where you stand.' },
      { question: 'How long does Sadesati last?', answer: 'Shani Sadesati lasts 7.5 years in total — Saturn spends approximately 2.5 years in each of the three phases.' },
      { question: 'Are there different intensities of Sadesati?', answer: 'Yes. The middle phase (peak) when Saturn directly transits your Moon sign is typically the most intense. The rising and setting phases are comparatively milder.' },
      { question: 'When will I receive the report?', answer: 'Within 3–5 business days after order confirmation.' },
    ],
    testimonials: [
      { name: 'Neha S.', text: 'I had no idea I was in the peak of Sadesati. The report explained why the last two years had been so difficult. The Saturn remedies brought noticeable relief within weeks.' },
      { name: 'Rakesh T.', text: 'The domain-wise impact analysis was eye-opening. It correctly identified the career challenges I was facing and the relationship strain. Now I know exactly what to expect and how to handle it.' },
      { name: 'Meera J.', text: 'I was terrified of Sadesati after hearing stories. This report gave me a balanced, practical view. The remedies are simple and I feel much more in control of the period ahead.' },
    ],
  },

  {
    slug: 'varshaphal-report',
    title: 'Varshaphal Report',
    subtitle: 'Your Year Ahead, Decoded',
    tagline: 'A Complete Astrological Forecast for the Year Ahead — Month by Month',
    heroDescription:
      'Every year brings a unique cosmic blueprint. The Varshaphal Report gives you a precise month-by-month forecast of your year ahead so you can plan, prepare, and make the best decisions.',
    accentColor: '#1abc9c',
    gradientFrom: '#001a15',
    gradientTo: '#000d0a',
    icon: '📅',
    image: '/varshaphal-report.jpg',
    whatIs: {
      heading: 'Your Annual Horoscope & Year-Ahead Forecast',
      description:
        "Varshaphal, also known as Solar Return, is a specialized Vedic predictive technique that creates a fresh chart for every year of your life based on the Sun's return to its natal position. The Varshaphal Report analyzes this annual chart in detail to give you a precise forecast of the year ahead.",
      bullets: [
        'Month-by-month predictions for the entire year ahead.',
        'Identifies your most favorable months for career, finance, and love.',
        'Reveals challenging months to navigate with extra care.',
        'Provides yearly remedies and auspicious timing for major decisions.',
      ],
    },
    whatsInside: [
      { icon: 'CalendarRange', title: 'Month-by-Month Predictions', description: 'A detailed forecast for each month of the coming year covering career, finance, relationships, and health.' },
      { icon: 'Star', title: 'Annual Lagna & Muntha Analysis', description: 'Complete analysis of your Solar Return chart including annual Ascendant, Muntha house, and key planetary positions.' },
      { icon: 'TrendingUp', title: 'Opportunity & Challenge Windows', description: 'Identification of your peak opportunity months and periods requiring extra caution across all life domains.' },
      { icon: 'Orbit', title: 'Annual Dasha & Transit Overlay', description: 'How your annual chart interacts with your ongoing Dasha and major planetary transits for a complete picture.' },
      { icon: 'Key', title: 'Annual Remedies & Auspicious Timing', description: 'Yearly remedies, muhurta guidance for major decisions, and practices to maximize your year\'s potential.' },
      { icon: 'Flag', title: 'Year\'s Peak & Low Points Mapped', description: 'Visual mapping of your highest and lowest energy months so you can strategically plan actions and rest periods.' },
      { icon: 'Layers', title: 'Multi-Area Annual Forecast', description: 'Dedicated sections covering career, wealth, love, family, health, and travel forecasts for the full year ahead.' },
      { icon: 'RotateCcw', title: 'Year-End Review Guidance', description: 'Guidance on what karmic lessons this Solar Return year is designed to teach you and how to close it on a high note.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Provide your date, time, and place of birth for Solar Return chart calculation.' },
      { title: 'Annual Chart Analysis', description: 'Your Varshaphal chart, Muntha, and annual planetary patterns are thoroughly analyzed.' },
      { title: 'Receive Your Year-Ahead Report', description: 'Get your complete month-by-month forecast report within 3–5 business days.' },
    ],
    forWhom: [
      { title: 'You Are Planning Major Life Decisions This Year', description: 'Marriage, job change, investment, travel — know the most auspicious timing for your important moves this year.' },
      { title: 'You Are a Businessperson or Professional', description: 'Plan your launches, negotiations, and expansions aligned with your most favorable months.' },
      { title: 'You Want to Stay One Step Ahead', description: 'Know what\'s coming before it arrives and navigate the year with confidence and preparation.' },
      { title: 'You Are a Regular Astrology User', description: 'Make Varshaphal your annual ritual — a yearly check-in with the cosmos to plan your most effective year.' },
      { title: 'You Want to Know Your Best and Worst Months in Advance', description: 'Understand exactly when to push forward boldly and when to slow down, so every month of your year is lived with purpose and clarity.' },
      { title: 'You Just Had Your Birthday and Want to Know What This Year Holds', description: 'The Solar Return is calculated fresh each birthday — the perfect time to get your Varshaphal and set intentional goals aligned with your annual chart.' },
    ],
    pricingPlans: [
      {
        name: 'Varshaphal Report',
        tagline: 'Complete Month-by-Month Year-Ahead Forecast',
        originalPrice: '₹2,000',
        discountedPrice: '₹299',
        features: [
          { label: 'Personalized Varshaphal Report', included: true },
          { label: 'Month-by-Month Predictions', included: true },
          { label: 'Opportunity & Challenge Windows', included: true },
          { label: 'Annual Remedies & Timing', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Varshaphal + Consultation',
        tagline: 'Year-Ahead Forecast with Expert Planning Session',
        originalPrice: '₹6,000',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Personalized Varshaphal Report', included: true },
          { label: 'Month-by-Month Predictions', included: true },
          { label: 'Opportunity & Challenge Windows', included: true },
          { label: 'Annual Remedies & Timing', included: true },
          { label: 'Priority Customer Support', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'What is Varshaphal?', answer: 'Varshaphal (Solar Return) is a Vedic predictive technique that creates a new chart every year when the Sun returns to its exact natal position, providing a precise forecast for that year.' },
      { question: 'When should I get the Varshaphal Report?', answer: 'Ideally get your Varshaphal Report around your birthday, as the Solar Return chart is calculated from your birthday each year.' },
      { question: 'How is this different from a regular horoscope?', answer: 'A regular annual horoscope is based on your Sun sign. Varshaphal is based on your complete birth chart and the Solar Return chart — far more precise and personalized.' },
      { question: 'When will I receive my report?', answer: 'Within 3–5 business days after order confirmation and submission of your birth details.' },
    ],
    testimonials: [
      { name: 'Kiran M.', text: 'The month-by-month forecast was remarkably accurate. The report correctly predicted a career opportunity in March and a health challenge in August. It helped me prepare for both.' },
      { name: 'Sunita A.', text: 'I get the Varshaphal Report every year before my birthday. It has become my annual planning tool. The timing guidance alone has saved me from several bad decisions.' },
      { name: 'Rajiv B.', text: 'The auspicious timing guidance helped me finalize my business partnership during the exact favorable window. The year has been my best professionally.' },
    ],
  },

  {
    slug: 'premium-kundali',
    title: 'Premium Personalized Kundali',
    subtitle: 'The Most Detailed Kundli You Will Ever Own',
    tagline: 'A Handcrafted, Expert-Analyzed Kundli That Covers Every Aspect of Your Life',
    heroDescription:
      'Your Kundli is your life\'s cosmic blueprint. The Premium Personalized Kundali is the most detailed, handcrafted astrological document created exclusively for you by Aditya Narayan Panigrahi.',
    accentColor: '#c8791a',
    gradientFrom: '#2a1500',
    gradientTo: '#150a00',
    icon: '📜',
    image: '/premium kundali report.jpg',
    whatIs: {
      heading: 'The Ultimate Personalized Kundali Experience',
      description:
        "The Premium Personalized Kundali is not a computer-generated report. It is a fully handcrafted, expert-analyzed Kundli document prepared by Aditya Narayan Panigrahi — covering your complete birth chart, all planetary yogas, life predictions, and comprehensive remedies in a beautifully formatted, printable document.",
      bullets: [
        'Completely handcrafted by Aditya Narayan Panigrahi — not auto-generated.',
        'Covers all 12 houses, all planets, all major yogas, and Dasha periods.',
        'Includes detailed predictions for every major life domain.',
        'Delivered as a premium PDF with beautiful formatting — print-ready.',
      ],
    },
    whatsInside: [
      { icon: 'BarChart2', title: 'Complete Birth Chart & Divisional Charts', description: 'Your Rashi chart, Navamsa (D9), Dashamsa (D10), and other key divisional charts analyzed in detail.' },
      { icon: 'Sparkles', title: 'All Yogas & Their Activation Periods', description: 'Every significant yoga in your chart identified — Raj Yoga, Dhana Yoga, Vipreet Raj Yoga, and more — with their activation Dasha periods.' },
      { icon: 'Map', title: 'Complete Dasha Predictions', description: 'Detailed predictions for all your past, current, and upcoming Dasha-Antardasha periods spanning decades.' },
      { icon: 'Globe', title: 'Life Predictions Across All Domains', description: 'Career, wealth, marriage, children, health, foreign travel, spiritual growth — every significant life area covered.' },
      { icon: 'Gem', title: 'Gemstone, Mantra & Remedy Guide', description: 'A complete personalized remedy plan including primary and secondary gemstones, mantras, yantras, and spiritual practices.' },
      { icon: 'FileText', title: 'Beautifully Formatted Print-Ready Document', description: 'Delivered as a premium, professionally designed PDF — suitable for printing, framing, and gifting on special occasions.' },
      { icon: 'Users', title: 'Family & Relationship Predictions', description: 'In-depth analysis of your chart\'s indications for marriage timing, children, family harmony, and key relationships.' },
      { icon: 'Compass', title: 'Spiritual Path & Dharma Guidance', description: 'Your chart\'s deeper spiritual indicators — dharma, purpose, past-life karma, and the spiritual practices most aligned with your soul.' },
    ],
    steps: [
      { title: 'Share Your Birth Details', description: 'Provide your complete and accurate birth date, time, and place of birth.' },
      { title: 'Expert Handcrafted Analysis', description: 'Aditya Narayan Panigrahi personally analyzes your complete chart — this takes dedicated time and expertise.' },
      { title: 'Receive Your Premium Kundali', description: 'Your beautifully formatted premium Kundali document is delivered within 7–10 business days.' },
    ],
    forWhom: [
      { title: 'You Want the Best Astrological Document', description: 'If you want the most thorough, expert-crafted astrological document possible — this is it.' },
      { title: 'You Are Gifting for Special Occasions', description: 'A premium Kundali makes a profound and meaningful gift for weddings, birthdays, and milestone celebrations.' },
      { title: 'You Are a Serious Astrology Enthusiast', description: 'For those who want to deeply understand their chart, their yogas, and their complete life blueprint.' },
      { title: 'You Are Facing Major Life Decisions', description: 'When facing the biggest decisions of your life, get the most comprehensive astrological guidance available.' },
      { title: 'You Seek Clarity About Your Life Purpose', description: 'If you feel lost, confused, or at a crossroads — your Kundali reveals the cosmic blueprint you were born with.' },
      { title: 'You Want to Understand Your Relationships Better', description: 'Discover how planetary placements influence your love life, family bonds, and compatibility with others.' },
    ],
    pricingPlans: [
      {
        name: 'Premium Personalized Kundali',
        tagline: 'The Most Complete Kundli Document — Handcrafted for You',
        originalPrice: '₹10,000',
        discountedPrice: '₹349',
        features: [
          { label: 'Complete Birth & Divisional Charts', included: true },
          { label: 'All Yogas & Activation Periods', included: true },
          { label: 'Complete Dasha Predictions', included: true },
          { label: 'All-Domain Life Predictions', included: true },
          { label: 'Gemstone & Remedy Guide', included: true },
          { label: 'Priority Customer Support', included: false },
          { label: '30-min 1-on-1 Consultation', included: false },
        ],
      },
      {
        name: 'Premium Kundali + Consultation',
        tagline: 'Complete Kundali with Personal Expert Walkthrough',
        originalPrice: '₹15,000',
        discountedPrice: '₹999',
        highlight: true,
        features: [
          { label: 'Complete Birth & Divisional Charts', included: true },
          { label: 'All Yogas & Activation Periods', included: true },
          { label: 'Complete Dasha Predictions', included: true },
          { label: 'All-Domain Life Predictions', included: true },
          { label: 'Gemstone & Remedy Guide', included: true },
          { label: 'Priority Customer Support', included: true },
          { label: '30-min 1-on-1 Consultation', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Is this really handcrafted?', answer: 'Yes. Unlike automated reports, the Premium Personalized Kundali is personally analyzed and written by Aditya Narayan Panigrahi for each client. This is why it takes 7–10 business days.' },
      { question: 'How many pages is the Kundali?', answer: 'The Premium Kundali is typically 80–120 pages, covering your complete chart analysis in extraordinary detail.' },
      { question: 'Can I print it?', answer: 'Yes. The Kundali is delivered as a beautifully formatted, print-ready PDF optimized for A4 printing.' },
      { question: 'Is birth time accuracy important?', answer: 'Yes — for the most accurate reading, please provide your exact birth time. Even a 1–2 hour difference can significantly affect the Ascendant and house placements.' },
      { question: 'When will I receive it?', answer: 'Within 7–10 business days given the handcrafted nature of this premium document.' },
    ],
    testimonials: [
      { name: 'Suresh M.', text: 'This is not just a report — it is a life document. The level of detail is extraordinary. Every yoga, every Dasha prediction, every remedy is explained with care. Worth every rupee.' },
      { name: 'Kavitha R.', text: 'I gifted this to my daughter for her wedding. It was the most thoughtful and meaningful gift. The family was overwhelmed by the depth and accuracy of the analysis.' },
      { name: 'Anil P.', text: 'I have consulted many astrologers but never seen a Kundali this detailed. The Navamsa and Dashamsa analysis alone revealed aspects of my life that I had never understood before.' },
    ],
  },
]

export function getReportBySlug(slug: string): ReportConfig | undefined {
  return reportsConfig.find((r) => r.slug === slug)
}