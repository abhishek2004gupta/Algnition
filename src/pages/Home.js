import Hero from '../components/Hero';
import Features from '../components/Features';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import FeaturesSection from '../components/FeatureSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <Footer />
    </>
  );
}
