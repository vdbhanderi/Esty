const app = require("./app");
const bodyParser = require('body-parser');
const passport = require("passport");
//const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const path = require('path');
const fs = require('fs');
const multer = require('multer');

app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('login')
})
//Storing documents/Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Inside destination")
    console.log(file)

    cb(null, 'uploads');
  }
  , filename: (req, file, cb) => {
    console.log("file multer", file)
    cb(null, Date.now() + "-" + ".png");
  },
});

const upload = multer({ storage })

//uplaod-file
app.post('/uploadImage', upload.single('file'), (req, res) => {
  console.log("After multers", req.files)
  res.status(200).json({ success: 'success' })
  res.end();
});

//download-file
app.get('/download-file/:user_image', (req, res) => {
  console.log("inside download file", req.params.user_image)
  var image = path.join(__dirname + '/uploadedImages', req.params.user_image);
  console.log("image path", image)
  if (fs.existsSync(image)) {
    res.sendFile(image)
  }
  else {
    res.end("image not found")
  }
});


app.listen(3000, () => {
  console.log("listening to port 3000")
})

