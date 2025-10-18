import { type Request, type Response } from 'express'
import { BookingsModel } from './bookings.model'
import { ApiResponse, ApiError, Booking } from '../../types/app-types'

export const BookingsController = {
	create: async (req: Request, res: Response) => {
		try {
			const { event_id, user_id } = req.body
			if (!event_id || !user_id) {
				const error: ApiError = {
					name: 'Params error',
					message: 'Params event_id and user_id required',
				}
				res.status(400).json(error)
			}

			const booking: Booking = { event_id, user_id }
			const createdBooking = await BookingsModel.create(booking)
			const response: ApiResponse = {
				success: true,
				message: 'Booking created successful',
				data: createdBooking ? [(createdBooking as Booking)] : null,
				errors: [],
			}
			res.status(201).json(response)
		} catch(e) {
			if (e instanceof Error) logger.error(e)
				console.error(e)
			return e
		}
	},
	getAll: async (req: Request, res: Response) => {
		const bookings: Booking[] | unknown = await BookingsModel.getAll()
		const response: ApiResponse = {
			success: true,
			message: '',
			data: bookings ? (bookings as Booking[]) : null,
			errors: [],
		}
		res.status(200).json(response)
	},
}
