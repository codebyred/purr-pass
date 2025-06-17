import Image from "next/image"

export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <Image src={"/logo.png"} alt="logo" width={24} height={24} />
            <h1 className="font-bold text-primary">
                PetLand
                <span className="text-green-700">BD</span>
            </h1>
        </div>
    )
}