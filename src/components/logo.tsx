import Image from "next/image"

export default function Logo() {
    return (
        <div className="flex items-center">
            <Image src={"/PurrPass.png"} alt="logo" width={80} height={80} />
        </div>
    )
}