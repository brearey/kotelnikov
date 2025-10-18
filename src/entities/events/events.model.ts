import prisma from '../../database/prisma'
import { logger } from '../../utils/logger'
import { Event } from '../../types/app-types'

export const EventsModel = {
	findAll: async () => {
		try {
			return await prisma.events.findMany()
		} catch (e) {
			if (e instanceof Error) logger.error(e)
			console.error(e)
			return e
		}
	},
	findOne: async (event_id: number) => {
		try {
			return await prisma.events.findUnique({
				where: {
					id: event_id
				}
			})
		} catch (e) {
			if (e instanceof Error) logger.error(e)
			console.error(e)
			return e
		}
	},
	seed: async () => {
		try {
			const eventsArray: Event[] = [
				{ name: 'Мероприятие 1', total_seats: 5},
				{ name: 'Мероприятие 2', total_seats: 6},
				{ name: 'Мероприятие 3', total_seats: 7},
				{ name: 'Мероприятие 4', total_seats: 8},
			]
			const alreadySeeded = await prisma.events.findFirst({
				where: {
					name: eventsArray[0].name,
				}
			})
			if (alreadySeeded) throw new Error('Already seeded')
			return await prisma.events.createMany({
				data: eventsArray
			})
		} catch (e) {
			if (e instanceof Error) return logger.error(e)
			console.error(e)
			return e
		}
	}, 
}
