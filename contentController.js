Content = require('./contentModel');

// Handle create content actions
exports.new = function (req, res) {

    var content = new Content();

    content.type = req.body.type;
    content.data = req.body.content;

    content.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                status: "success",
                message: 'New content created!',
                data: content
            });
    });
    
}