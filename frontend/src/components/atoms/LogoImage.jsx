
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";


const LogoImage = ({width, height, className}) => {

  const navigate = useNavigate();

  return (
        <div 
          onClick={() => navigate("/")}
          className="w-1/3 h-full flex flex-row items-center pl-5 cursor-pointer">
          <img className={`rounded-full border-none bg-white ${className}`} 
              src={logo} 
              alt="logo" 
              width={width} 
              height={height} />
        </div>
   
  )
}

export default LogoImage
