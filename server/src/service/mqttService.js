import Session from '../models/session.js'
import Velocity from '../models/velocity.js'
import Location from '../models/location.js'

export const createSession = async () => {
    await Session.findOneAndUpdate(
        { isActive: true },
        { $set: { isActive: false } },
        { new: false },
    )

    const newSession = new Session()
    await newSession.save()
}

export const endSession = async () => {
    await Session.findOneAndUpdate(
        { isActive: true },
        { $set: { isActive: false } },
        { new: false },
    )
}

export const appendData = async (dataJson) => {
    const data = JSON.parse(dataJson)
    const session = await Session.findOne({ isActive: true }).exec()

    const location = Location({ latitude: data.loc.lat, longitude: data.loc.lng })
    const speed = Velocity({ velocity: data.speed })

    if (!session) throw new Error('No active Session')

    session.velocity.push(speed)
    session.location.push(location)
    session.distance = data.distance
    session.altitude = data.altitude

    await session.save()
}
