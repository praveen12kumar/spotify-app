import express from 'express';
import {signup, 
        login, 
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
} from "../../controllers/auth-controller.js";

import { getUserDetails, 
        findUserById,
        updateUserProfile,
        getAllUsers,

} from '../../controllers/user-controller.js';

import { songCreate, 
        allSongsOfArtist,
        getSongByTitle,
        deleteSong,
        getAllSongs,
        getFeaturedSongs,
        getTrendingSongs,
        getMadeForYouSongs,

    } from '../../controllers/song-controller.js';

import { createPlaylist,   
        findPlaylistById,
        findAllPlaylistByArtist,
        addSongToPlaylist
 } from '../../controllers/playlist-controller.js';



 //-----------album------------

 import {
        createAlbum,
        deleteAlbum,
        getAllAlbums,
        getAlbumDetails
 } from "../../controllers/album-controller.js"


import { getAllStats } from '../../controllers/stat-controller.js';


import {authenticate} from "../../middlewares/authenticate.js";
import {upload} from "../../middlewares/multer-middlewarer.js";
import { requireAdmin } from '../../middlewares/authAdmin.js';



const router = express.Router();

// -------auth-----------

router.post('/signup', upload.fields([
        {name:"avatar", maxCount:1}
]), signup);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/logout', logout);
router.post('/auth/forgot-password', forgotPassword);
router.post('/reset-password/:token',  resetPassword);


//--------------user----------------------

router.get("/users", authenticate, getUserDetails);

router.get('/users/all', authenticate, requireAdmin, getAllUsers);

router.put('/users/update-profile',authenticate, upload.single('avatar'), updateUserProfile);

router.get('/users/:id', authenticate, findUserById);

// -------song-----------

router.post('/admin/songs/add',upload.fields([
        {name: 'song', maxCount: 1},
        {name: 'thumbnail', maxCount: 1},
]),   authenticate, requireAdmin, songCreate);
router.delete('/admin/songs/:songId', authenticate, requireAdmin,  deleteSong);

router.get('/songs/all', authenticate, getAllSongs);
router.get('/songs/featured', getFeaturedSongs);
router.get('/songs/trending', getTrendingSongs);
router.get('/songs/made-for-you', authenticate, getMadeForYouSongs);

router.get('/artists/:artistId', authenticate, allSongsOfArtist);
router.get('/songs/:title', authenticate, getSongByTitle);





//-------------------Album -----------------------

router.post('/admin/albums/add', authenticate, requireAdmin, upload.single('thumbnail')             , createAlbum)

router.delete('/admin/albums/:albumId', authenticate, requireAdmin, deleteAlbum);

router.get('/albums/all',  getAllAlbums);

router.get('/albums/:albumId', getAlbumDetails);


//------------------Stats------------------------


router.get('/admin/stats', authenticate, requireAdmin, getAllStats);




// -------playlist-----------

router.post('/playlists/create', authenticate, createPlaylist);
router.get('/playlists/:playlistId', authenticate, findPlaylistById);
router.get('/playlists/artist/:artistId', authenticate, findAllPlaylistByArtist);
router.post('/playlists/add/song', authenticate, addSongToPlaylist);


    
export default router;