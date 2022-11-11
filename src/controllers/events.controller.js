const { findByIdAndUpdate } = require('../schema/eventos.schema.js')
const Events = require('../schema/eventos.schema.js') 
const Users = require('../schema/users.schema.js')

const getEvents = async(req, res, next) => {
    try {
        const allEvents = await Events.find()
        res.json({
            events: allEvents
        })
    } catch (err) {
        res.json({
            error: err
        })
    }
}

const getEventById = async(req, res) => {   
    try {
        const event = await Events.find({publisher_id: req.params.eventId})
        res.json({
            event: event
        })
    }
    catch (err) {
        res.json({
            error: err
        })
    }
}

const createEvent = async(req, res, next) => {
    const {publisher_id, title, category, description} = req.body
    try {
        const registerEvent = new Events({publisher_id, title, category, description})
        await registerEvent.save()
        res.status(201).json({evento: registerEvent})
    } catch (error) {
        res.json({
            error
        })
    }
}

const updateEvent = async(req, res) => {
    const user = req.user
    // El user tendria que ser igual al publisher_id para poder modificarlo
    const { title, category, description, image, date} = req.body
    
    try {
        if (Users.findById(req.params.eventId) === Events.find({publisher_id: req.params.eventId}) ) {
            const updateEvent = findByIdAndUpdate({_id: req.params.eventId}, {title, category, description, image, date}, {
                new: true
            })
            res.status(204).json(updateEvent)
        }
        res.status(401).json({message: "You are not authorized to update this event"})
    } catch (error) {
        res.json({
            error
        })
    }
}

const deleteEvent = async(req, res) => {

}



module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}