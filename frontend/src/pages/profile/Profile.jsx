import {useState, useEffect} from "react";
import { FiEdit2 } from "react-icons/fi"
import GradientWrapper from "../../components/molecules/GradientWrapper";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../redux/slices/auth-slice";
import useModal from "../../hooks/useModal";
import UserModal from "../../components/molecules/UserModal";


const Profile = () => {
  const dispatch = useDispatch()
  const{isModalOpen, open, close} = useModal();


  const {user} = useSelector((state) => state.auth);
  
  const [showEdit, setShowEdit] = useState(false)

  useEffect(()=>{
    dispatch(getUserDetails())
  },[dispatch])                                                                                                                                                                                                

  return (
    <GradientWrapper graditientStyles="custom-gradient-black rounded-tl-lg rounded-tr-lg">
    <div className="w-full h-full overflow-auto   text-white flex flex-col items-center justify-center relative" >
        <div className="w-full h-[40vh] p-4 flex items-center justify-items-start gap-4 custom-gradient-green">
            <div className="w-56 h-56 rounded-full relative"
              onMouseEnter={() => setShowEdit(true)}
              onMouseLeave={() => setShowEdit(false)}
              >
                  <img src={user?.avatar} className={`${showEdit && "border-none"} border border-zinc-300  w-full h-full rounded-full cursor-pointer`} alt="avatar" />
                  {
                    showEdit && <div 
                        onClick={open}
                        className="w-full h-full bg-black opacity-80 flex flex-col items-center justify-center absolute top-1/2 -translate-y-1/2  rounded-full cursor-pointer">
                        <FiEdit2 className="size-10 text-white cursor-pointer"/>
                        <p className="text-sm font-bold text-white">Edit profile</p>
                    </div>
                  }
                
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-nunito text-sm font-semibold">Profile</p>
              <h1 className="text-7xl font-bold tracking-tighter">{user?.username}</h1>
              <div className="w-full mt-4 flex flex-row items-center gap-1 ">
                <p className="mb-3 font-bold">.</p>
                <p className="font-nunito font-semibold">{user?.subscribedArtists?.length} Following</p>
              </div>
            </div>
        </div>
       {
        isModalOpen && <UserModal close={close} />
       }
        
    </div>
    </GradientWrapper>
  )
}

export default Profile


