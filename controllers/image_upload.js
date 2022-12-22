import cloudinary from 'cloudinary';
cloudinary.config({ 
    cloud_name: 'dqu8sspg8', 
    api_key: '471826772773547', 
    api_secret: 'FQCmY3GY3yGw3oNigP8w9h6oP4k' 
});

function image_upload(req,res){
    try {
        const file=req.files.image;
    console.log(file);
    cloudinary.v2.uploader.upload(file.tempFilePath,
        function(error,result){
            console.log(result);
            res.send(res)
        }
        )
    } catch (error) {
        console.log("message",error.message);
    }
}

export default image_upload;