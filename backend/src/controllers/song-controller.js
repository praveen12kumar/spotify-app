import { SongService } from "../services/index.js";

const songService = new SongService();  

export const songCreate = async (req, res) => {

    const localThumbnailPath = req.files?.thumbnail[0]?.path;
    const localSongPath = req.files?.song[0]?.path;

    const {title, artist, albumId, duration} = req.body;
    try {
        const song = await songService.createSong({title, artist, duration, albumId, localSongPath, localThumbnailPath});
        
        return res.status(200).json({
            success: true,
            data: song,
            message: "Song created successfully",
            err:{}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}
//-------------Delete Song
export const deleteSong = async(req, res) =>{
    try {
        const song = await songService.deleteSong(req.params.songId);
        return res.status(200).json({
            success: true,
            data: song,
            message: "Song deleted successfully",
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}


//------------getAllSongs----------------


export const getAllSongs = async(req, res)=>{
    try {
        const songs = await songService.getAllSongs();
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Songs found successfully",
            err:{}
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



// Hold to test
export const getFeaturedSongs = async(req, res)=>{
    try {
        const songs = await songService.getFeaturedSongs();
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Songs found successfully",
            err:{}
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

export const getTrendingSongs = async(req, res)=>{
    try {
        const songs = await songService.getTrendingSongs();
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Songs found successfully",
            err:{}
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

export const getMadeForYouSongs = async(req, res)=>{
    try {
        const songs = await songService.getFeaturedSongs();
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Songs found successfully",
            err:{}
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



export const allSongsOfArtist = async(req, res) => {
    try {
        const songs = await songService.getAllSongsOfArtist(req.params.artistId);
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Songs found successfully",
            err: {}
        });
    } catch (error) {
        if (error.message === "Artist not found") {
            return res.status(404).json({
                success: false,
                data: {},
                message: error.message,
                err: error
            });
        } else {
            return res.status(500).json({
                success: false,
                data: {},
                message: "Something went wrong",
                err: error
            });
        }
    }
};


export const getSongByTitle = async(req, res)=>{
    try {
        const songs = await songService.getSongByName(req.params.title);
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Song found successfully",
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}
