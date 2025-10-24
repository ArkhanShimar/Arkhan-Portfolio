import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[rgba(3,7,18,1)] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.12),transparent_60%)]" />
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Projects />
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
