import { useState } from "react";
import { IoClose } from "react-icons/io5";
import GradientWrapper from "../../components/molecules/GradientWrapper.jsx";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import upload from "../../assets/images/upload.svg";
import Input from "../../components/atoms/Input.jsx";
import Button from "../../components/atoms/Button.jsx";
import { addAlbum } from "../../redux/slices/album-slice.jsx";


function AddAlbumModal({close}){

    const dispatch = useDispatch();
    

    const [formValues, setFormValues] = useState({
        title: "",
        artist: "",
        thumbnail:null,
        releaseYear:0
    });

    const [previewImage, SetPreviewImage] = useState("");
    

    async function handleSubmit(e){
        e.preventDefault();
        console.log("formValues", formValues);
        const {title, artist,releaseYear, thumbnail} = formValues;
        if(!title || !artist || !releaseYear || !thumbnail){
            toast.error("Please fill all the fields");
            return;
        }
        console.log("formValues", formValues);
        const validFormValues = {
            title,
            artist,
            releaseYear,
            thumbnail: thumbnail, // Ensure it's a File
           
        };
        console.log("hello");
        
        await dispatch(addAlbum(validFormValues));
        console.log("hello hi");
        setFormValues({
            title: "",
            artist: "",
            thumbnail:null,
            releaseYear:0
        })
        close();
    }

    function onChangeHandler(e){
        const {value, name} = e.target;
        setFormValues({
            ...formValues,
            [name]:value
        })
    }   

    function getImage(e){
        e.preventDefault();
        const uploadedImage = e.target.files?.[0];
        if(!uploadedImage){
            toast.error("Please select an image");
            return;
        }
        setFormValues({
            ...formValues,
            thumbnail:uploadedImage
        })
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.onload = () => {
            if(fileReader.result){
                SetPreviewImage(fileReader.result.toString());
            }
        }
    }


    const inputStyle = "w-full bg-zinc-900 text-sm font-medium text-white placeholder-zinc-500 cursor-pointer outline-none border border-gray-400 rounded-md py-2 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white" 

    return(
        <div className="w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-lg">
           <GradientWrapper graditientStyles="custom-gradient-gray rounded-lg">
           <div className="w-full h-full p-6 flex flex-col items-center relative">
                <button className="absolute top-4 right-4 ">
                    <IoClose className="w-6 h-6 text-gray-200" onClick={close}/>
                </button>
                <div className="w-full ">
                    <h3 className="text-lg font-semibold font-nunito text-white">
                        Add New Album
                    </h3>
                    <p className="text-xs text-gray-400 font-poppins">Add a new album to your music collection</p>
                </div>

                <form onSubmit={handleSubmit} className="w-[80%] h-full flex flex-col items-center gap-3 mt-4">
                    <div className="w-full p-2 border  border-dashed border-gray-400 rounded-md">
                    <div className="w-2/3 mx-auto p-2 bg-[#333333] rounded-md flex flex-col gap-1 items-center">
                        <label htmlFor="image_uploads" className="cursor-pointer">
                            {
                                previewImage ? (
                                    <img src={previewImage} className="w-full h-32 rounded-md object-cover m-auto" alt="preview" />
                                ):(
                                    <img src={upload} className="w-full h-32 rounded-md object-cover m-auto" alt="preview"/>
                                )
                            }
                        </label>
                        <input
                            type="file"
                            name="image_uploads"
                            id="image_uploads"
                            className="hidden"
                            onChange={getImage}
                            accept=".jpg, .png, .jpeg, .webp, .svg"
                        />
                    </div>
                    </div>
                    <div className="w-full flex flex-col gap-1 justify-start">
                    <p className="text-white text-xs font-poppins">Ablum Title</p>
                    <Input
                        type="text"
                        placeholder="Enter song title"
                        onChange={onChangeHandler}
                        name="title"
                        className={inputStyle}
                    />
                    </div>
                    <div className="w-full flex flex-col gap-1 justify-start">
                    <p className="text-white text-xs font-poppins">Artist</p>
                    <Input
                        type="text"
                        placeholder="Enter song artist"
                        onChange={onChangeHandler}
                        name="artist"
                        className={inputStyle}
                    />
                    </div>
                    <div className="w-full flex flex-col gap-1 justify-start">
                    <p className="text-white text-xs font-poppins">Release Year </p>
                    <Input
                        type="text"
                        placeholder="Enter song release year"
                        onChange={onChangeHandler}
                        name="releaseYear"
                        className={inputStyle}
                    />
                    </div>
                    <div className="w-full flex flex-row items-center justify-end gap-6">
                        <Button
                            type="reset"
                            text="Cancel"
                            className="bg-red-700 hover:bg-red-800 py-2 px-6 rounded-lg text-white font-medium font-nunito border-none transition-all ease-in-out duration-300"
                            onClick={close}
                        />
                        <Button
                            type="submit"
                            text="Submit"
                            className="bg-green-700 hover:bg-green-800 py-2 px-6 rounded-lg text-white font-medium font-nunito border-none transition-all ease-in-out duration-300"
                            />
                    </div>

                </form>

            </div>

           </GradientWrapper>
        </div>
    )
};

export default AddAlbumModal;