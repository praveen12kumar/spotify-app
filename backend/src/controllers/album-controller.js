import { AlbumService } from "../services/index.js";

const albumService = new AlbumService();

export const createAlbum = async (req, res) => {
    try {
        const {title, artist, releaseYear} = req.body;
        
        const localThumbnailPath = req.file?.path;
        //console.log(localThumbnailPath);
        
        const album = await albumService.createAlbum({title, artist, releaseYear, localThumbnailPath});
        
        return res.status(200).json({
            success: true,
            data: album,
            message: "Album created successfully",
            err: {}
        });


    } catch (error) {
        console.log("error", error);
        if(error.message === "All fields are required") {
            return res.status(403).json({
                success: false,
                data: {},
                message: "All fields are required",
                err: error.message
            });
        }

        if(error.message === "Thumbnail is required") {
            return res.status(403).json({
                success: false,
                data: {},
                message: "Thumbnail is required",
                err: error.message
            });
        }

        if(error.message === "Thumbnail upload failed") {
            return res.status(403).json({
                success: false,
                data: {},
                message: "Thumbnail upload failed",
                err: error.message
            });
        }
        else{
            return res.status(500).json({
                success: false,
                data: {},
                message: error.message,
                err: error
            });
        }
    }
}


export const deleteAlbum = async (req, res) => {
    try {
        const album = await albumService.deleteAlbum(req.params.albumId);
        
        return res.status(200).json({
            success: true,
            data: album,
            message: "Album deleted successfully",
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        });
    }
}

export const getAllAlbums = async(req, res)=>{
    try {
        const albums = await albumService.getAllAlbums();
        return res.status(200).json({
            success: true,
            data:albums,
            message:"all albums fetched successfully",
            error:{}
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            data:{},
            message:error.message,
            err:error
        })
    }   
}


export const getAlbumDetails = async(req, res)=>{
    try {
        
        const album = await albumService.getAlbumDetails(req.params.albumId);
        return res.status(200).json({
            success: true,
            data:album,
            message:"album details fetched successfully",
            error:{}
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            data:{},
            message:error.message,
            err:error
        })
    }   
}