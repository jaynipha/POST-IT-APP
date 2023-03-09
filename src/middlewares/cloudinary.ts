import cloudinary from "cloudinary"
import config from "../config";
const cloud = cloudinary.v2;



cloud.config({ 
      cloud_name: config.cloudName, 
      api_key: config.cloudinaryApiKey, 
      api_secret: config.cloudinarySecret,
      secure: true
    });

export default cloud