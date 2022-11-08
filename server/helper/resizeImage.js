const sharp = require("sharp") 
sharp.cache(false)

const resizeImage = async (path) => {

  let buffer = await sharp(path)
    .resize({ 
      width: 48,
      fit: "inside"
    })
    .toBuffer()
  return sharp(buffer).toFile(path)
}

module.exports = resizeImage