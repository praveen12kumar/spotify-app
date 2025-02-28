
import AlbumCard from '../molecules/AlbumCard';


const ForyouPlaylist = ({songs}) => {
    console.log("Songs", songs);
    return (
    <div className='w-full flex flex-row gap-4'>
        {
            songs && songs?.map((song)=>{
                return(
                    <AlbumCard key={song._id} song={song} />
                )
            })
        }
    </div>
  )
}

export default ForyouPlaylist