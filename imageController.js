// ------------------------------------------
// Handle image resize --> https://github.com/oliver-moran/jimp/tree/master/packages/jimp
// ------------------------------------------
var Jimp = require('jimp');
var path = require('path')

exports.imageResize = function (file,filename,destination,width,height) {

    Jimp.read(file, (err, thumb) => {

        if(err) throw err

        let file = filename.substr(0, filename.lastIndexOf('.'))
        let ext = path.extname(filename)

        thumb
            .cover(width, height)
            .write(destination+file+'-'+width+'x'+height+ext);

    });

}