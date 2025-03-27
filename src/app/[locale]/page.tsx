import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Logos from "@/components/Logos";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import { useTranslations } from "next-intl";

const HomePage: React.FC = () => {
  const testimonialsT = useTranslations('testimonials');
  return (
    <>
      {/* <div className='flex flex-col items-center justify-center h-screen'>
        <ThemeToggle />
        <h1>{t('title')}</h1>
        <Link href="/about">{t('about')}</Link>
      </div> */}
      <Header />
      <Hero />

      <Logos />
      <Container>
        <Benefits />

        {/* <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section> */}

        <HowItWorks />
        <Section
          id="testimonials"
          title={testimonialsT('heading')}
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;

