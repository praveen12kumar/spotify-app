import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import GradientWrapper from "../../../components/molecules/GradientWrapper";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import LogoImage from "../../../components/atoms/LogoImage";
import { validateEmail } from "../../../helpers/validateEmail";
import { validatePassword } from "../../../helpers/validatePassword";
import { validateUsername } from "../../../helpers/validateUsername";
import { register } from "../../../redux/slices/auth-slice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [signupValues, setSignupValues] = useState({username:"", email: "", password: "", avatar:""});
  const [previewImage, setPreviewImage] = useState("")

  const handleValidateUsername = ()=>{
    const username = signupValues.username;
    if(!validateUsername(username)){
      usernameRef.current?.setInValid();
    }
  }

  const handleValidateEmail = ()=>{
          const email = signupValues.email;
          if(!validateEmail(email)){
              emailRef.current?.setInValid();
          }
      }
  
      const handleValidatePassword = ()=>{
          const password = signupValues.password;
          if(!validatePassword(password)){
              passwordRef.current?.setInValid();
          }
      }
  
  
      function handleInput(e) {
          setSignupValues({
              ...signupValues,
              [e.target.name]: e.target.value
          })
      }
  
      async function createNewAccount(event) {
        event.preventDefault();
    
        // Input validation
        handleValidateUsername();
        handleValidateEmail();
        handleValidatePassword();
    
        try {
            // Dispatch the register action and wait for the result
            const result= await dispatch(register(signupValues));
            // Handle success or failure
            if (result?.payload?.success) {
                navigate('/verify-email');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }

    function getImage(e) {
        const uploadedImage = e.target.files?.[0]; // ✅ Use optional chaining to prevent errors
        
        if (!uploadedImage) return; // ✅ Ensure a file is selected
    
        setSignupValues((prev) => ({
            ...prev,
            avatar: uploadedImage
        }));
    
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        
        fileReader.onload = () => { // ✅ Use `onload` for better readability
            if (fileReader.result) {
                setPreviewImage(fileReader.result.toString()); // ✅ Ensure result is a string
            }
        };
    }
    


    
  
  return (
    <>
      <GradientWrapper graditientStyles="custom-gradient-slate">
        <div className="w-full h-dvh flex items-center justify-center">
            <div className={`w-5/12 h-[95%] rounded-lg  bg-[#181818] flex justify-center `}>
                <form className="w-[70%] h-full flex flex-col gap-1 items-center py-4" onSubmit={createNewAccount} noValidate>
                    
                    <div className="w-full flex flex-col gap-2 items-center justify-center">
                        <LogoImage width={40} height={40} />
                        <p className="text-4xl font-bold text-white font-poppins mr-10 ">Sign up to</p>
                        <p className="text-4xl font-bold text-white font-poppins mr-10 ">start listening</p>
                    </div>

                    <div className="w-full h-[1px] bg-[#333333]"></div>

                    <div className="w-3/4 flex flex-col gap-1 my-2 items-center justify-center">
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {
                            previewImage ? (
                                <img src={previewImage} className="w-20 h-20 rounded-full m-auto" />
                            ) : (
                                <img src="https://robohash.org/usernam" className="w-20 h-20 rounded-full border-2 border-gray-200 m-auto cursor-pointer" />
                            )
                        }
                    </label>
                    <input 
                        type="file" 
                        name="image_uploads"
                        id="image_uploads" 
                        accept=".jpg, .jpeg, .png, .svg, webp" 
                        className="hidden"
                        onChange={getImage} 
                        />
                    </div>
                

                    <div className="w-3/4 flex flex-col gap-2">
                        <p className="text-md font-medium text-white">Username</p>
                        <Input 
                            type="text" 
                            placeholder="Enter username" 
                            onChange={handleInput} 
                            value={signupValues.username} 
                            name="username" 
                            ref={usernameRef}
                            className="w-full bg-transparent text-md font-medium text-white placeholder-zinc-500 cursor-pointer outline-none border border-gray-400 rounded-md py-3 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white " 
                            checkOnBlur = {handleValidateUsername}
                            />
                    </div>

                    <div className="w-3/4 flex flex-col gap-2">
                        <p className="text-md font-medium text-white">Email</p>
                        <Input 
                            type="email" 
                            placeholder="Enter your email" 
                            onChange={handleInput} 
                            value={signupValues.email} 
                            name="email" 
                            ref={emailRef}
                            className="w-full bg-transparent text-md font-medium text-white placeholder-zinc-500 cursor-pointer outline-none border border-gray-400 rounded-md py-3 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white " 
                            checkOnBlur = {handleValidateEmail}
                            />
                    </div>

                    <div className="w-3/4 flex flex-col gap-2 relative">
                        <p className="text-md font-medium text-white">Password</p>
                        <Input 
                            //type={show ? "text" : "password"} 
                            type="password"
                            placeholder="Enter your Password" 
                            onChange={handleInput} 
                            value={signupValues.password} 
                            name="password" 
                            ref={passwordRef}
                            className="w-full bg-transparent text-md font-medium text-white placeholder-zinc-500 cursor-pointer outline-none border border-gray-400 rounded-md py-3 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white " 
                            checkOnBlur = {handleValidatePassword}
                            />  
                    </div>

                    <div className="w-3/4 flex items-center justify-center mt-3">
                        <Button type="submit" text="Sign up" className="w-full bg-green-500 text-md text-zinc-900 font-bold rounded-3xl py-3 px-3 hover:scale-105 hover:bg-[#2BE457] transition duration-150 will-change-transform" />
                    </div>

                    <div className="w-full h-[1px] bg-[#333333] mt-2"></div>

                    <div className="w-full flex items-center justify-center gap-2">
                        <p className="text-md font-medium text-gray-400">Already have account?</p>
                        <Link to="/login" className="text-white  cursor-pointer underline underline-offset-1 transition hover:text-green-500">Login here</Link>
                    </div>


                </form>
            </div>
        </div>
      </GradientWrapper>
    </>
  )
}

export default Signup