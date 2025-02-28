import { PlaylistRepository } from "../repository/index.js";
import {SongRepository} from "../repository/index.js";
import {UserRepository} from "../repository/index.js";


class PlaylistServices {

    constructor() {
        this.playlistRepository = new PlaylistRepository();
        this.songRepository = new SongRepository();
        this.userRepository = new UserRepository();
    }

    async createPlaylist(data) {
        const {name, thumbnail, songs} = data;
        
        if(!name || !thumbnail || !songs) {
            throw new Error("All fields are required");
        }
        const playlists = await this.playlistRepository.create(data);
       
        return playlists;
    }

        async getPlaylistById(id){
        const playlist = await this.playlistRepository.get(id);
        if(!playlist){
            throw new Error("Playlist not found");
        }
        else return playlist;
        }


        async getAllPlaylistOfArtist(artistId){
        const artist = await this.userRepository.get(artistId);
        console.log("artist",artist);
        if(!artist){
            throw new Error("Artist not found");
        }
        const playlist = await this.playlistRepository.allPlaylistByArtist(artistId);
        return playlist;
        }   

        async addSongToPlaylist(data){
            const {playlistId, songId, userId} = data;
  
            const playlist = await this.playlistRepository.get(playlistId);
            if(!playlist){
                throw new Error("Playlist not found");
            }
            if(playlist.owner.toString() !== userId.toString() && !playlist.collaborators.includes(userId)){
                throw new Error("You are not authorized to add song to this playlist");
            }

            const song = await this.songRepository.get(songId);
            if(!song){
                throw new Error("Song not found");
            }

            if(playlist.songs.includes(songId)){
                throw new Error("Song already added to playlist");
            }
            else{
            playlist.songs.push(songId);
            await playlist.save();
            }
            return playlist
        }
}




export default PlaylistServices;