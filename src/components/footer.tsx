import Link from "next/link"
import Logo from "./logo"

export const Footer = () => {
    return (
        <footer className="border-2 bg-gray-100 px-2 sm:px-24 py-4 grid gird-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <Logo />
                <div className="text-xs flex flex-col gap-2">
                    <p>Cat Accessories & Food in Bangladesh, Get the Best Pet Food & Supplies in Bangladesh! Buy Cat Food, Cat Litter, Dog Food, Pet Accessories in BD.</p>
                    <p><span className="font-semibold">Address:</span> House #480/1, Road#12, Gawair, 1230 Dhaka, Bangladesh</p>

                    <p><span className="font-semibold">Phone:</span> 01xxx-xxxxxx</p>

                    <p><span className="font-semibold">Email:</span> petlandbd@gmail.com</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="font-medium text-sm">Useful Links</h1>
                <div className="text-xs flex flex-col gap-2">
                    <p><Link href={"/about"}>About Us</Link></p>
                    <p><Link href={"/about"}>Terms & Conditions</Link></p>
                    <p><Link href={"/about"}>Privacy Policy</Link></p>
                    <p><Link href={"/about"}>Return & Refund Policy</Link></p>
                    <p><Link href={"/about"}>Contact Us</Link></p>
                </div>
            </div>
            <div className="text-xs sm:col-span-2 border-t-2 flex items-center justify-center">
                <p>&copy; 2025 PetLandBd - All rights reserved</p>
            </div>
        </footer>
    )
}