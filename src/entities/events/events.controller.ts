import {type Request, type Response} from 'express'
import { EventsModel } from './events.model'
import { ApiResponse, Event } from '../../types/app-types'

export const EventsController = {
	getAll: async (req: Request, res: Response) => {
		const events: Event[] | unknown = await EventsModel.findAll()
		const response: ApiResponse = {
			success: true,
			message: '',
			data: events ? events as Event[] : null,
			errors: [],
		}
		res.json(response)
	},
}
