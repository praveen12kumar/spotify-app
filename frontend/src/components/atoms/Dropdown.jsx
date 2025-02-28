import { logout } from "../../redux/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";



const Dropdown = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);  
  const navigate = useNavigate();

  const dropdownlist = [
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Logout",
      path: "",
    },
  ];

  const handleItemClick = (list) => {
    if (list.name === "Logout") {
      dispatch(logout());
    } else if (list.path) {
      navigate(list.path);
    }
  };

  return (
    <div className="w-[180px] h-auto absolute right-3 top-16 z-50 p-1 bg-[#333333] flex flex-col items-center justify-start rounded-md">
      {dropdownlist.map((list, index) => (
        <li key={index}
          onClick={()=>handleItemClick(list)}
          className="w-full list-none text-gray-300 text-sm px-4 py-3 rounded-sm font-medium hover:text-white hover:bg-[#444444] hover:underline hover:underline-offset-2 cursor-pointer"
          >
            {list.name}
          </li>
      ))}
      
        {
          user?.role === "ADMIN" && (
            <li className="w-full list-none text-gray-300 text-sm px-4 py-3 rounded-sm font-medium hover:text-white hover:bg-[#444444] hover:underline hover:underline-offset-2 cursor-pointer"
            onClick={() => navigate("/admin")}>
              Admin
            </li>
          )
        }
      
    </div>
  );
};

export default Dropdown;
