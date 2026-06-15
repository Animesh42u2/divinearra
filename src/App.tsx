import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
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

// Wraps any page that needs the shared Navbar + Footer shell
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/reports" element={
          <PageLayout><ReportsPage /></PageLayout>
        } />
        <Route path="/reports/:slug" element={
          <PageLayout><ReportDetailPage /></PageLayout>
        } />
        <Route path="/consultation/:slug" element={
          <PageLayout><ConsultationDetailPage /></PageLayout>
        } />
        <Route path="/kundali" element={
          <PageLayout><KundliResultPage /></PageLayout>
        } />
        <Route path="/about" element={
          <PageLayout><AboutUs /></PageLayout>
        } />
        <Route path="/contact" element={
          <PageLayout><ContactUs /></PageLayout>
        } />

        {/* Calculator detail pages */}
        <Route path="/calculators/:type" element={
          <PageLayout><CalculatorPage /></PageLayout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
