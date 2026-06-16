export interface CourseModule {
  title: string
  lessons: string[]
}

export interface CoursePlan {
  name: string
  tagline: string
  originalPrice: string
  discountedPrice: string
  features: { label: string; included: boolean }[]
  highlight?: boolean
}

export interface CourseConfig {
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
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  language: string
  students: string
  whatYouLearn: {
    heading: string
    description: string
    bullets: string[]
  }
  curriculum: CourseModule[]
  instructor: {
    name: string
    bio: string
    image: string
  }
  forWhom: { title: string; description: string }[]
  pricingPlans: CoursePlan[]
  faqs: { question: string; answer: string }[]
  testimonials: { name: string; text: string }[]
}

export const coursesConfig: CourseConfig[] = [
  {
    slug: 'vedic-astrology-basic',
    title: 'Vedic Astrology (Basic to Advanced)',
    subtitle: 'Master the Language of the Stars',
    tagline: 'Learn to Read Birth Charts, Understand Planets & Houses, and Apply Vedic Astrology in Daily Life',
    heroDescription:
      'A structured, beginner-friendly course that takes you from zero knowledge to confidently reading a Kundli. Taught live by Astro Aaditya Narayan across 8 focused sessions.',
    accentColor: '#c8791a',
    gradientFrom: '#2a1500',
    gradientTo: '#150a00',
    icon: '🪐',
    image: '/vedic.jpg',
    image2: '/vedic-astrology-basic.jpg',
    level: 'Beginner',
    duration: '8 Sessions · 16 Hours',
    language: 'Hindi / English',
    students: '1,200+',
    whatYouLearn: {
      heading: 'Build a Strong Vedic Astrology Foundation',
      description:
        'This course is designed to give you a thorough grounding in Vedic Jyotish — from the very basics of the zodiac and grahas to reading and interpreting a full birth chart with confidence.',
      bullets: [
        'Understand the 9 planets, 12 houses, and 27 Nakshatras in depth.',
        'Learn to calculate and read a Kundli step by step.',
        'Identify key yogas and their effects on a native\'s life.',
        'Apply Dasha systems to predict timing of major life events.',
        'Use remedies including gemstones, mantras, and rituals effectively.',
      ],
    },
    curriculum: [
      {
        title: 'Module 1 — Foundations of Jyotish',
        lessons: ['History & origins of Vedic astrology', 'The zodiac, rashis & their qualities', 'Introduction to the 9 grahas'],
      },
      {
        title: 'Module 2 — The 12 Houses',
        lessons: ['What each house governs', 'House lords and their significance', 'Reading house strength in a chart'],
      },
      {
        title: 'Module 3 — Nakshatras',
        lessons: ['All 27 Nakshatras and their meanings', 'Nakshatra lords and pada system', 'Practical Nakshatra analysis'],
      },
      {
        title: 'Module 4 — Chart Reading',
        lessons: ['Step-by-step Kundli construction', 'Reading planetary positions', 'Identifying key yogas'],
      },
      {
        title: 'Module 5 — Dasha Systems',
        lessons: ['Vimshottari Dasha explained', 'Antardasha & Pratyantardasha', 'Timing events with Dasha'],
      },
      {
        title: 'Module 6 — Remedies',
        lessons: ['Gemstone selection by chart', 'Mantra & yantra remedies', 'Practical remedy planning'],
      },
    ],
    instructor: {
      name: 'Astro Aaditya Narayan',
      bio: 'Founder of Divine Arra, Astro Aaditya Narayan has analyzed over 2 lakh charts across 7+ years of practice. He teaches Vedic astrology in a clear, structured style — making complex concepts approachable for students at every level.',
      image: '/Aditya.png',
    },
    forWhom: [
      { title: 'Complete Beginners', description: 'No prior knowledge needed. The course starts from the absolute basics and builds up systematically.' },
      { title: 'Curious Learners', description: 'If you\'ve always been curious about how Vedic astrology works and want to understand your own chart, this is for you.' },
      { title: 'Spiritual Seekers', description: 'Those who want to deepen their understanding of karma, dharma, and life purpose through the lens of Jyotish.' },
      { title: 'Aspiring Practitioners', description: 'Want to eventually read charts for others? This foundational course is the essential starting point.' },
    ],
    pricingPlans: [
      {
        name: 'Self-Paced Access',
        tagline: 'Learn at Your Own Speed with Recorded Sessions',
        originalPrice: '₹4,999',
        discountedPrice: '₹1,999',
        features: [
          { label: 'All 6 Course Modules', included: true },
          { label: 'Recorded Video Sessions', included: true },
          { label: 'Downloadable Study Notes', included: true },
          { label: 'Live Q&A Sessions', included: false },
          { label: 'Direct Mentor Access', included: false },
          { label: 'Course Certificate', included: false },
          { label: 'Lifetime Access', included: false },
          { label: 'Practice Chart Reviews', included: false },
        ],
      },
      {
        name: 'Live + Mentored',
        tagline: 'Join Live Sessions with Direct Mentor Access',
        originalPrice: '₹12,999',
        discountedPrice: '₹5,499',
        highlight: true,
        features: [
          { label: 'All 6 Course Modules', included: true },
          { label: 'Recorded Video Sessions', included: true },
          { label: 'Downloadable Study Notes', included: true },
          { label: 'Live Q&A Sessions', included: true },
          { label: 'Direct Mentor Access', included: true },
          { label: 'Course Certificate', included: true },
          { label: 'Lifetime Access', included: true },
          { label: 'Practice Chart Reviews', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Do I need any prior knowledge of astrology?', answer: 'No prior knowledge is needed. The course begins from the very basics and builds progressively.' },
      { question: 'Are the sessions recorded?', answer: 'Yes, all live sessions are recorded and available for replay within 24 hours. Self-paced students get immediate access to recordings.' },
      { question: 'What language are the sessions taught in?', answer: 'Sessions are primarily in Hindi with key concepts explained in English as well. Study notes are bilingual.' },
      { question: 'How long do I have access to the course materials?', answer: 'Self-paced plan includes 6-month access. The Live + Mentored plan includes lifetime access to all recordings and notes.' },
      { question: 'Will I receive a certificate?', answer: 'Yes, a course completion certificate is provided with the Live + Mentored plan upon completing all modules.' },
    ],
    testimonials: [
      { name: 'Priya M.', text: 'I started this course knowing absolutely nothing about astrology. By Module 3, I was actually reading my own chart. The teaching style is incredibly clear.' },
      { name: 'Rajesh K.', text: 'The Nakshatra module alone was worth the entire course fee. Concepts I\'d struggled to understand for years finally clicked in one session.' },
      { name: 'Anita S.', text: 'The live Q&A sessions made all the difference — being able to ask questions and get them answered in real time accelerated my learning tremendously.' },
    ],
  },

  {
    slug: 'vedic-astrology-advanced',
    title: 'Vedic Astrology (Advanced)',
    subtitle: 'From Chart to Prediction',
    tagline: 'A Deep-Dive Advanced Course on Reading, Interpreting & Predicting from Birth Charts',
    heroDescription:
      'Move beyond the basics. This advanced-level course teaches you to extract precise insights and predictions from any Kundli — covering advanced yogas, divisional charts, and predictive techniques.',
    accentColor: '#7c5cbf',
    gradientFrom: '#1a0a3d',
    gradientTo: '#0d0520',
    icon: '📜',
    image: '/advanced.png',
    image2: '/vedic-astrology-advanced.webp',
    level: 'Advanced',
    duration: '10 Sessions · 20 Hours',
    language: 'Hindi / English',
    students: '850+',
    whatYouLearn: {
      heading: 'Read Charts at an Advanced Level',
      description:
        'This course is designed for students who already understand the Kundli basics and are ready to read charts with greater accuracy, extract nuanced predictions, and explore advanced Vedic techniques.',
      bullets: [
        'Master divisional charts (Navamsa, Dashamsa, Saptamsa and more).',
        'Identify and interpret advanced Raja, Dhana, and Dosha yogas.',
        'Apply Ashtakavarga for precise strength analysis.',
        'Use transit (Gochar) analysis for timing predictions.',
        'Build complete life-area predictions from a single chart.',
      ],
    },
    curriculum: [
      {
        title: 'Module 1 — Advanced Planetary Analysis',
        lessons: ['Graha war, combustion & retrogression', 'Dig bala & sthana bala', 'Advanced aspect theory'],
      },
      {
        title: 'Module 2 — Divisional Charts (Vargas)',
        lessons: ['D1 to D60 overview', 'Navamsa (D9) in depth', 'Dashamsa (D10) for career', 'Saptamsa (D7) for children'],
      },
      {
        title: 'Module 3 — Advanced Yogas',
        lessons: ['Raja & Dharma-Karma yogas', 'Dhana & Daridra yogas', 'Viparita Raja yoga'],
      },
      {
        title: 'Module 4 — Ashtakavarga System',
        lessons: ['Constructing the Ashtakavarga', 'Bhinna & Sarva Ashtakavarga', 'Using it for timing & transit'],
      },
      {
        title: 'Module 5 — Predictive Techniques',
        lessons: ['Gochar (transits) analysis', 'Combining Dasha + transit', 'Case studies: life events prediction'],
      },
      {
        title: 'Module 6 — Consultation Framework',
        lessons: ['How to structure a reading', 'Delivering insights clearly', 'Ethics in astrology practice'],
      },
    ],
    instructor: {
      name: 'Astro Aaditya Narayan',
      bio: 'With a specialization in predictive Jyotish and divisional chart analysis, Astro Aaditya Narayan brings real consultation experience into the classroom — teaching techniques actively used in his 100K+ consultations.',
      image: '/Aditya.png',
    },
    forWhom: [
      { title: 'Students with Basic Knowledge', description: 'You understand planets, houses, and basic chart structure but want to go much deeper into interpretation and prediction.' },
      { title: 'Practicing Astrologers', description: 'Already doing readings but want to sharpen your accuracy with divisional charts and advanced predictive tools.' },
      { title: 'Serious Self-Learners', description: 'You\'ve studied from books or videos but want structured guidance from an experienced practitioner to level up your skills.' },
      { title: 'Those Who Want to Consult Professionally', description: 'This course gives you the tools and framework to conduct confident, accurate, structured readings for others.' },
    ],
    pricingPlans: [
      {
        name: 'Self-Paced Access',
        tagline: 'All Modules, Recorded — Learn at Your Pace',
        originalPrice: '₹6,999',
        discountedPrice: '₹2,999',
        features: [
          { label: 'All 6 Course Modules', included: true },
          { label: 'Recorded Video Sessions', included: true },
          { label: 'Downloadable Study Notes', included: true },
          { label: 'Practice Chart Exercises', included: true },
          { label: 'Live Q&A Sessions', included: false },
          { label: 'Chart Review by Mentor', included: false },
          { label: 'Course Certificate', included: false },
          { label: 'Lifetime Access', included: false },
        ],
      },
      {
        name: 'Live Masterclass',
        tagline: 'Live Sessions + Chart Reviews + Certificate',
        originalPrice: '₹18,999',
        discountedPrice: '₹7,999',
        highlight: true,
        features: [
          { label: 'All 6 Course Modules', included: true },
          { label: 'Recorded Video Sessions', included: true },
          { label: 'Downloadable Study Notes', included: true },
          { label: 'Practice Chart Exercises', included: true },
          { label: 'Live Q&A Sessions', included: true },
          { label: 'Chart Review by Mentor', included: true },
          { label: 'Course Certificate', included: true },
          { label: 'Lifetime Access', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'What prior knowledge is required?', answer: 'You should be comfortable with the 9 planets, 12 houses, and basic Kundli structure before joining this course.' },
      { question: 'How are chart review sessions structured?', answer: 'In the Live Masterclass plan, you submit practice charts and receive detailed feedback from Astro Aaditya Narayan within 5 business days.' },
      { question: 'Can I upgrade from Self-Paced to Live Masterclass later?', answer: 'Yes, you can upgrade at any time by paying the difference. Contact support with your enrollment details.' },
      { question: 'How long are each of the 10 sessions?', answer: 'Each live session runs approximately 2 hours, including a 20-minute Q&A segment at the end.' },
      { question: 'Is this course suitable for professional astrologers?', answer: 'Yes, many working astrologers have taken this course to deepen their predictive accuracy — particularly the divisional charts and Ashtakavarga modules.' },
    ],
    testimonials: [
      { name: 'Vikram P.', text: 'The Navamsa module changed the way I read every chart. I\'ve been practicing astrology for 3 years and this course added a completely new dimension to my readings.' },
      { name: 'Deepa N.', text: 'The case study sessions were the highlight. Watching Aaditya ji work through real charts live — explaining his exact thought process — was incredibly valuable.' },
      { name: 'Suresh B.', text: 'The Ashtakavarga system felt intimidating from books. The way it was broken down here made it click immediately. Now I use it in every reading.' },
    ],
  },

  {
    slug: 'tarot-card-reading',
    title: 'Tarot Card Reading (Basic to Advanced)',
    subtitle: 'Unlock the Wisdom of the Cards',
    tagline: 'Learn to Read Tarot Cards Confidently — From Major & Minor Arcana to Professional Spreads',
    heroDescription:
      'A complete, hands-on tarot course that takes you from never having touched a deck to confidently reading full spreads for yourself and others. Taught live by Astro Aaditya Narayan across 8 immersive sessions.',
    accentColor: '#b0489a',
    gradientFrom: '#330a28',
    gradientTo: '#1a0414',
    icon: '🔮',
    image: '/tarot-card-reading.jpg',
    image2: '/tarot-card-reading2.jpg',
    level: 'Beginner',
    duration: '8 Sessions · 16 Hours',
    language: 'Hindi / English',
    students: '980+',
    whatYouLearn: {
      heading: 'Read Tarot with Clarity and Confidence',
      description:
        'This course takes you step by step through the entire 78-card deck, teaching you not just card meanings but how to weave them into intuitive, accurate, and meaningful readings.',
      bullets: [
        'Understand the structure of the tarot deck — Major & Minor Arcana, suits and court cards.',
        'Learn the meaning of all 78 cards in both upright and reversed positions.',
        'Master popular spreads including the Celtic Cross and 3-card spreads.',
        'Combine intuition with card symbolism for deeper, more accurate readings.',
        'Build the confidence and ethics framework to read for friends, family, or clients.',
      ],
    },
    curriculum: [
      {
        title: 'Module 1 — Introduction to Tarot',
        lessons: ['History & origins of the tarot deck', 'Structure of the 78 cards', 'Choosing & caring for your deck'],
      },
      {
        title: 'Module 2 — The Major Arcana',
        lessons: ['The Fool\'s Journey explained', 'Card-by-card meanings (1–22)', 'Major Arcana in real readings'],
      },
      {
        title: 'Module 3 — The Minor Arcana & Suits',
        lessons: ['Wands, Cups, Swords & Pentacles', 'Numerology of the Minor Arcana', 'Court cards and their personalities'],
      },
      {
        title: 'Module 4 — Reversed Cards & Combinations',
        lessons: ['Interpreting reversed meanings', 'Reading card combinations', 'Spotting patterns across a spread'],
      },
      {
        title: 'Module 5 — Tarot Spreads',
        lessons: ['3-card spreads for daily guidance', 'Relationship & career spreads', 'The Celtic Cross in depth'],
      },
      {
        title: 'Module 6 — Professional Practice',
        lessons: ['Structuring a client reading', 'Ethics & boundaries in tarot', 'Building intuition through practice'],
      },
    ],
    instructor: {
      name: 'Astro Aaditya Narayan',
      bio: 'Alongside Vedic astrology, Astro Aaditya Narayan has practiced tarot reading for over 7 years, blending symbolic interpretation with intuitive insight. He teaches tarot as a practical, learnable skill — not a mystery — making it accessible to complete beginners.',
      image: '/Aditya.png',
    },
    forWhom: [
      { title: 'Complete Beginners', description: 'Never held a tarot deck before? This course starts from the absolute basics and builds your skills card by card.' },
      { title: 'Curious Learners', description: 'If you\'ve always wanted to understand how tarot readings work and try reading for yourself, this is for you.' },
      { title: 'Spiritual Seekers', description: 'Those who want to use tarot as a tool for self-reflection, clarity, and personal growth.' },
      { title: 'Aspiring Tarot Readers', description: 'Want to eventually read for others? This course gives you the foundation and framework to do so confidently.' },
    ],
    pricingPlans: [
      {
        name: 'Self-Paced Access',
        tagline: 'Learn at Your Own Speed with Recorded Sessions',
        originalPrice: '₹3,999',
        discountedPrice: '₹1,499',
        features: [
          { label: 'All 6 Course Modules', included: true },
          { label: 'Recorded Video Sessions', included: true },
          { label: 'Downloadable Card Guide', included: true },
          { label: 'Practice Spread Exercises', included: true },
          { label: 'Live Q&A Sessions', included: false },
          { label: 'Direct Mentor Access', included: false },
          { label: 'Course Certificate', included: false },
          { label: 'Lifetime Access', included: false },
        ],
      },
      {
        name: 'Live + Mentored',
        tagline: 'Join Live Sessions with Direct Mentor Access',
        originalPrice: '₹9,999',
        discountedPrice: '₹4,499',
        highlight: true,
        features: [
          { label: 'All 6 Course Modules', included: true },
          { label: 'Recorded Video Sessions', included: true },
          { label: 'Downloadable Card Guide', included: true },
          { label: 'Practice Spread Exercises', included: true },
          { label: 'Live Q&A Sessions', included: true },
          { label: 'Direct Mentor Access', included: true },
          { label: 'Course Certificate', included: true },
          { label: 'Lifetime Access', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Do I need to own a tarot deck before starting?', answer: 'No, you can begin with just the printable card guide. Module 1 also covers how to choose a deck that resonates with you.' },
      { question: 'Do I need any prior knowledge of tarot or astrology?', answer: 'No prior knowledge is needed. The course begins from the very basics and builds progressively through all 78 cards.' },
      { question: 'Are the sessions recorded?', answer: 'Yes, all live sessions are recorded and available for replay within 24 hours. Self-paced students get immediate access to recordings.' },
      { question: 'Will I be able to read for other people after this course?', answer: 'Yes — by Module 6 you\'ll have a structured framework, spreads, and ethics guidelines for reading confidently for others.' },
      { question: 'Will I receive a certificate?', answer: 'Yes, a course completion certificate is provided with the Live + Mentored plan upon completing all modules.' },
    ],
    testimonials: [
      { name: 'Kavya R.', text: 'I always thought tarot was too "mystical" to learn properly, but this course broke it down so logically. By Module 4 I was reading 3-card spreads for my friends.' },
      { name: 'Nikhil D.', text: 'The Major Arcana module was a revelation — understanding the Fool\'s Journey gave every other card so much more context.' },
      { name: 'Shreya P.', text: 'The live practice sessions on the Celtic Cross were incredibly helpful. Watching a full reading unfold step by step made it click instantly.' },
    ],
  },

  {
    slug: 'intuition-activation',
    title: 'Intuition Activation Course',
    subtitle: 'Awaken Your Inner Guidance System',
    tagline: 'Develop Your Natural Intuition Through Meditation, Energy Work & Daily Practice',
    heroDescription:
      'A practical, experiential course designed to help you recognize, trust, and strengthen your intuition. Through guided meditations, energy exercises, and daily practices, you\'ll reconnect with your inner guidance system across 6 transformative sessions.',
    accentColor: '#2e9e8f',
    gradientFrom: '#0a2e2a',
    gradientTo: '#041614',
    icon: '✨',
    image: '/intuition-activation.webp',
    image2: '/intuition-activation.jpg',
    level: 'Beginner',
    duration: '6 Sessions · 12 Hours',
    language: 'Hindi / English',
    students: '720+',
    whatYouLearn: {
      heading: 'Reconnect with Your Inner Voice',
      description:
        'This course guides you through practical techniques to quiet mental noise, sharpen your awareness, and recognize the subtle signals your intuition is constantly sending you.',
      bullets: [
        'Understand what intuition is and how it actually communicates with you.',
        'Use meditation and breathwork to quiet the mind and access deeper awareness.',
        'Learn the basics of the chakra system and how blocked energy affects intuition.',
        'Develop your clairvoyant, clairaudient, and claircognizant senses.',
        'Build a sustainable daily practice to strengthen intuition over time.',
      ],
    },
    curriculum: [
      {
        title: 'Module 1 — Understanding Intuition',
        lessons: ['What intuition is (and isn\'t)', 'How intuition communicates: gut, mind & body signals', 'Common blocks to intuitive awareness'],
      },
      {
        title: 'Module 2 — Meditation & Energy Awareness',
        lessons: ['Foundational meditation techniques', 'Breathwork for mental clarity', 'Grounding & centering practices'],
      },
      {
        title: 'Module 3 — The Chakra System',
        lessons: ['Overview of the 7 chakras', 'Identifying blocked or imbalanced energy', 'Simple chakra-balancing exercises'],
      },
      {
        title: 'Module 4 — Developing Psychic Senses',
        lessons: ['Clairvoyance: intuitive seeing', 'Clairaudience: intuitive hearing', 'Claircognizance: intuitive knowing'],
      },
      {
        title: 'Module 5 — Intuitive Decision Making',
        lessons: ['Distinguishing intuition from fear', 'Using intuition in everyday choices', 'Journaling for intuitive insight'],
      },
      {
        title: 'Module 6 — Daily Practice & Integration',
        lessons: ['Building a sustainable daily ritual', 'Tools: journaling, meditation & energy check-ins', 'Long-term intuitive growth plan'],
      },
    ],
    instructor: {
      name: 'Astro Aaditya Narayan',
      bio: 'Astro Aaditya Narayan has guided thousands of students through meditation and energy-awareness practices alongside his astrology work. He brings a grounded, practical approach to intuition development — focused on simple daily habits rather than abstract theory.',
      image: '/Aditya.png',
    },
    forWhom: [
      { title: 'Complete Beginners', description: 'No experience with meditation or energy work needed. The course starts from the basics and builds gradually.' },
      { title: 'Spiritual Seekers', description: 'Those looking to deepen their self-awareness and connect more consciously with their inner guidance.' },
      { title: 'Overthinkers & Decision-Strugglers', description: 'If you often feel disconnected from your gut feelings, this course will help you reconnect and trust yourself.' },
      { title: 'Astrology & Tarot Students', description: 'A natural companion to our other courses — sharpened intuition enhances every reading you do.' },
    ],
    pricingPlans: [
      {
        name: 'Self-Paced Access',
        tagline: 'Learn at Your Own Speed with Recorded Sessions',
        originalPrice: '₹2,999',
        discountedPrice: '₹1,199',
        features: [
          { label: 'All 6 Course Modules', included: true },
          { label: 'Recorded Video Sessions', included: true },
          { label: 'Guided Meditation Audios', included: true },
          { label: 'Daily Practice Workbook', included: true },
          { label: 'Live Q&A Sessions', included: false },
          { label: 'Direct Mentor Access', included: false },
          { label: 'Course Certificate', included: false },
          { label: 'Lifetime Access', included: false },
        ],
      },
      {
        name: 'Live + Mentored',
        tagline: 'Join Live Sessions with Direct Mentor Access',
        originalPrice: '₹8,999',
        discountedPrice: '₹3,799',
        highlight: true,
        features: [
          { label: 'All 6 Course Modules', included: true },
          { label: 'Recorded Video Sessions', included: true },
          { label: 'Guided Meditation Audios', included: true },
          { label: 'Daily Practice Workbook', included: true },
          { label: 'Live Q&A Sessions', included: true },
          { label: 'Direct Mentor Access', included: true },
          { label: 'Course Certificate', included: true },
          { label: 'Lifetime Access', included: true },
        ],
      },
    ],
    faqs: [
      { question: 'Do I need any meditation experience before starting?', answer: 'No, the course begins with foundational meditation techniques suitable for complete beginners.' },
      { question: 'Is this course based on any particular belief system?', answer: 'The practices are presented in a practical, accessible way and can be incorporated regardless of your background or beliefs.' },
      { question: 'Are the sessions recorded?', answer: 'Yes, all live sessions are recorded and available for replay within 24 hours. Self-paced students get immediate access to recordings.' },
      { question: 'How much time do I need to dedicate daily?', answer: 'The daily practices are designed to take 10–15 minutes and can be built into your existing routine.' },
      { question: 'Will I receive a certificate?', answer: 'Yes, a course completion certificate is provided with the Live + Mentored plan upon completing all modules.' },
    ],
    testimonials: [
      { name: 'Ritu A.', text: 'I used to dismiss my gut feelings constantly. After this course, I actually pause and listen — and it\'s made a real difference in my decisions.' },
      { name: 'Manoj S.', text: 'The chakra module was explained so simply compared to everything else I\'d read online. The exercises were easy to follow and actually felt different.' },
      { name: 'Tanvi G.', text: 'The guided meditations alone were worth it. I\'ve struggled with meditation for years, and these finally helped me stay consistent.' },
    ],
  },
]

export function getCourseBySlug(slug: string): CourseConfig | undefined {
  return coursesConfig.find((c) => c.slug === slug)
}