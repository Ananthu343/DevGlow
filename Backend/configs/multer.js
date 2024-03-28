import multer from 'multer'


const storage = multer.memoryStorage();

export const upload = multer({
 storage: storage,
 fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'), false);
    }
 },
 limits: {
    fileSize: 1024 * 1024 * 10 // Limit file size to 10MB
 }
});
   
