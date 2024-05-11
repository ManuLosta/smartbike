import mongoose from 'mongoose'
const { Schema } = mongoose

const velocitySchema = new Schema({
    velocity: Number,
    timestamp: { type: Date, default: Date.now },
})

export default mongoose.model('Velocity', velocitySchema)
