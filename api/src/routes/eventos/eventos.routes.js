const { Router } = require('express') 
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent, addToFavorite, removeFavorite } = require('../../controllers/events.controller.js') 
const authJWT = require('../../middlewares/authJWT.js')

const router = Router()

router.get('/', getEvents)
router.get('/:eventId', getEventById)
router.post('/:id', [authJWT.verifyToken], addToFavorite)
router.post('/', [authJWT.verifyToken, authJWT.isNormalUser], createEvent)
router.put('/:id', [authJWT.verifyToken, authJWT.isNormalUser], updateEvent)
router.delete('/:id', [authJWT.verifyToken, authJWT.isNormalUser], deleteEvent)
router.put('/:id', [authJWT.verifyToken], addToFavorite)
router.put('/:id', [authJWT.verifyToken], removeFavorite)

module.exports =  router