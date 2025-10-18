export const logger = {
	now: new Date().toLocaleString(),
	info: (message: string) => {
		console.info(`${logger.now} | INFO | ${message}`)
	},
	error: (message: string) => {
		console.error(`${logger.now} | ERROR | ${message}`)
	},
}