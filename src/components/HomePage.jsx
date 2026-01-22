import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { About } from "./About";
import { Features } from "./Features";
import { HowItWorks } from "./HowItWorks";
import { Footer } from "./Footer";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}
