import axios, { AxiosError, AxiosResponse } from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

interface ApiErrorResponse {
	success: boolean
	message: string
	data: null
	errors: unknown[]
}

describe('Bookings API Tests', () => {
	test('GET /api/bookings - should return 400 when user_id is missing', async () => {
		try {
			await axios.get(`${API_BASE_URL}/bookings`)
			fail('Expected request to fail')
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ApiErrorResponse>
			expect(axiosError.response?.status).toBe(400)
			expect(axiosError.response?.data.success).toBe(false)
			expect(axiosError.response?.data.message).toContain('user_id is required')
		}
	})

	test('GET /api/bookings - should return 400 when user_id is empty', async () => {
		try {
			await axios.get(`${API_BASE_URL}/bookings?user_id=`)
			fail('Expected request to fail')
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ApiErrorResponse>
			expect(axiosError.response?.status).toBe(400)
			expect(axiosError.response?.data.success).toBe(false)
		}
	})

	test('GET /api/bookings - should return bookings array for valid user_id', async () => {
		const response: AxiosResponse<ApiErrorResponse> = await axios.get(`${API_BASE_URL}/bookings?user_id=test-user-123`)

		expect(response.status).toBe(200)
		expect(response.data.success).toBe(true)
		expect(Array.isArray(response.data.data)).toBe(true)
	})

	test('POST /api/bookings/reserve - should return 400 when event_id is missing', async () => {
		try {
			await axios.post(`${API_BASE_URL}/bookings/reserve`, {
				user_id: 'test-user',
			})
			fail('Expected request to fail')
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ApiErrorResponse>
			expect(axiosError.response?.status).toBe(400)
			expect(axiosError.response?.data.success).toBe(false)
			expect(axiosError.response?.data.message).toContain('event_id and user_id required')
		}
	})

	test('POST /api/bookings/reserve - should return 400 when user_id is missing', async () => {
		try {
			await axios.post(`${API_BASE_URL}/bookings/reserve`, {
				event_id: 1,
			})
			fail('Expected request to fail')
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ApiErrorResponse>
			expect(axiosError.response?.status).toBe(400)
			expect(axiosError.response?.data.success).toBe(false)
		}
	})

	test('POST /api/bookings/reserve - should return 400 when event_id is not a number', async () => {
		try {
			await axios.post(`${API_BASE_URL}/bookings/reserve`, {
				event_id: 'not-a-number',
				user_id: 'test-user',
			})
			fail('Expected request to fail')
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ApiErrorResponse>
			expect(axiosError.response?.status).toBe(400)
			expect(axiosError.response?.data.success).toBe(false)
			expect(axiosError.response?.data.message).toContain('must be a number and string')
		}
	})

	test('POST /api/bookings/reserve - should return 400 when user_id is not a string', async () => {
		try {
			await axios.post(`${API_BASE_URL}/bookings/reserve`, {
				event_id: 1,
				user_id: 12345,
			})
			fail('Expected request to fail')
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ApiErrorResponse>
			expect(axiosError.response?.status).toBe(400)
			expect(axiosError.response?.data.success).toBe(false)
		}
	})

	test('POST /api/bookings/reserve - should return 400 for non-existent event', async () => {
		try {
			await axios.post(`${API_BASE_URL}/bookings/reserve`, {
				event_id: 99999, // Несуществующий event
				user_id: 'test-user',
			})
			fail('Expected request to fail')
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ApiErrorResponse>
			expect(axiosError.response?.status).toBe(400)
			expect(axiosError.response?.data.success).toBe(false)
			expect(axiosError.response?.data.message).toContain('was not found')
		}
	})
})
