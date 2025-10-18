import { config } from 'dotenv'
config() // dotenv
import express, { Application } from 'express'
import bodyParser from 'body-parser'

const app: Application = express()
const PORT = process.env.SERVER_PORT || 5000

app.use(bodyParser.json())

app.get('/api/health', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'ok',
		errors: []
	})
})

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
