import { config } from 'dotenv'
config() // dotenv
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { ApiResponse, ApiError, Event, Booking } from './types/app-types'
import { logger } from './utils/logger'

const app: Application = express()
const PORT = process.env.SERVER_PORT || 5000

app.use(bodyParser.json())

app.get('/api/health', logger.query, (req, res) => {
	const error: ApiError = {
		name: 'Backend error',
		message: 'test error'
	}
	const event: Event = {
		id: 20, name: 'Concert in Yakutsk', total_seats: 100
	}
	const response: ApiResponse = {
		success: false,
		message: 'fail',
		data: [event],
		errors: [error, error]
	}
	res.status(500).json(response)
})

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
