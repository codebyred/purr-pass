import HeroCarousel from "@/components/hero-carousel";
import Featured from "@/components/featured"

export default function HomePage() {
  return (
    <>
      <section className="w-full mt-8 mb-8 px-6 sm:px-24">
        <div className="flex items-center justify-center">
          <HeroCarousel/>
        </div> 
      </section>
      <section className="w-full mt-8 mb-8 px-6 sm:px-24">
        <Featured/>
      </section>
      <section className="w-full mt-8 mb-8">

      </section>
    </>
  )
}