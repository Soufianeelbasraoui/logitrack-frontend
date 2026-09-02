import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Partners from "../components/landing/Partners";
import Services from "../components/landing/Services";
import Features from "../components/landing/Features";
import WhyUs from "../components/landing/WhyUs";
import Industries from "../components/landing/Industries";
import Tracking from "../components/landing/Tracking";
import Testimonials from "../components/landing/Testimonials";
import Insights from "../components/landing/Insights";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

import "../styles/landing.css";

export default function LandingPage() {
  return (
    <div className="landing-body">
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Services />
        <Features />
        <WhyUs />
        <Industries />
        <Tracking />
        <Testimonials />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
