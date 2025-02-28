
import contact from "../assets/lottie/contact.json";
import Lottie from "lottie-react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";


function Contact() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  return (
    <div id="Contact" className="w-full  bg-slate flex items-center justify-center">
      <div className="max-w-7xl h-full mx-auto flex flex-col items-center py-10">
        <div className="w-full flex flex-col gap-3 items-center p-4">
          <h3 className="text-4xl font-bold font-[roboto] tracking-widest uppercase">
            Contact
          </h3>
          <div className="w-20 h-1 bg-sky-700 rounded-lg"></div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="w-2/3 md:w-1/2  flex items-center justify-center">
            <Lottie animationData={contact} height={400} width={400} />
          </div>
          <div className="w-full h-full md:w-1/2 flex items-center  justify-center">
            <form
              action=""
              method="POST"
              className="w-4/5 h-full flex flex-col items-center justify-center"
            >
              <div className="w-full md:w-2/3 h-24 flex flex-col items-start gap-1">
                <label
                  className="flex items-center gap-2 font-zentry"
                  htmlFor="name"
                >
                  <FaUser className="w-5 h-5 text-sky-900" />
                  Name
                </label>
                <input
                  type="text"
                  className="w-full input cursor-pointer border border-gray-400 px-3 py-2 rounded-md bg-transparent outline-none"
                  placeholder="Enter name"
                  value={formValues.name}
                  name="name"
                  onChange={handleChangeInput}
                />
              </div>

              <div className="w-full  md:w-2/3 h-24 flex flex-col items-start gap-1">
                <label
                  className="flex items-center gap-2 font-zentry"
                  htmlFor="email"
                >
                  <MdEmail className="w-6 h-6 text-sky-900" />
                  Email
                </label>
                <input
                  type="text"
                  className="w-full input border cursor-pointer border-gray-400 px-3 py-2 rounded-md bg-transparent outline-none "
                  placeholder="Enter email"
                  value={formValues.email}
                  name="email"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="w-full md:w-2/3 h-32 flex flex-col items-start gap-1">
                <label
                  className="flex items-center gap-2 font-zentry"
                  htmlFor="message"
                >
                  <FaMessage className="w-5 h-5 text-sky-900" />
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  cols={30}
                  rows={20}
                  placeholder="Hi,"
                  value={formValues.message}
                  onChange={handleChangeInput}
                  className="w-full px-2 pt-2 bg-transparent cursor-pointer border border-gray-400 rounded-lg outline-none resize-none"
                ></textarea>
              </div>
                <button 
                    type="submit"
                    className="w-full md:w-2/3 font-zentry text-white mt-6 py-2 bg-sky-800 rounded-lg hover:bg-sky-700 text-center flex items-center justify-center gap-1"
                >
                    <IoIosSend className="w-5 h-5 text-white"/>
                    Send
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
