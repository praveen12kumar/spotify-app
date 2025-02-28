import { FaMusic, FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import useModal from "../../hooks/useModal";
import AddSongModal from "../../pages/admin/AddSongModal";
import { deleteSong } from "../../redux/slices/song-slice";
import { getStats } from "../../redux/slices/admin-slice";
import {useDispatch} from "react-redux";

const SongsTableAdmin= ({ songs = []}) => {

  const dispatch = useDispatch();

  const { isModalOpen, open, close } = useModal();

  async function handleSongDelete(id){
    if(id){
      await dispatch(deleteSong(id));
    }
    dispatch(getStats());
    
  }


  return (
    <div className="max-w-7xl mx-auto w-full h-auto flex flex-col items-center p-6 rounded-lg bg-[#333333] relative">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center justify-between">
          <div className="w-1/5 flex flex-col items-start justify-center">
            <div className="flex items-center gap-2">
              <FaMusic className="w-5 h-5 text-green-600" />
              <p className="text-sm font-medium text-white font-nunito">
                Songs Library
              </p>
            </div>
            <p className="text-xs text-gray-400 font-poppins">
              Manage your music tracks
            </p>
          </div>
        </div>
        <div className="w-40 flex items-center">
          <button
            onClick={open}
            className="w-36 text-sm rounded-lg px-3 py-2 text-white bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 flex items-center justify-center gap-4 font-poppins"
          >
            <FaPlus className="w-3 h-3 text-white" /> Add Song
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
              Release Date
            </th>
            <th className="w-1/4 text-gray-400 text-sm font-medium font-nunito text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="w-full">
          {songs.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-white">
                No songs available
              </td>
            </tr>
          ) : (
            songs.map((song, index) => (
              <tr key={index} className="w-full border-b  border-gray-600">
                <td className="w-1/4 py-2">
                  <div className="flex items-center justify-start gap-8">
                    <img
                      src={song.thumbnail}
                      alt={`Thumbnail of ${song.title}`}
                      className="w-8 h-8 rounded-md"
                    />
                    <h3 className="text-sm font-medium font-nunito text-white">
                      {song.title}
                    </h3>
                  </div>
                </td>
                <td className="w-1/4 text-left">
                  <p className="text-sm font-medium font-nunito text-white">
                    {song.artist}
                  </p>
                </td>
                <td className="w-1/4 text-left">
                  <div className="w-full flex items-center gap-2">
                    <MdDateRange className="w-4 h-4 mb-1 text-gray-400" />
                    <p className="text-sm font-medium font-nunito text-white">
                      {song?.createdAt?.split("T")[0]}
                    </p>
                  </div>
                </td>
                <td className="w-1/4"
                  onClick={()=>handleSongDelete(song?._id)}
                  >
                  <div className="w-full pr-4 flex items-center justify-end cursor-pointer">
                    <MdDeleteOutline className="w-5 h-5 text-red-500" />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModalOpen && <AddSongModal  close={close} />}
    </div>
  );
};

export default SongsTableAdmin;
