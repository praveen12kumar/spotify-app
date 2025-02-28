import { useSelector, useDispatch } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import Button from "../atoms/Button";
import toast from "react-hot-toast";
import Input from "../atoms/Input";
import { updateUserProfile } from "../../redux/slices/auth-slice";


function UserModal({ close }) {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const [edit, setEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.avatar || "");
  
  const [formValues, setFormValues] = useState({
    username: user?.username,
    avatar: user?.avatar || "",
  });

  function getImage(event) {
    event.preventDefault();

    const uploadedImage = event.target.files?.[0];
    if (!uploadedImage) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!validTypes.includes(uploadedImage.type)) {
      toast.error("Invalid file type. Please upload a JPG, PNG, or SVG image.");
      return;
    }

    // Update form values with the file
    setFormValues({
      ...formValues,
      avatar: uploadedImage,
    });

    // Read and preview the uploaded image
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.onload = () => {
      setPreviewImage(fileReader.result);
    };
    fileReader.onerror = () => {
      console.error("Error reading the uploaded image.");
      toast.error("Failed to read the image. Please try again.");
    };
  }

  function removePhoto() {
    setFormValues({
      ...formValues,
      avatar: "",
    });
    setPreviewImage("");
  }

  function handleUpdateUser(){
    //console.log("formValues",formValues);
    dispatch(updateUserProfile(formValues));
    //dispatch(getUserDetails());
    close();
  }

  return (
    <div className="w-[35vw] h-[40vh] bg-[#282828] flex flex-col gap-4 p-5 rounded-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <MdClose
        onClick={close}
        className="w-6 h-6 text-white absolute top-2 right-2 cursor-pointer"
      />
      <h2 className="text-2xl font-bold font-nunito">Profile details</h2>
      <div className="flex items-center gap-4">
        <div className="w-48 h-48 rounded-full relative"
          onMouseEnter={() => setEdit(true)}
          onMouseLeave={() => setEdit(false)}
        >
          <img
            src={previewImage}
            className="border border-zinc-300 w-full h-full rounded-full"
            alt="avatar"
          />
          {edit && (
            <div className="w-full h-full bg-black opacity-80 flex flex-col gap-4 items-center justify-center absolute top-1/2 -translate-y-1/2 rounded-full">
              <label htmlFor="image_uploads" className="cursor-pointer">
                <p
                  className="text-sm font-bold text-green-500 underline underline-offset-2"
                >Choose photo</p>
              </label>
              <input
                type="file"
                name="image_uploads"
                id="image_uploads"
                accept=".jpg, .jpeg, .png, .svg"
                className="hidden z-100"
                onChange={getImage}
              />
              <FiEdit2 className="size-10 text-white" />
              <Button
                type="button"
                text="Remove photo"
                className="text-sm font-bold text-red-500 underline underline-offset-2"
                onClick={removePhoto}
              />
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-4 ">
            <Input 
                type="text" 
                onChange={(e) => setFormValues({...formValues, username: e.target.value})} 
                value={formValues.username} 
                className="w-full bg-[#444444] px-3 py-2 rounded-md text-white font-poppins tracking-wider outline-none"
            />
            <Button 
                type="submit" 
                text="Save" 
                className="w-1/2 bg-green-500 rounded-lg py-2 px-3 text-white font-poppins tracking-wider font-bold hover:scale-105 transition duration-150" 
                onClick={handleUpdateUser}
                />
        </div>
      </div>
    </div>
  );
}

export default UserModal;
