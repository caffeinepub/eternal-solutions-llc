import ContactSection from "../components/home/ContactSection";
import DisclaimerSection from "../components/home/DisclaimerSection";
import Footer from "../components/home/Footer";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import IntakeFormSection from "../components/home/IntakeFormSection";
import NavBar from "../components/home/NavBar";
import WhyUsSection from "../components/home/WhyUsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhyUsSection />
        <IntakeFormSection />
        <DisclaimerSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
