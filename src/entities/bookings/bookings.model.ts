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

	getAll: async () => {
		try {
			return await prisma.bookings.findMany()
		} catch (e) {
			if (e instanceof Error) logger.error(e)
			console.error(e)
			return e
		}
	},
}
