export const TableLoading = () => {
  return (
    <div className="w-[80%] overflow-auto rounded-lg shadow mx-auto animate-pulse">
        <table border={1} className="w-full">
            <thead className="bg-[#c0c5e1] border-b-2 border-gray-200">
            <tr>
                <th className="p-3 text-md font-semibold tracking-wide text-left text-red-500 animate-pulse bg-gray-300 rounded h-6 w-24"></th>
                {/* Placeholder for Payer names */}
                {Array.from({ length: 6 }).map((_, index) => (
                <th key={index} className="p-3 text-md font-semibold tracking-wide text-left animate-pulse bg-gray-300 rounded h-6 w-24"></th>
                ))}
            </tr>
            </thead>
            <tbody>
            {Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="p-3 text-md text-gray-700 animate-pulse bg-gray-300 rounded h-6 w-24"></td>
                {/* Placeholder for Row labels */}
                {Array.from({ length: 6 }).map((_, colIndex) => (
                    <td key={colIndex} className="p-3 text-md text-gray-700">
                    <span className="animate-pulse bg-gray-300 rounded h-6 w-16 block"></span>
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
    </div>

  )
}

