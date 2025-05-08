import multer from 'multer';
import path from 'path';

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Use the uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Add file extension
  }
});

const upload = multer({ storage: storage });

// Use 'upload' middleware in your route
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  res.send('File uploaded successfully!');
});