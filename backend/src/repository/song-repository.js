import Song from "../models/song.model.js";
import CrudRepository from "./crud-repository.js";


class SongRepository extends CrudRepository{

    constructor() {
        super(Song);
    }


    async songByArtist(id){
        const songs = await Song.find({artists: id});
        return songs
    }

    async songByTitle(title){
        
        const songs = await Song.findOne({title});
        //console.log("songs", songs);
        return songs
    }

    async deleteSongs(albumId){
        const result = await Song.deleteMany({albumId});
        return result
    }

    async getSongs(){
        const songs = await Song.find().sort({createdAt: -1});
        return songs
    }

    async getFeaturedSongsRepo(){
        const songs = await Song.aggregate([
            {$sample: {size: 6}},
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    thumbnail:1,
                    songUrl:1
                }
            }
        ])

        return songs;
    }

    async getTrendingSongsRepo(){
        const songs = await Song.aggregate([
            {
                $sample:{size: 4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    thumbnail:1,
                    songUrl:1
                }
            }
        ])

        return songs;
    }


};

export default SongRepository;