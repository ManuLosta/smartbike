import mongoose from 'mongoose'
const { Schema } = mongoose

const locationSchema = new Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now },
})

export default mongoose.model('Location', locationSchema)
