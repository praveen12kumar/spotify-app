import uploadOnCloudinary from "../config/cloudinary-config.js";
import { SongRepository } from "../repository/index.js";
import {UserRepository} from "../repository/index.js"
import {AlbumRepository} from "../repository/index.js";


class SongService{

    constructor(){
        this.songRepository = new SongRepository();
        this.userRepository = new UserRepository();
        this.albumRepository = new AlbumRepository();
    }

    async createSong(data){
        const {title, artist, duration, albumId, localSongPath, localThumbnailPath } = data;
        
        try {
            const song = await this.songRepository.songByTitle(data.title);
        
        if(song){
            throw new Error("Song already exists");
        }

        if(!localSongPath || !localThumbnailPath){
            throw{
                message:"Song and thumbnail is required",
                success: false,
            }
        }

        const thumbnail = await uploadOnCloudinary(localThumbnailPath, "image");
        //console.log("thumbnail Cloudinary", thumbnail);
        if(!thumbnail){
            throw{
                message:"Thumbnail upload failed",
                success: false,
            }
        }

        const songUrl = await uploadOnCloudinary(localSongPath, "audio");
        //console.log("Song Cloudinary", songUrl);

        if(!songUrl){
            throw{
                message:"Song upload failed",
                success: false,
            }
        }

        const newSong = {
            title,
            artist,
            duration,
            albumId: albumId || null,
            songUrl: songUrl?.secure_url,
            thumbnail: thumbnail?.secure_url
        }

        const songResult = await this.songRepository.create(newSong);

        // if song belong to an album update album's songs array
        if(albumId){
            await this.albumRepository.addSongToAlbum(albumId, songResult._id);
        }


        //console.log(songResult)
        return songResult;
        } catch (error) {
            throw{
                message: error.message,
                success: false
            }
        }
    }

    //----------Delete Song-----------------


    async deleteSong(songId){
       try {
            const song = await this.songRepository.get(songId);
            if(!song){
                throw{
                    message:"Song not found",
                    success: false,
                }
            }
            
            // check if song belongs to an album and remove song from album's songs array
            if(song.albumId){
                await this.albumRepository.removeSongFromAlbum(song.albumId, songId);
            }

            const deletedSong = await this.songRepository.destroy(songId);
            return deletedSong;
            }
        catch (error) {
            
       }
    }

    //--------------getALlSOngs-----------------

    async getAllSongs(){
        const songs = await this.songRepository.getSongs();
        return songs
    }


    //----------Get featured songs

    async getFeaturedSongs(){
        try {
            const songs = await this.songRepository.getFeaturedSongsRepo();
            return songs
        } catch (error) {
            throw error
        }
    }

    async getTrendingSongs(){
        try {
            const songs = await this.songRepository.getTrendingSongsRepo();
            return songs
        } catch (error) {
            
        }
    }
































    async getAllSongsOfArtist(artistId){
       
        const artist = await this.userRepository.get(artistId);        
        if(!artist){
            throw new Error("Artist not found");
        }
        const songs = await this.songRepository.songByArtist(artistId);
        return songs
    }


    async getSongByName(name){
        const song = await this.songRepository.songByTitle(name);
        return song
    }
}


export default SongService;