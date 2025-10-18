import { config } from 'dotenv'
config() // dotenv
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { BookingsController } from './entities/bookings/bookings.controller'
import { EventsController } from './entities/events/events.controller'
import { ApiResponse } from './types/app-types'
import { logger } from './utils/logger'

const app: Application = express()
const PORT = process.env.SERVER_PORT || 5000

app.use(bodyParser.json())

app.get('/api/health', logger.query, (req, res) => {
	const response: ApiResponse = {
		success: true,
		message: 'ok',
		data: null,
		errors: [],
	}
	res.status(200).json(response)
})

app.post('/api/bookings/reserve', BookingsController.getAll)
app.get('/api/events', EventsController.getAll)

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
