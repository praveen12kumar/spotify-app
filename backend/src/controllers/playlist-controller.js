import { PlaylistServices } from "../services/index.js";

const playlistServices = new PlaylistServices();


export const createPlaylist = async (req, res) => {
    const currentUser = req.user;
    console.log("currentUser",currentUser);
    const {name, thumbnail, songs} = req.body;
    try {
        const playlist = await playlistServices.createPlaylist({name, thumbnail, songs, owner: currentUser._id, collaborators: []});

        return res.status(200).json({
            success: true,
            data: playlist,
            message: "Playlist created successfully",
            err:{}
        })
    } catch (error) {
        if(error.message === "All fields are required") {
            return res.status(403).json({
                success:false,
                data:{},
                message: "All fields are required",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err: error
            })   
        }
    }
}


export const findPlaylistById = async (req, res) => {
    const playlistId = req.params.playlistId;
    try {
        const playlist = await playlistServices.getPlaylistById(playlistId);
        return res.status(200).json({
            success: true,
            data: playlist,
            message: "Playlist found successfully",
            err:{}
        })
    } catch (error) {
        if(error.message === "Playlist not found") {
            return res.status(404).json({
                success:false,
                data:{},
                message: "Playlist not found",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err: error
           })  
        } 
    }
}



export const findAllPlaylistByArtist = async (req, res) => {
    const artistId = req.params.artistId;
    try {
        const playlist = await playlistServices.getAllPlaylistOfArtist(artistId);
        return res.status(200).json({
            success: true,
            data: playlist,
            message: "Playlist found successfully",
            err:{}
        })
    } catch (error) {
        if(error.message === "Artist not found") {
            return res.status(404).json({
                success:false,
                data:{},
                message: "Artist not found",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err: error
            })   
        }
    }
}


export const addSongToPlaylist = async(req, res)=>{
    const {playlistId, songId} = req.body;
    const userId = req.user._id;
    try {
        const playlist = await playlistServices.addSongToPlaylist({playlistId, songId, userId});
        return res.status(200).json({
            success: true,
            data: playlist,
            message: "Song added to playlist successfully",
            err:{}
        })
    } catch (error) {
        if(error.message === "You are not authorized to add song to this playlist") {
            return res.status(403).json({
                success:false,
                data:{},
                message: "You are not authorized to add song to this playlist",
                err: error.message
            })
        }
        else if(error.message === "Playlist not found" || error.message === "Song not found") {
            return res.status(404).json({
                success:false,
                data:{},
                message: "Playlist or Song not found",
                err: error.message
            })
        }
        else if(error.message === "Song already added to playlist") {
            return res.status(400).json({
                success:false,   
                data:{},
                message: "Song already added to playlist",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err: error
           })   
        }
    }
}