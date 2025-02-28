import StatCard from "./StatCard";
import { MdQueueMusic } from "react-icons/md";
import {LuLibrary, LuUsers, LuUser } from "react-icons/lu";
import { getStats } from "../../redux/slices/admin-slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


function DashboardStats(){

    const dispatch = useDispatch();

    const {totalAlbums, totalArtists, totalSongs, totalUsers} = useSelector((state) => state.admin)

    useEffect(()=>{
        dispatch(getStats())
    },[dispatch]);

    return (
         <div className="max-w-7xl mx-auto w-full h-20 flex flex-wrap gap-16 items-center justify-center">
                             <StatCard 
                                icon={<MdQueueMusic className="w-5 h-5 text-green-200"/>}
                                title="Total Songs"
                                count={totalSongs}
                                className="bg-green-800"
                            />
                            <StatCard 
                                icon={<LuLibrary className="w-5 h-5 text-purple-200"/>}
                                title="Total Albums"
                                count={totalAlbums}
                                className="bg-purple-800"
                            />
                            <StatCard 
                                icon={<LuUsers className="w-5 h-5 text-orange-200"/>}
                                title="Total Atists"
                                count={totalArtists}
                                className="bg-orange-800"
                            />
                            <StatCard 
                                icon={<LuUser className="w-5 h-5 text-sky-200"/>}
                                title="Total Users"
                                count={totalUsers}
                                className="bg-sky-800"
                            />
                        </div>
    )
};

export default DashboardStats