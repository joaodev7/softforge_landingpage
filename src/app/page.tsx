import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { Differentials } from "@/components/sections/differentials";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Projects />
        <Process />
        <Differentials />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
