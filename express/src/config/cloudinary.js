import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: "du5787zrm",
    api_key: "177324238193573",
    api_secret: "IbYV24PX0enYi4R3qNrUhRY7Bjk"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "express",
        format: async (req, file) => "jpg",
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    }
})

export const upload = multer({ storage: storage });

export default cloudinary;

