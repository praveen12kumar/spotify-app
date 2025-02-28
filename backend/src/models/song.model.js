import mongoose,{Schema} from "mongoose";

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist:{
        type:String,
        required:true,
        },
    duration:{
        type: Number,
        required: true
    },
    songUrl: {
        type: String,
    },
    thumbnail: {
        type: String,
        
    },
    albumId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required:false,
    }
},
{
    timestamps: true
});

const Song = mongoose.model("Song", songSchema);
export default Song;