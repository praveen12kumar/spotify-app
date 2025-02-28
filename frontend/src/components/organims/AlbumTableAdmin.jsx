import { FaMusic, FaPlus } from "react-icons/fa";
import AddAlbumModal from "../../pages/admin/AddAlbumModal";
import useModal from "../../hooks/useModal";
import { MdDeleteOutline } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import {useDispatch} from "react-redux";
import { deleteAlbum } from "../../redux/slices/album-slice";
import { getAllAlbums } from "../../redux/slices/album-slice";



const AlbumTableAdmin = ({albums=[]}) => {

    const {isModalOpen, open, close} = useModal();
    const dispatch = useDispatch();

    async function handleAlbumDelete(albumId) {
      //console.log("albumId", albumId);
      await dispatch(deleteAlbum(albumId));
      await dispatch(getAllAlbums());
    }
  
    return (
        <div className="max-w-7xl mx-auto w-full h-auto flex flex-col items-center p-6 rounded-lg bg-[#333333]">
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center justify-between">
              <div className="w-1/5 flex flex-col items-start justify-center">
                <div className="flex items-center gap-2">
                    <FaMusic className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-medium text-white font-nunito">
                    Albums Library
                  </p>
                </div>
                <p className="text-xs text-gray-400 font-poppins">
                    Manage your album collection
                </p>
              </div>
            </div>
            <div className="w-40 flex items-center">
                <button
                  onClick={open}
                  className="w-36 text-sm rounded-lg px-3 py-2 text-white bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 flex items-center justify-center gap-4 font-poppins"
                >
                  <FaPlus className="w-3 h-3 text-white" /> Add Album
                </button>
            </div>
          </div>
          <table className="w-full mt-10">
            <thead className="w-full border-b border-gray-600">
              <tr className="w-full pb-4">
                <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito  text-left pl-10">
                  Title
                </th>
                <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito text-left">
                  Artist
                </th>
                <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito text-left">
                  Release Year
                </th>
                <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito text-left">
                  Songs
                </th>
                <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito text-right">
                  Actions
                </th>
              </tr>
            </thead>
            {albums && (
              <tbody className="w-full ">
                {albums?.map((song, index) => (
                  <tr key={index} className="w-full border-b  border-gray-600">
                    <td className="w-1/5 py-2">
                      <div className="flex items-center justify-start gap-8">
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
                    <td className="w-1/5  text-left ">
                      <p className="text-sm font-medium font-nunito text-gray-300">
                        {song.artist}
                      </p>
                    </td>
                    <td className="w-1/5 text-left">
                        <div className="w-full flex items-center gap-2">
                            <MdDateRange className="w-4 h-4 mb-1 text-gray-400" />
                       
                        <p className="text-sm font-medium font-nunito text-gray-300">
                        {song?.createdAt?.split("-")[0]}
                      </p>
                      </div>
                    </td>
                    <td className="w-1/5 text-left">
                    <div className="w-full flex items-center gap-1 font-nunito">
                      <FaMusic className="w-4 h-4 text-gray-600 " />
                      <p className="text-sm font-medium  text-gray-400">{song?.songs?.length}</p>
                      <p className="text-md font-medium  text-gray-400">songs</p>
                    </div>
                    </td>
                    <td className="w-1/5">
                     <div
                        onClick={()=>handleAlbumDelete(song._id)} 
                        className="w-full pr-4 flex items-center justify-end cursor-pointer">
                        <MdDeleteOutline className="w-5 h-5 text-red-500" />
                     </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) }
            
          </table>

          {isModalOpen && <AddAlbumModal  close={close} />}
        </div>
      );
}

export default AlbumTableAdmin