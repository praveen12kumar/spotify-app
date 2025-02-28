import {useState} from 'react'
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { PiBrowsersBold } from "react-icons/pi";
import Input from "../atoms/Input";

const Searchbar = () => {
    const [search, setSearch] = useState("");
  return (
    <div className="w-1/3 flex flex-row gap-2 items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 cursor-pointer hover:scale-105 transition duration-150">
                        <GoHomeFill className="size-7 opacity-95 text-white"   />
                    </div>
    
                    <div className="w-full flex flex-1 items-center gap-1 px-3 py-2 rounded-3xl bg-[#2A2A2A] hover:bg-[#393939] transition-colors duration-200">
                    <FiSearch className="size-6 opacity-85 text-gray-300"/>
                    <Input 
                            type="text" 
                            placeholder="What do you want to play?" 
                            onChange={(e) => setSearch(e.target.value)} 
                            value={search}
                            className="flex-1 bg-transparent text-md font-medium text-white placeholder-gray-400 outline-none"
                    />
                    <div className="h-full flex flex-row gap-2 items-center">
                        <div className="w-[1px] h-8 border-[1px] border-gray-600"></div>
                        <PiBrowsersBold className="size-6 mr-2  text-white" />
                    </div>
                    </div>
                </div>
  )
}

export default Searchbar