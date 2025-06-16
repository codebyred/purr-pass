import HeroCarousel from "@/components/hero-carousel";
import Featured from "@/components/featured"

export default function HomePage() {
  return (
    <main className="max-w-[1440px] min-h-screen mx-auto">
      <section className="w-full mt-8 mb-4 px-6 sm:px-24">
        <div className="flex items-center justify-center">
          <HeroCarousel/>
        </div> 
      </section>
      <section className="w-full mt-4 mb-4 px-6 sm:px-24">
        <Featured/>
      </section>
    </main>
  )
}