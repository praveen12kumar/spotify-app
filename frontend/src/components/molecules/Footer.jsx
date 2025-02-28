import { FaFacebook, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6";
import GradientWrapper from "../molecules/GradientWrapper";
function Footer(){
    const iconStyle = "size-6 text-gray-400 hover:text-gray-200 hover:shadow-[0_0_10px_#212121] cursor-pointer"
    return (
        <GradientWrapper graditientStyles="custom-gradient-black rounded-bl-lg rounded-br-lg">
            <div className="w-full h-32 flex items-center justify-between px-20">
                <div className="">
                    <p className="text-sm font-poppins text-gray-400">© 2023 Spotify AB</p>
                </div>
                <div className="w-1/3 flex items-center gap-10">
                    <FaFacebook className={iconStyle} />
                    <FaInstagram className={iconStyle} />
                    <FaXTwitter className={iconStyle} />
                    <FaGithub className={iconStyle} />
                </div>
            </div>
        </GradientWrapper>
    )
};

export default Footer;