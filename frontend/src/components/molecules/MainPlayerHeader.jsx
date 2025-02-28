import HeaderItem from "../atoms/HeaderItem";


const MainPlayerHeader = () => {
  return (
    <div className='w-full h-16 flex flex-row gap-6 items-center justify-start z-50'>
        <HeaderItem text="All"
            classs="w-16 flex items-center justify-center rounded-3xl bg-white py-1 cursor-pointer" 
            onClick={()=>{console.log("All")}}
        />
        <HeaderItem text="Music"
            classs="w-24 flex text-gray-300 items-center justify-center rounded-3xl bg-[#404040] py-1 cursor-pointer" 
            onClick={()=>{console.log("Music")}}
        />
        <HeaderItem text="Podcasts"
            classs="w-24 text-gray-300 flex  items-center justify-center rounded-3xl bg-[#404040] py-1 cursor-pointer" 
            onClick={()=>{console.log("Podcasts")}}
        />
    </div>
  )
}

export default MainPlayerHeader