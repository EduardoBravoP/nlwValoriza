import express from 'express'

const app = express()

app.get('/test', (request, response) => {
  return response.send("Olá NLW")
})


app.listen(3333, () => {
  console.log('🔥 Server is running on port 3333')
})