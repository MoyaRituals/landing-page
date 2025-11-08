import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BenefitsGrid from '@/components/BenefitsGrid'
import ProductShowcase from '@/components/ProductShowcase'
import RitualSteps from '@/components/RitualSteps'
import FounderStory from '@/components/FounderStory'
import EmailSignupForm from '@/components/EmailSignupForm'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BenefitsGrid />
      <ProductShowcase />
      <RitualSteps />
      <FounderStory />
      <EmailSignupForm />
      <Footer />
    </main>
  )
}
