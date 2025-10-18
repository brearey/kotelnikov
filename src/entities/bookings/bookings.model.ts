import prisma from '../../database/prisma'
import { logger } from '../../utils/logger'

export const BookingsModel = {
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
