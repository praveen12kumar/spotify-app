import Lottie from "lottie-react";
import notFound from "../assets/lottie/not-found.json";
import { useNavigate } from "react-router-dom";
function NotFound(){

    const navigate = useNavigate();
    return(
        <div className='w-full bg-sky-900 h-dvh flex flex-col items-center justify-center gap-4'>
            <Lottie animationData={notFound} loop={true} width={400} height={400} />
            <button 
                onClick={()=> navigate(-1)}
                className='text-black bg-white px-8 py-2 rounded-md cursor-pointer'>Back</button>
        </div>
    )
};

export default NotFound;