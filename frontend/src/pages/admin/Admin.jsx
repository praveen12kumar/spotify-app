import { useEffect, useState } from "react";
import GradientWrapper from "../../components/molecules/GradientWrapper";
import LogoImage from "../../components/atoms/LogoImage";
import { useSelector, useDispatch } from "react-redux";
import { FaMusic} from "react-icons/fa";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import DashboardStats from "../../components/atoms/DashboardStats";
import SongsTableAdmin from "../../components/organims/SongsTableAdmin";
import AlbumTableAdmin from "../../components/organims/AlbumTableAdmin";
import { getAllAlbums } from "../../redux/slices/album-slice";
import { getAllSongs } from "../../redux/slices/song-slice";


function AdminPage() {
  const dispatch = useDispatch();

  const [toggleSongAlbum, setToggleSongAlbum] = useState(true);

 

  const { user } = useSelector((state) => state.auth);
  const { songs } = useSelector((state) => state.songs);
  const { albums } = useSelector((state) => state.albums);
  console.log("user", user);
  console.log("songs", songs);
  console.log("albums", albums);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(getAllAlbums()), dispatch(getAllSongs())]);
    };
    fetchData();
  }, [dispatch]);

  return (
    <GradientWrapper graditientStyles="custom-gradient-black">
      <div className="w-full h-dvh flex flex-col gap-8 relative">
        <div className="w-full h-20 flex flex-row items-center justify-between">
          <div className="w-1/5 flex items-center p-2">
            <LogoImage width={35} height={35} className="bg-green-600" />
            <div className="">
              <h1 className="text-2xl text-white font-extrabold font-nunito capitalize">
                Music Manager
              </h1>
              <p className="text-xs text-gray-400 font-poppins">Manage your music catalog</p>
            </div>
          </div>
          <div className="w-1/6 pr-4 flex items-center justify-end">
            <div className="w-10 h-10 flex items-center justify-center">
              {user?.avatar ? (
                <img src={user?.avatar} className="w-full h-full rounded-full" alt="avatar" />
              ) : (
                <p className="text-sm font-bold text-white">{user?.username?.charAt(0)}</p>
              )}
            </div>
          </div>
        </div>

        {/* stats cards */}
        <DashboardStats />

        {/* songs or album */}
        <div className="max-w-7xl mx-auto w-full h-10 flex flex-row items-center justify-start gap-8">
          <div
            onClick={() => {
              setToggleSongAlbum(true);
            }}
            className={`flex items-center gap-2 p-2 bg-[#333333] rounded-md cursor-pointer ${
              toggleSongAlbum ? "opacity-100" : "opacity-60 bg-[#444444]"
            }`}
          >
            <FaMusic className="w-3 h-3 text-white" />
            <p className="text-xs font-semibold text-white font-poppins">Songs</p>
          </div>

          <div
            onClick={() => {
              setToggleSongAlbum(false);
            }}
            className={`flex items-center gap-2 p-2 bg-[#333333] rounded-md cursor-pointer ${
              toggleSongAlbum ? "opacity-60 bg-[#444444]" : "opacity-100"
            }`}
          >
            <MdOutlinePhotoLibrary className="w-3 h-3 text-white" />
            <p className="text-xs font-semibold text-white font-poppins">Albums</p>
          </div>
        </div>


        {/* Conditionally Render Modals */}
        
      

        {/* Songs or Albums Table */}
        {toggleSongAlbum ? <SongsTableAdmin  songs={songs || []} /> : <AlbumTableAdmin  albums={albums || []} />}
      </div>
    </GradientWrapper>
  );
}

export default AdminPage;
