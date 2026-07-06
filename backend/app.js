import express from "express"
import initialNotes from './data/notes.js'

const app = express()
const PORT = 3001 

app.get("/notes",(req, res)=>{
     return res.json(initialNotes)
})

app.post('/notes', (req, res) => {
  const newNote = req.body

  initialNotes.push(newNote)

  return res.status(201).json({
    message: 'Note added successfully',
    note: newNote,
  })
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})