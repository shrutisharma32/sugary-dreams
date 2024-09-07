import Image from "next/image"
import Right from "../icons/Right"
import Link from "next/link"
export default function Hero() {
    return (
        <section className="hero md:mt-4">
            <div className="py-8 md:py-12">
                <h1 className="text-4xl text-hunter font-semibold ">Where <br/> <span className="text-primary">Sweet Fantasies</span> Come to Life!</h1>
                <p className="my-4 text-gray-500 text-sm">
                    At Sugary Dreams, we are dedicated to crafting exquisite cakes, cupcakes, pastries, and cheesecakes that ignite your taste buds and fulfill your sweetest dreams.
                </p>
                <div className="flex gap-4 text-sm ">
                    <Link href={'/menu'} className="justify-center bg-primary flex items-center gap-2 text-white text-md font-semibold rounded-full px-4 py-2 hover:bg-hoverbutton">
                       ORDER 
                       <Right/>
                    </Link>
                    <button className="flex items-center border-0 gap-2 py-2 text-gray-500 font-semibold">Learn More<Right/></button>
                </div>
            </div>
            <div className="relative hidden md:block">
                <Image src={'/cake5.png'} layout={'fill'} objectFit={'contain'} alt={'cake'} />
            </div>
        </section>
    )
}