const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/mean-file-transfer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const FileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  uploadDate: { type: Date, default: Date.now },
  link: String,
});

const File = mongoose.model('File', FileSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const file = new File({
    filename: req.file.filename,
    path: req.file.path,
    link: `http://${req.hostname}:${PORT}/uploads/${req.file.filename}`,
  });

  await file.save();

  res.json({
    message: 'File uploaded successfully',
    fileLink: file.link,
  });
});

app.get('/api/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})