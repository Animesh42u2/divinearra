import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import SEO from './components/SEO'
import Hero from './components/Hero'
import Services from './components/Services'
import ReportsPage from './components/ReportsPage'
import KundliSection from './components/KundliSection'
import KundliResultPage from './components/KundliResultPage'
import Calculators, { CalculatorPage } from './components/Calculators'
import OneCall from './components/OneCall'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ReportDetailPage from './components/ReportDetailPage'
import ConsultationDetailPage from './components/Consultationdetailpage'
import CourseDetailPage from './components/CourseDetailPage'
import ConsultationsPage from './components/ConsultationsPage'
import CoursesPage from './components/Coursespage'
import CheckoutPage from './components/CheckoutPage'
import PaymentSuccess from './components/Paymentsuccess'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import PrivacyPolicy from './components/PrivacyPolicy'
import RefundPolicy from './components/Refundpolicy'
import TermsAndConditions from './components/Conditions'
import Disclaimer from './components/Disclaimer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <div style={{ paddingTop: 75 }}>
      <SEO
        title="Divine Arra | Vedic Astrology, Kundli & Horoscope Reports Online"
        description="Get accurate Vedic astrology reports, personalized Kundli analysis, horoscope matching, and expert astrology consultations online. Book your reading with Divine Arra today."
        url="/"
      />
      <Navbar />
      <Hero />
      <div id="services-section">
        <Services />
      </div>
      <div id="kundli-section">
        <KundliSection />
      </div>
      <div id="calculators-section">
        <Calculators />
      </div>
      <OneCall />
      <Stats />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: 75 }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/reports" element={<PageLayout><ReportsPage /></PageLayout>} />
        <Route path="/reports/:slug" element={<PageLayout><ReportDetailPage /></PageLayout>} />

        <Route path="/consultation" element={<PageLayout><ConsultationsPage /></PageLayout>} />
        <Route path="/consultation/:slug" element={<PageLayout><ConsultationDetailPage /></PageLayout>} />

        <Route path="/courses" element={<PageLayout><CoursesPage /></PageLayout>} />
        <Route path="/courses/:slug" element={<PageLayout><CourseDetailPage /></PageLayout>} />

        <Route path="/kundali" element={<PageLayout><KundliResultPage /></PageLayout>} />
        <Route path="/about" element={<PageLayout><AboutUs /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><ContactUs /></PageLayout>} />
        <Route path="/calculators/:type" element={<PageLayout><CalculatorPage /></PageLayout>} />

        {/* ── Footer "Other Links" pages ── */}
        <Route path="/privacy-policy" element={<PageLayout><PrivacyPolicy /></PageLayout>} />
        <Route path="/refund-policy" element={<PageLayout><RefundPolicy /></PageLayout>} />
        <Route path="/terms-and-conditions" element={<PageLayout><TermsAndConditions /></PageLayout>} />
        <Route path="/disclaimer" element={<PageLayout><Disclaimer /></PageLayout>} />

        {/* ── Unified checkout routes ── */}
        <Route path="/checkout/report/:slug"       element={<PageLayout><CheckoutPage type="report" /></PageLayout>} />
        <Route path="/checkout/consultation/:slug" element={<PageLayout><CheckoutPage type="consultation" /></PageLayout>} />
        <Route path="/checkout/course/:slug"       element={<PageLayout><CheckoutPage type="course" /></PageLayout>} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
