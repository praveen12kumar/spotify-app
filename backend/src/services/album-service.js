import uploadOnCloudinary from "../config/cloudinary-config.js";
import AlbumRepository from "../repository/album-repository.js";
import SongRepository from "../repository/song-repository.js";

class AlbumService {
    constructor() {
        this.albumRepository = new AlbumRepository();
        this.songRepository = new SongRepository();
    }


    async createAlbum(data) {
        try {
            const {title, artist, releaseYear, localThumbnailPath} = data;
            if(!title || !artist || !releaseYear){
                throw {
                    message:"All fields are required",
                    success: false
                }
            }

            if(!localThumbnailPath){
                throw {
                    message:"Thumbnail is required",
                    success: false
                }
            }

            const result = await uploadOnCloudinary(localThumbnailPath, "image");

            if(!result){
                throw {
                    message:"Thumbnail upload failed",
                    success: false
                }
            }

            const album = await this.albumRepository.create({
                title,
                artist,
                releaseYear,
                thumbnail: result?.secure_url
            })

            //console.log("album", album);
            

            return album;
        } catch (error) {
            throw{
                message:error.message,
                success: false
            }
        }
    }

    async deleteAlbum(albumId) {
        try {
            // to delete an album, first we need to delete the songs associated with it
            const result = await this.songRepository.deleteSongs(albumId)
            
            if(!result.acknowledged){
                throw{
                    message:"Songs not deleted",
                    success: false
                }
            }
            // then delete the album
            const album = await this.albumRepository.deleteAlbum(albumId);
        
            return album
        } catch (error) {
            throw error
        }
    }

    async getAllAlbums() {
        try {
            const albums = await this.albumRepository.getAll();
            return albums;
        } catch (error) {
            throw error;
        }
    }

    async getAlbumDetails(albumId) {
        try {
            const ablum = await this.albumRepository.getAlbumDetailsRepo(albumId)
            //console.log("album",ablum);

            if(!ablum){
                throw{
                    message:"Album not found",
                    success: false
                }
            }
            return ablum;

        } catch (error) {
            throw error
        }
    }

   

}

export default AlbumService;