import express from "express"
import mongoose from "mongoose"
import MqttHandler from "./mqtt_handler.js";

const mqtt_handle = new MqttHandler();
mqtt_handle.connect()

const app = express()
app.use(express.json())

app.get("/", (_req, res) => {
    res.json("hola")
})

app.listen(3000, () => {
    console.log(`Server started at ${3000}`);
})