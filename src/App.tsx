import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/:slug" element={<ReportDetailPage />} />
        <Route path="/kundali" element={<KundliResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
