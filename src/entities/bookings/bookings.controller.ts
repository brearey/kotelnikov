import {type Request, type Response} from 'express'
import { BookingsModel } from './bookings.model'
import { ApiResponse, Booking } from '../../types/app-types'

export const BookingsController = {
	getAll: async (req: Request, res: Response) => {
		const bookings: Booking[] | unknown = await BookingsModel.getAll()
		const response: ApiResponse = {
			success: true,
			message: '',
			data: bookings ? bookings as Booking[] : null,
			errors: [],
		}
		res.json(response)
	},
}
