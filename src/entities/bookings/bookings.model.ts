import prisma from '../../database/prisma'
import { Booking } from '../../types/app-types'
import { logger } from '../../utils/logger'

export const BookingsModel = {
	create: async (booking: Booking) => {
		try {
			return await prisma.bookings.create({
				data: booking,
			})
		} catch (e) {
			if (e instanceof Error) logger.error(e)
			console.error(e)
			return e
		}
	},

	findByUserAndEvent: async (user_id: string, event_id: number) => {
		try {
			return await prisma.bookings.findFirst({
				where: {
					AND: {
						user_id: user_id,
						event_id: event_id,
					}
				},
			})
		} catch (e) {
			if (e instanceof Error) logger.error(e)
			console.error(e)
			return e
		}
	},

	findAll: async (user_id: string) => {
		try {
			return await prisma.bookings.findMany({
				where: {
					user_id: user_id,
				},
			})
		} catch (e) {
			if (e instanceof Error) logger.error(e)
			console.error(e)
			return e
		}
	},
}
