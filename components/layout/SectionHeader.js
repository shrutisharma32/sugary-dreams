export default function SectionHeader({ subHeader, mainHeader }) {
    return (
        <>
            <h3 className="uppercase leading-4 font-semibold text-gray-400">{subHeader}</h3>
            <h2 className="text-4xl text-primary font-bold uppercase">{mainHeader}</h2>

        </>
    )
}