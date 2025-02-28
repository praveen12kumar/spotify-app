
function StatCard({icon, title, count, className}){

    return(
        <div className="w-1/5 flex items-center bg-[#444444] justify-start px-6 py-4 rounded-lg">
            <div className={`${className} rounded-md opacity-80 w-8 h-8 flex items-center justify-center`}>
                    {icon}
            </div>
            <div className="flex flex-col ml-4">
                <p className="text-sm font-semibold text-gray-400 font-nunito">{title}</p>
                <p className="text-xl text-gray-50 font-poppins">{count}</p>
            </div>
        </div>
    )
}


export default StatCard;