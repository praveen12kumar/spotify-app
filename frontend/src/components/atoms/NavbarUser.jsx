
import { GoBell } from "react-icons/go";
import Dropdown from "./Dropdown";
import useComponentVisible from "../../hooks/useComponentVisible";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarUser = () => {
    const navigate = useNavigate();
    const {isLoggedIn, user} = useSelector((state)=> state.auth);

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible();
  
    return (
    <div className={`${isLoggedIn ? "justify-end" : "justify-between"}  w-1/4  h-full flex flex-row items-center gap-6 px-5 relative `}>
      <div className="w-36 py-[5px] bg-white flex items-center justify-center rounded-3xl hover:scale-105 hover:opacity-90 transition duration-150 will-change-transform">
        <h4 className="text-sm font-semibold text-center font-nunito py-[2px]">Explore Premium</h4>
      </div>
      {
        isLoggedIn && <GoBell className="w-5 h-5 text-gray-400" />
      }
      {
        isLoggedIn ? 
        <div
        ref={ref}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-700 hover:scale-105 transition duration-150 will-change-transform cursor-pointer"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-800">
          {
            user?.avatar ? 
            <img src={user?.avatar} className="w-full h-full rounded-full" alt="avatar" />
            :
            <p className="text-sm font-bold text-white">{user?.username?.charAt(0)}</p>
          }
        </div>
      </div>
      :
      <div className=" flex items-center gap-3 ">
        <div className="">
          <Button
            type="button"
            text="Sign up"
           className="text-sm font-semibold text-white font-nunito"
           onClick={()=> navigate("/signup")}
          />
        </div>
        <div className="w-28 bg-white flex items-center justify-center rounded-full hover:scale-105 hover:opacity-90 transition duration-150 will-change-transform">
        <Button
            type="button"
            text="Log in"
           className="text-md font-bold text-black px-4 py-3 font-nunito" 
           onClick={()=> navigate("/login")}
          />
        </div>
      </div>
      }

      {isComponentVisible && <Dropdown/>}
    </div>
  );
};

export default NavbarUser;
