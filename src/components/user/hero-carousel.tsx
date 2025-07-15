"use client"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { heroBanners } from "@/lib/const"
import Image from "next/image"

const HeroCarousel = () => {
    return (
        <div className="max-w-[1080px] rounded-xl roundex-xl overflow-hidden">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={2000}
                showArrows={false}
                showStatus={false}
            >
                {
                    heroBanners.map(({ imageUrl, alt }) => (
                        <Image
                            key={alt}
                            src={imageUrl}
                            alt={alt}
                            width={1080}
                            height={720}
                            className="object-contain rounded-xl"
                        />
                    ))
                }
            </Carousel>
        </div>
    )
}

export default HeroCarousel