import Album from "../models/ablum.model.js";
import CrudRepository from "./crud-repository.js";


class AlbumRepository extends CrudRepository{
    constructor() {
        super(Album);
    }

    async addSongToAlbum(albumId, songId){
        // console.log("albumId", albumId);
        // console.log("songId", songId);
        try {
            const response = await Album.findByIdAndUpdate(albumId, {
                $push:{
                    songs: songId
                }
            })

            //console.log("response", response);

        } catch (error) {
            throw error
        }
    }

    async removeSongFromAlbum(albumId, songId){
        try {
            await Album.findByIdAndUpdate(albumId, {
                $pull:{
                    songs:songId
                }
            })
        } catch (error) {
            throw error
        }
    }

    async deleteAlbum(albumId){
        try {
            const result =  await Album.findByIdAndDelete(albumId)
            return result;
        } catch (error) {
            throw error
        }
    }

    async getAlbumDetailsRepo(albumId) {
        try {
            const response = await Album.findById(albumId).populate("songs");
            return response;
        } catch (error) {
            
        }
    }

    

    


}

export default AlbumRepository;