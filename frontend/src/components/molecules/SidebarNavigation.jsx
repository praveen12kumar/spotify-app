import { BiLibrary } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
const SidebarNavigation = () => {
  return (
    <div className="w-full px-3 pt-3 flex flex-row items-center">
        <div className="flex flex-1 items-center gap-3">
            <BiLibrary className="size-6 text-gray-300 cursor-pointer" />
            <p className="text-md font-medium">Your Library</p>
        </div>
        <div className="size-7 flex items-center justify-center bg-[#333333] rounded-full">
            <FaPlus className="cursor-pointer"/>
        </div>
        
    </div>
  )
}

export default SidebarNavigation