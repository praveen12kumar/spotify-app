import {useEffect} from 'react'
import SidebarPlaylistItem from "../atoms/SidebarPlayItem";
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbums } from '../../redux/slices/album-slice';


const SidebarPlaylist = () => {

  const dispatch = useDispatch();

  const {albums} = useSelector((state)=> state.albums);


  useEffect(()=>{
    dispatch(getAllAlbums());
  },[dispatch])


  
  return (
    <div className=" h-2/3 overflow-y-auto">
          <ul className="space-y-2 flex flex-col gap-2">
           
          {
            albums && albums?.map((item, index) => (
              <SidebarPlaylistItem key={index} id={item._id} image={item.thumbnail} name={item?.title} />
            ))
          }

          </ul>
        </div>
  )
}

export default SidebarPlaylist