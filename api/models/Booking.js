import mongoose, { Schema } from "mongoose"

const bookingSchema = new Schema({
    place: {type:mongoose.Schema.Types.ObjectId,required:true},
    checkIn:{type:Date, required:true},
    checkOut:{type:Date,required:true},
    name:{type:String,required:true},
    phone:String,
    price:Number,
});

const BookingModel = mongoose.model('Booking',bookingSchema);

export default BookingModel;



