export const navLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Vedic Reports",
    path: "/reports",
    dropdown: [
      { label: "Premium Personalized Kundali", path: "/reports/premium-kundali" },
      { label: "Career Report", path: "/reports/career-report" },
      { label: "Finance Report", path: "/reports/finance-report" },
      { label: "Varshaphal Report", path: "/reports/varshaphal-report" },
      { label: "Lal Kitab Report", path: "/reports/lal-kitab-report" },
      { label: "Education Report", path: "/reports/education-report" },
      { label: "Health Report", path: "/reports/health-report" },
      { label: "Shani Sadesati Report", path: "/reports/shani-sadesati-report" },
      { label: "Fortune Report", path: "/reports/fortune-report" },
      { label: "Couple Matching Report", path: "/reports/couple-matching-report" },
    ],
  },
  {
    label: "Consultation",
    path: "/consultation",
    dropdown: [
      { label: "Personal Consultation", path: "/consultation/personal" },
      { label: "Couple Consultation", path: "/consultation/couple" },
      // { label: "Gemstone & Rudraksha Consultation", path: "/consultation/gemstone-rudraksha" },
      // { label: "Tarot Card Reading", path: "/consultation/tarot-card-reading" },
    ],
  },
  // {
  //   label: "Courses",
  //   path: "/courses",
  //   dropdown: [
  //     { label: "Vedic Astrology (Basic to Advanced)", path: "/courses/vedic-astrology-basic" },
  //     { label: "Vedic Astrology (Advanced)", path: "/courses/vedic-astrology-advanced" },
  //     { label: "Tarot Card Reading (Basic to Advanced)", path: "/courses/tarot-card-reading" },
  //     { label: "Intuition Activation Course", path: "/courses/intuition-activation" },
  //   ],
  // },
  {
    label: "About Us",
    path: "/about",
  },
  {
    label: "Contact Us",
    path: "/contact",
  },
]

export type NavDropdownItem = { label: string; path: string }
export type NavLink = {
  label: string
  path: string
  dropdown?: NavDropdownItem[]
}
