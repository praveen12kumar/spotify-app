import mongoose, {Schema} from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    songs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Song"
        }
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    collaborators:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},
    {
        timestamps: true
    }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist