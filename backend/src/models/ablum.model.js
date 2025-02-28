import mongoose, {Schema} from "mongoose";


const albumSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    artist:{
        type:String,
        required:true
    },
    thumbnail:{
        type: String,
        required: true
    },
    releaseYear:{
        type: Number,
        required: true
    },
    songs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Song"
        }
    ],
},
    {
        timestamps: true
    }
);

const Album = mongoose.model("Album", albumSchema);

export default Album