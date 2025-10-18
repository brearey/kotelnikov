export type ApiError = {
	name: string
	message: string
}

export type ApiResponse = {
	success: boolean
	message: string | null
	data: Event[] | Booking[] | null
	errors: ApiError[]
}

export type Event = {
	name: string
	total_seats: number
}

export type Booking = {
	id: number
	event_id: number
	user_id: string
	created_at: Date
}
