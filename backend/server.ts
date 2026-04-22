import express, { Request, Response } from 'express'

const app = express()
const PORT = 3001

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Backend działa w TypeScript')
})

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({
    message: 'Cześć z backendu TS + Express'
  })
})

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email } = req.body as { name?: string; email?: string }

  if (!name || !email) {
    return res.status(400).json({ error: 'Brakuje danych' })
  }

  return res.json({
    success: true,
    user: { name, email }
  })
})

app.listen(PORT, () => {
  console.log(`Server działa na http://localhost:${PORT}`)
})