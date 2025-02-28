import { PlayerController } from "../molecules/PlayerController";
import { useSelector } from "react-redux";

const Player = () => {


  const {currentSong} = useSelector(state => state.player)

  //console.log("current song", currentSong);
 


  return (
    <div className="w-full h-full text-white flex items-center justify-center ">
          <div className="px-10 w-1/2 flex items-center gap-2">
            <div className="">
              {
                currentSong?.thumbnail ? 
                <img src={currentSong?.thumbnail} alt="album" className="w-12 h-12 rounded-md" />
                :
                <img src={`https://robohash.org/artist`} alt="album" className="w-12 h-12 rounded-md" />
              }
            </div>
            <div className="flex flex-col gap-2">
            <p className="text-lg font-poppins font-bold">{currentSong?.title ? currentSong?.title : "No song playing"}</p>
            <p className="text-sm font-[nunito] text-gray-400">{currentSong?.artist ? currentSong?.artist : "No song playing"}</p>
            </div>
          </div>
          
            <PlayerController/>
          
    </div>
  )
}

export default Player