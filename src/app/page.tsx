import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#000000] text-white selection:bg-green-500 selection:text-black">
      {/* Background Grid Overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-20" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.05),transparent_50%)]" />
      
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <div className="separator opacity-50" />
        <Skills />
        <div className="separator opacity-50" />
        <Projects />
        <div className="separator opacity-50" />
        <Blog />
        <div className="separator opacity-50" />
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
