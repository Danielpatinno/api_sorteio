const multer = require("multer")
const path = require("path")

// Destino
const imageStorage = multer.diskStorage({
    destination: function (req,file, cd) {
        cd(null, `uploads`)
    },
    filename:((req,file,cd) => {
        cd(null, Date.now()+ path.extname(file.originalname))
    })
})


const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cd) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {

            // upload only png and jpg formats
            return cd(new Error("Por favor, envie apenas png ou jpg."))
        }
        cd(undefined, true)
    }
})

module.exports = {imageUpload}