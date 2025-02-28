import { MdDeleteOutline } from "react-icons/md";

const SongCard = ({ song }) => {
    console.log("songCard", song);
   return(
    <div className="w-full flex items-center  justify-center">
            <td className="w-1/4 py-1">
                  <div className="flex items-center justify-start gap-4">
                    <img
                      src={song.thumbnail}
                      alt={song.title}
                      className="w-8 h-8 rounded-md"
                    />
                    <h3 className="text-sm font-medium font-nunito text-white">
                      {song.title}
                    </h3>
                  </div>
                </td>
                <td className="w-1/4  text-left">
                  <p className="text-sm font-medium font-nunito text-white">
                    {song.artist}
                  </p>
                </td>
                <td className="w-1/4 text-left">
                  <p className="text-sm font-medium font-nunito text-white">
                    {song?.createdAt}
                  </p>
                </td>
                <td className="w-1/4">
                 <div className="w-full flex items-center justify-end">
                 <MdDeleteOutline className="w-5 h-5 text-red-500" />
                 </div>
                </td>
           
        </div>
   )
};

export default SongCard;
