import SidebarNavigation from "../molecules/SidebarNavigation"
import Input from "../atoms/Input";
import { FiSearch } from "react-icons/fi";
import {useState } from "react";
import SidebarPlaylist from "../molecules/SidebarPlaylist";



const Sidebar = () => {

 

  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);

 



  return (
    <div className="w-full h-full bg-[#121212] px-2 text-gray-300 my-2 ml-1 rounded-lg">
        <div className="w-full h-full flex flex-col justify-start gap-4">

        <SidebarNavigation/>

        <div className="w-24 flex items-center justify-center rounded-3xl bg-[#333333] py-1 cursor-pointer">
          <p className="text-sm font-medium">Artists</p>
        </div>

        <div className={` flex items-center gap-1 rounded-3xl py-1 px-3  ${active ? "bg-[#333333] transform duration-200" : ""} `}>
          <FiSearch className="size-4  text-gray-300 cursor-pointer" onClick={() => setActive(!active)}/>

          <Input type="text" placeholder="" onChange={(e) => setSearch(e.target.value)} value={search} className={`bg-transparent text-md font-medium text-white outline-none`} />
        </div>
        {/*Divider*/}

        <div className="w-full h-[1px] bg-[#333333]"></div>

        {/*Top Artists*/}
          <SidebarPlaylist/>
        </div>
    </div>
  )
}

export default Sidebar