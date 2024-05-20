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

export const appendSpeed = async (speed) => {
    const session = await Session.findOne({ isActive: true }).exec()
    const velocity = Velocity({ velocity: speed })

    if (!session) throw new Error('No active sesion')

    session.velocity.push(velocity)
    await session.save()
}

export const appendLocation = async (location) => {
    const data = JSON.parse(location)
    const session = await Session.findOne({ isActive: true }).exec()
    const newLocation = Location({ latitude: data.lat, longitude: data.lon })

    if (!session) throw new Error('No active session')

    session.location.push(newLocation)
    await session.save()
}