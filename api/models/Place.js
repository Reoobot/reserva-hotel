import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    extraInfo:String,
    perks:[String],
    checkIn:Number,
    checOut:Number,
    maxGuests:Number,
    price:Number,
})

const PlaceModel = mongoose.model('Place', PlaceSchema)

export default PlaceModel;