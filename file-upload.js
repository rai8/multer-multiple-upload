const multer = require('multer')
const path = require('path')

//define storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
})

const uploadSingle = upload.single('document')

const uploadMultiple = upload.fields([
  { name: 'front_id', maxCount: 1 },
  { name: 'back_id', maxCount: 1 },
  { name: 'education', maxCount: 8 },
  { name: 'resumes', maxCount: 8 },
])

module.exports = { uploadMultiple, uploadSingle }
