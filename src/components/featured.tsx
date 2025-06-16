import { getFeaturedCategories } from "@/lib/utils";
import Image from "next/image";

const Featured = () => {

    const featuredCategories = getFeaturedCategories();

    return (
        <div className="py-2 flex flex-col items-center">
            <h2 className="text-primary font-bold text-xl text-center mb-4">Featured Categories</h2>
            <div className="flex items-center gap-4">
                {
                    featuredCategories.map((featured) => (
                        <div className="flex flex-col items-center gap-2">
                            <div className="border-2 rounded-full w-[14.063rem] h-[14.063] aspect-square overflow-hidden max-w-[225px]">
                                <Image
                                    src={"/cat.png"}
                                    width={225}
                                    height={225}
                                    alt={"featured category image"}
                                    className="object-contain"
                                />
                            </div>
                            <p>{featured}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Featured;