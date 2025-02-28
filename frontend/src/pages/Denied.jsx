
import Lottie from 'lottie-react'
import accessDenied from "../assets/lottie/access-denied.json";
import { useNavigate } from 'react-router-dom';


function Denied(){
    const navigate = useNavigate();
    return(
        <div className='w-full bg-sky-900 h-dvh flex flex-col items-center justify-center gap-4'>
            <Lottie animationData={accessDenied} loop={true} width={400} height={400} />
            <button 
                onClick={()=> navigate(-1)}
                className='text-black bg-white px-8 py-2 rounded-md cursor-pointer'>Back</button>
        </div>
    )
};

export default Denied;