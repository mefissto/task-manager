const multer = require('multer');
const upload = multer({
  // dest: 'images', // sets a folder name. While it's set the file will not pass to the next handlers, it will just be saved
  limits: {
    fieldSize: 1000000 // number in bytes
  },
  fileFilter(req, file, cb) { // allows to check the file extentions
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { // file.originalname.endsWith('.pdf') if we're looking for only one extention
      return cb(new Error('Please upload an image.'));
    }

    cb(undefined, true);

    // cb(new Error('File must be a PDF')); // throws an error
    // cb(undefined, true); // everythig is ok
    // cb(undefined, false); // silently rejects the upload
  }
  // storage: storage // sets the storage settings
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const uploadMiddleware = formDataKey => {
  // single's method parameter needs to be matched with a form-data key name that user uploads
  return upload.single(formDataKey);
};

module.exports = uploadMiddleware;
