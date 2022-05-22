require('dotenv').config()
const axios = require('axios')

export function uploadProfilePicture(b64_img, userid){ 
    return axios.post('https://api.cloudinary.com/v1_1/'+ process.env.CLOUDINARY_NAME +'/image/upload', 
    {
        file: b64_img,
        tag: userid,
    })
    const img = cloudinary.image(b64_img, {height: 200, width: 200})
    cloudinary.uploader.upload(img, function (err, res){
        console.log(res);
        return res
    })
}