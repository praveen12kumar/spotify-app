import LogoImage from "../atoms/LogoImage";
import Searchbar from "../atoms/SearchBar";
import NavbarUser from "../atoms/NavbarUser";


const Navbar = () => {

  return (
    <div className="w-full h-full bg-black ">
        <div className="w-full h-full flex flex-row items-center justify-between">
            {/*Logo */}
            
                <LogoImage width={35} height={35}/>
            

            {/*Search Bar */}
            <Searchbar/>

            {/*Icons */}
            <NavbarUser/>

        </div>
    </div>
  )
}

export default Navbar