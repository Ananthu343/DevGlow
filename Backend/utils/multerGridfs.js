import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import crypto from 'crypto'

const dbUri = process.env.CONNECTION_STRING

const storage = new GridFsStorage({
    url: dbUri,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
       return new Promise((resolve, reject) => {
         crypto.randomBytes(16, (err, buf) => {
           if (err) {
             return reject(err);
           }
           const filename = file.originalname;
           const fileInfo = {
             filename: filename,
             bucketName: 'uploads',
           };
           resolve(fileInfo);
         });
       });
    },
   });
   
   export const upload = multer({ storage });