import Album from "../models/ablum.model.js"
import Song from "../models/song.model.js"
import User from "../models/user.model.js"



export const getAllStats = async (req, res) => {

    try {
        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            Song.aggregate([
                {
                    $unionWith:{
                        coll:"albums",
                        pipeline:[]
                    }
                },
                {
                    $group:{
                        _id: "$artist",
                    }
                },
                {
                    $count:"count"
                }
            ])
        ])

        return res.status(200).json({
            totalSongs, 
            totalAlbums, 
            totalUsers,
            totalArtists: uniqueArtists[0]?.count || 0
        
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }

}