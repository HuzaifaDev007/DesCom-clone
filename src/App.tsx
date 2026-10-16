import { BrowserRouter, Routes, Route } from 'react-router'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { SmoothScroll } from './components/SmoothScroll'
import './css/shared.css'
import { AboutUsPage } from './pages/AboutUsPage'
import { CareerPage } from './pages/CareerPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { JoinUsPage } from './pages/JoinUsPage'
import { LeadGenerationPage } from './pages/LeadGenerationPage'
import { QuotePage } from './pages/QuotePage'
import { ServicesPage } from './pages/ServicesPage'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <div className="relative min-h-screen bg-zinc-50 text-zinc-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/join-our-agency" element={<JoinUsPage />} />
            <Route path="/join-us" element={<JoinUsPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/carrer" element={<CareerPage />} />
            <Route path="/insurance-lead-generation" element={<LeadGenerationPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/quote" element={<QuotePage />} />
          </Routes>
          <Footer />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  )
}
