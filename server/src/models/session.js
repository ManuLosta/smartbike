import mongoose from 'mongoose'
import Velocity from './velocity.js'
import Location from "./location.js";
const { Schema } = mongoose

const sessionSchema = new Schema({
    name: String,
    start_time: { type: Date, default: Date.now },
    end_time: Date,
    velocity: [Velocity.schema],
    location: [Location.schema],
    distance: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    altitude: Number,
    p_altitude: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
})

export default mongoose.model('Session', sessionSchema)
