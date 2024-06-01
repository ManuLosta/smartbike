import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import MqttHandler from './mqtt/mqtt_handler.js'
import { router } from './routes/session.route.js'

const mqtt_handle = new MqttHandler()
mqtt_handle.connect()

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}:27017/smartbike`
        )
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error.message)
    }

    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}

start()
