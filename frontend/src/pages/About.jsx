import Navbar from "../components/organims/Navbar";
function AboutUs(){

    return(
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row  items-center">
           <div className="absolute top-0 left-0 w-full h-16">
                <Navbar/>
            </div>
           
           <div className="w-full px-4 md:w-2/4 py-32  flex flex-col gap-4">
            <h1 className="text-4xl font-bold font-[poppins]">About Us</h1>
            <p className="text-md md:text-lg font-[nunito] leading-9">
            With Spotify, it’s easy to find the right music or podcast for every moment – on your phone, your computer, your tablet and more.
            <br />
            There are millions of tracks and episodes on Spotify. So whether you’re behind the wheel, working out, partying or relaxing, the right music or podcast is always at your fingertips. Choose what you want to listen to, or let Spotify surprise you.
            <br />
            You can also browse through the collections of friends, artists, and celebrities, or create a radio station and just sit back.
                <br />
            Soundtrack your life with Spotify. Subscribe or listen for free.
            </p>
           </div>

           <div className="w-full md:w-2/4 px-4 py-20  flex flex-col gap-4 items-center ">
                <h1 className="text-3xl font-bold font-[poppins]">Spotify HQ</h1>
                <div className="w-full text-md font-[nunito] text-center flex flex-col items-center justify-items-start ">
                    <p>Jet Airways - Godrej</p>
                    <p>1st Floor, Unit 1 and 2,</p>
                    <p>Plot C-68, G Block,</p>
                    <p>Bandra Kurla</p>
                    <p>Complex, Bandra East,</p>
                    <p>Mumbai Suburban</p>
                    <p>400051</p>
                    <p>Maharashtra</p>
                </div>
           </div>
        </div>
    )
}

export default AboutUs;