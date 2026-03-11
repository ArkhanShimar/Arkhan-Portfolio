import { SectionSlider } from "@/components/section-slider";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#000000] text-white selection:bg-green-500 selection:text-black">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.05),transparent_50%)]" />

      <SectionSlider />
    </div>
  );
}
