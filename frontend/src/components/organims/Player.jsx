import { PlayerController } from "../molecules/PlayerController";

const Player = () => {

 


  return (
    <div className="w-full h-full text-white flex items-center justify-center">
          <div className="px-5 w-1/2 flex flex-col gap-2">
            <p className="text-lg font-poppins font-bold">Song 1</p>
            <p className="text-sm font-poppins text-gray-400">Artist 1</p>
          </div>
          
            <PlayerController/>
          
    </div>
  )
}

export default Player