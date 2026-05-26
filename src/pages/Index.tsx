import { Header } from "@/components/common/Header";
import { Hero } from "@/components/common/Hero";
import { FeatureCards } from "@/components/common/FeatureCards";
import { Testimonials } from "@/components/common/Testimonials";
import { Footer } from "@/components/common/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeatureCards />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;