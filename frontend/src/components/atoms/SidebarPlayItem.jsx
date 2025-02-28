import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const SidebarPlaylistItem = ({id,image, name}) => {
    const navigate = useNavigate();

    const [play, setPlay] = useState(false);

    return (
    <div className={`w-full flex items-center gap-3 pl-2 py-1 rounded-sm relative hover:bg-[#333333] cursor-pointer`}
        onMouseEnter={() => setPlay(true)}
        onMouseLeave={() => setPlay(false)}
        onClick={()=>navigate(`/album/${id}`)}
        >
        <div className="w-12 h-12 object-cover">
            <img src={image} className="w-full h-full rounded-full" alt="artist image" />
        </div>

        <div className="flex flex-col">
            <p className="text-md font-medium capitalize">{name}</p>
            <p className="text-xs text-gray-300">Artist</p>
        </div>

        {
            play && <div className="w-12 h-12 bg-black opacity-80 flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-2 z-50">
                <FaPlay className="size-5 text-white cursor-pointer"/>
            </div>
        }

    </div>
  )
}

export default SidebarPlaylistItem