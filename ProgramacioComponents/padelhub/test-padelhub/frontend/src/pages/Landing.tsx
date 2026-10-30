import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import UserTypesSection from '../components/UserTypesSection';
import ValuesSection from '../components/ValuesSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import '../styles/landing.css';

export default function Landing() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UserTypesSection />
      <ValuesSection />
      <CTASection />
      <Footer />
    </>
  );
}
