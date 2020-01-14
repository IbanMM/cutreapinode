// ------------------------------------------
// Image sizes controller
// ------------------------------------------
ImageSize = require('./imageSizeModel');

// ------------------------------------------
// Handle index actions
// ------------------------------------------
exports.index = function (req, res) {
    ImageSize.get(function (err, imagesizes) {
        if (err) {
            res.json({
                status: "error",
                message: imagesizes,
            });
        }
        res.json({
            status: "success",
            message: "Image Sizes retrieved successfully",
            data: imagesizes
        });
    });
};

// ------------------------------------------
// Handle new image size
// ------------------------------------------
exports.new = function (req, res) {

    var imagesize = new ImageSize();

    imagesize.name = req.body.name
    imagesize.width = req.body.width
    imagesize.height = req.body.height
    imagesize.mode = req.body.mode

    ImageSize.countDocuments({ name: req.body.name }, function (err, count) {

        if( count == 0) {

            imagesize.save(function (err) {
                // Check for validation error
                if (err)
                    res.json(err);
                else
                    res.json({
                        status: "success",
                        message: 'New image size created!',
                        data: imagesize
                    });
            });
        
        } else {

            res.json({
                status: "duplicate",
                message: 'Image size already exists'
            });

        }

    })

}

// ------------------------------------------
// Handle get one
// ------------------------------------------
exports.getone = function (req, res) {

    ImageSize.findById(req.query.id, function (err, imagesize) {

        if(err)
            res.send(err)

        if(imagesize!== null) {

            res.json({
                status: "success",
                message: 'ImageSize success',
                data: imagesize
            })

        } else {

            res.json({
                status: "error",
                message: 'Incorrect ID',
            })

        }

    })

}

// ------------------------------------------
// Handle save one
// ------------------------------------------
exports.update = function(req, res){

    ImageSize.findById(req.body.id, function (err, imagesize) {

        if(err) {

            res.send(err)
            return

        } else {

            if(imagesize !== null) {

                imagesize.name = req.body.name
                imagesize.width = Math.floor(req.body.width)
                imagesize.height = Math.floor(req.body.height)
                imagesize.mode = req.body.mode

                imagesize.save(function (err) {

                    if (err) {

                        res.json(err)
                        return

                    } else {

                        res.json({
                            status: "success",
                            message: 'ImageSize Info updated',
                            data: imagesize
                        })

                    }

                })

            } else {

                res.json({
                    status: "error",
                    message: 'Incorrect ID',
                })

            }

        }

    })

}