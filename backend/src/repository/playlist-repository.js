import Playlist from "../models/playlist.model.js";
import CrudRepository from "./crud-repository.js";


class PlaylistRepository extends CrudRepository {
    constructor() {
        super(Playlist);
    }
    

    async allPlaylistByArtist(id) {
        const playlists = await Playlist.find({ owner: id });
        return playlists
    }
}

export default PlaylistRepository;