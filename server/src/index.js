import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import MqttHandler from './mqtt/mqtt_handler.js'

const mqtt_handle = new MqttHandler()
mqtt_handle.connect()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/on', (_req, res) => {
    mqtt_handle.publish('smartbike/inel00/led/toggle', '1')
    res.json('ON')
})

const start = async () => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/smartbike?authSource=admin',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
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
