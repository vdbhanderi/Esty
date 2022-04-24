const app = require("./app");
const bodyParser = require('body-parser');
const passport = require("passport");
//const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const {uploadFile,downloadFile}=require('./s3');
app.set('view engine', 'ejs');
//require('./config/passport')(passport);

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Storing documents/Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Inside destination")
    console.log(file)

    cb(null, 'uploads');
  }
  , filename: (req, file, cb) => {
    console.log("file multer", file)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage })

//uplaod-file
app.post('/uploadImage', upload.single('file'), (req, res) => {
  console.log("After multers", req.files)
  const file=req.file
  console.log(file)
  uploadFile(file).then(response=>{
    var data={
      itemImage:response.Key
    }
    console.log(response)
     res.status(200).send(JSON.stringify(data));
 
  })
 
});

//download-file
app.get('/download-file/:key', (req, res) => {
  console.log("inside download file", req.params.key)
  var key=req.params.key
  console.log("key",key)
  const readStream=downloadFile(key)
  readStream.pipe(res)
  //console.log("image path", image)
  // if (fs.existsSync(image)) {
  //   res.sendFile(image)
  // }
  // else {
  //   res.end("image not found")
  // }
});


app.listen(3000, () => {
  console.log("listening to port 3000")
})

