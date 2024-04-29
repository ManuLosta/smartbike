import mongoose from "mongoose";
const { Schema } = mongoose;

const sessionSchema = new Schema({
    start_time: { type: Date, default: Date.now },
    end_time: Date,
    velocity: [Number],
    distance: [Number],
})

export default mongoose.model("Session", sessionSchema);
