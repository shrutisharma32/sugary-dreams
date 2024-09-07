export default function SuccessBox({children}) {
    return (
        <div className="text-center text-red border-2 border-green-600 rounded-lg p-2 bg-verify">{children}</div>
    )
}