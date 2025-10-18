import { type Request, type Response } from 'express'
import { BookingsModel } from './bookings.model'
import { EventsModel } from '../events/events.model'
import { logger } from '../../utils/logger'
import { ApiResponse, Booking } from '../../types/app-types'

export const BookingsController = {
	create: async (req: Request, res: Response) => {
		try {
			const event_id = req.body?.event_id
			const user_id = req.body?.user_id
			if (!event_id || !user_id) {
				throw new Error('Params event_id and user_id required')
			}

			if (typeof event_id !== 'number' || typeof user_id !== 'string') {
				throw new Error('event_id and user_id must be a number and string')
			}

			const booking: Booking = { event_id, user_id }
			const foundEvent = await EventsModel.findOne(event_id)
			if (!foundEvent) throw new Error(`Event with ID = ${event_id} was not found`)
			
			const createdBooking = await BookingsModel.create(booking)
			const response: ApiResponse = {
				success: true,
				message: 'Booking created successful',
				data: createdBooking ? [createdBooking as Booking] : null,
				errors: [],
			}
			res.status(201).json(response)
		} catch (e) {
			if (e instanceof Error) {
				logger.error(e)
				res.status(400).json({
					success: false,
					message: e.message,
					data: null,
					errors: [e],
				})
			}
			else {
				console.error(e)
				res.status(500).json(e)
			}
		}
	},
	getAll: async (req: Request, res: Response) => {
		try {
			const user_id: string = String(req.query?.user_id)
			if (!user_id) throw new Error('user_id is required')

			const bookings: Booking[] | unknown = await BookingsModel.getAll(user_id)
			const response: ApiResponse = {
				success: true,
				message: '',
				data: bookings ? (bookings as Booking[]) : null,
				errors: [],
			}
			res.status(200).json(response)
		} catch (e) {
			if (e instanceof Error) {
				logger.error(e)
				res.status(400).json({
					success: false,
					message: e.message,
					data: null,
					errors: [e],
				})
			}
			else {
				console.error(e)
				res.status(500).json(e)
			}
		}
	},
}
