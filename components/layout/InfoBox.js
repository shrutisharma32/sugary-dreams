export default function InfoBox({ children }) {
    return (
        <div className="text-center text-red border-2 border-blue-400 rounded-lg p-2 bg-blue-300">
          {children}
        </div>
    )
}