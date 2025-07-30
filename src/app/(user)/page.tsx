import HeroCarousel from "@/components/user/hero-carousel";
import FeaturedCategories from "@/components/user/featured-categories"
import FeaturedProducts from "@/components/user/featured-products";

export default function HomePage() {
  return (
    <>
      <section className="w-full mt-8 mb-8 px-6 sm:px-24">
        <div className="flex items-center justify-center">
          <HeroCarousel/>
        </div> 
      </section>
      <section className="w-full mt-8 mb-8 px-6 sm:px-24">
        <FeaturedCategories/>
        <FeaturedProducts/>
      </section>
      <section className="w-full mt-8 mb-8">

      </section>
    </>
  )
}