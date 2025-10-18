import axios, { AxiosResponse } from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

interface ApiErrorResponse {
	success: boolean
	message: string
	data: null
	errors: unknown[]
}

describe('Events API Tests', () => {
	test('GET /api/events - should return success response', async () => {
		const response: AxiosResponse<ApiErrorResponse> = await axios.get(`${API_BASE_URL}/events`)

		expect(response.status).toBe(200)
		expect(response.data.success).toBe(true)
		expect(Array.isArray(response.data.data)).toBe(true)
	})

	test('GET /api/events - should return events array with correct structure', async () => {
		const response: AxiosResponse<ApiErrorResponse> = await axios.get(`${API_BASE_URL}/events`)

		if (response.data.data) {
			expect(response.data.data).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						id: expect.any(Number),
						name: expect.any(String),
						total_seats: expect.any(Number),
					}),
				])
			)
		}
	})

	test('GET /api/events - should have consistent response format', async () => {
		const response: AxiosResponse<ApiErrorResponse> = await axios.get(`${API_BASE_URL}/events`)

		expect(response.data).toMatchObject({
			success: expect.any(Boolean),
			message: expect.any(String),
			data: expect.any(Array),
			errors: expect.any(Array),
		})

		expect(response.data.errors).toHaveLength(0)
	})
})
