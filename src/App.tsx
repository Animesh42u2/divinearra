import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import ReportsPage from './components/ReportsPage'
import KundliSection from './components/KundliSection'
import KundliResultPage from './components/KundliResultPage'
import Calculators from './components/Calculators'
import OneCall from './components/OneCall'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ReportDetailPage from './components/ReportDetailPage'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <KundliSection />
      <Calculators />
      <OneCall />
      <Stats />
      <Testimonials />
      <Newsletter />
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
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/:slug" element={<ReportDetailPage />} />
        <Route path="/kundali" element={<KundliResultPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App