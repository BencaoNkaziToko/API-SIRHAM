import { app } from './app'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
