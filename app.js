const express = require('express')
const { uploadMultiple, uploadSingle } = require('./file-upload')
const app = express()
const Tesseract = require('tesseract.js')

const logger = require('morgan')
const PORT = process.env.PORT || 5008

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('tiny'))
const database = []

app.post('/api/upload', uploadMultiple, async (req, res) => {
  try {
    console.log('yoow')
    const { name, email } = req.body
    const { front_id, back_id, education, resumes } = req.files

    const educationNames = education.map(ed => ed.filename)
    const resumesNames = resumes.map(res => res.filename)
    const data = {
      name,
      email,
      front_id: front_id[0].filename,
      back_id: back_id[0].filename,
      education: educationNames,
      resumes: resumesNames,
    }
    console.log('data', data)

    return res.status(200).json('Done uploading')
  } catch (error) {
    console.log('shebang')
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/doc', uploadSingle, (req, res) => {
  try {
    const { path } = req.file
    Tesseract.recognize(__dirname + '/' + path, 'eng', {
      logger: m => console.log(m),
    }).then(({ data: { text } }) => console.log(text))
    return res.status(200).json('Done uploading')
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => console.log('server is up and running'))
